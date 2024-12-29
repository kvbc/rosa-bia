import pandas
from typing import List
import re
from textwrap import dedent

def is_valid_value(value: object):
    return (
        not pandas.isnull(value)
        # and type(value) == str
        # and len(value) > 0
        and (len(value) > 0 if type(value) == str else True)
        and value != "-"
    )

def valid_or_default(value: object, default: str) -> str:
    if is_valid_value(value):
        return str(value)
    return default

def filter_name(value: object) -> str | None:
    if is_valid_value(value):
        match = re.search(r"(\D*\d+\W+)?(.+)", str(value))
        if match:
            return match.group(2)
    return None

########################################################################
#
# PKOB
#
########################################################################

class ConstructionSpec:
    next_id = 1
    def __init__(self, name, zl_class, ob_cat):
        self.name = name
        self.id = ConstructionSpec.next_id
        self.zl_class = zl_class
        self.ob_cat = ob_cat
        ConstructionSpec.next_id += 1

class ConstructionClass:
    next_id = 1
    specs: List[ConstructionSpec]
    def __init__(self, name, pkob):
        self.name = name
        self.id = ConstructionClass.next_id
        self.pkob = pkob
        self.specs = [ConstructionSpec("-", "-", "-")]
        ConstructionClass.next_id += 1

class ConstructionGroup:
    next_id = 1
    classes: List[ConstructionClass]
    def __init__(self, name):
        self.name = name
        self.id = ConstructionGroup.next_id
        self.classes = [ConstructionClass("-", 0)]
        ConstructionGroup.next_id += 1

class ConstructionDivision:
    next_id = 1
    groups: List[ConstructionGroup]
    def __init__(self, name):
        self.name = name
        self.id = ConstructionDivision.next_id
        self.groups = [ConstructionGroup("-")]
        ConstructionDivision.next_id += 1

class ConstructionSection:
    next_id = 1
    divisions: List[ConstructionDivision]
    def __init__(self, name):
        self.name = name
        self.id = ConstructionSection.next_id
        self.divisions = [ConstructionDivision("-")]
        ConstructionSection.next_id += 1

construction_sections: List[ConstructionSection] = [
    ConstructionSection("-")
]

df = pandas.read_excel('BiA_KOMBAJN_NACZELNIK.ods', engine="odf", sheet_name="PKOB")

for _, row in df.iterrows():
    section_name = filter_name(row.Sekcja)
    division_name = filter_name(row.Dział)
    group_name = filter_name(row.Grupa)
    class_name = filter_name(row.Klasa)
    spec_name = filter_name(row.Wyszczegółnienie)
    pkob = row["Symbol PKOB"]
    zl_class = valid_or_default(row["Klasa zagrożenia ludzi (W.T.)"], "-")
    ob_cat = valid_or_default(row["Kat. Obiektu bud. (P.B.)"], "-")

    section = next((x for x in construction_sections if x.name == section_name), None)
    if section is None and is_valid_value(section_name):
        section = ConstructionSection(section_name)
        construction_sections.append(section)

    if section is None:
        continue

    division = next((x for x in section.divisions if x.name == division_name), None)
    if division is None and is_valid_value(division_name):
        division = ConstructionDivision(division_name)
        section.divisions.append(division)

    if division is None:
        continue

    group = next((x for x in division.groups if x.name == group_name), None)
    if group is None and is_valid_value(group_name):
        group = ConstructionGroup(group_name)
        division.groups.append(group)

    if group is None:
        continue

    clas = next((x for x in group.classes if x.name == class_name), None)
    if clas is None and is_valid_value(class_name):
        clas = ConstructionClass(class_name, pkob)
        group.classes.append(clas)

    if clas is None:
        continue

    spec = next((x for x in clas.specs if x.name == spec_name), None)
    if spec is None and is_valid_value(spec_name):
        spec = ConstructionSpec(spec_name, zl_class,  ob_cat)
        clas.specs.append(spec)

sql_construction_sections = "insert into construction_sections(`id`, `name`) values\n"
sql_construction_divisions = "insert into construction_divisions(`id`, `name`, `section_id`) values\n"
sql_construction_groups = "insert into construction_groups(`id`, `name`, `division_id`) values\n"
sql_construction_classes = "insert into construction_classes(`id`, `name`, `group_id`, `pkob`) values\n"
sql_construction_specs = "insert into construction_specs(`id`, `name`, `class_id`, `zl_class`, `ob_cat`) values\n"

for section in construction_sections:
    sql_construction_sections += f"\t({section.id}, '{section.name}'),\n"
    for division in section.divisions:
        sql_construction_divisions += f"\t({division.id}, '{division.name}', {section.id}),\n"
        for group in division.groups:
            sql_construction_groups += f"\t({group.id}, '{group.name}', {division.id}),\n"
            for clas in group.classes:
                sql_construction_classes += f"\t({clas.id}, '{clas.name}', {group.id}, {clas.pkob}),\n"
                for spec in clas.specs:
                    sql_construction_specs += f"\t({spec.id}, '{spec.name}', {clas.id}, '{spec.zl_class}', '{spec.ob_cat}'),\n"


sql_construction_sections = sql_construction_sections[:-2] + ";"
sql_construction_divisions = sql_construction_divisions[:-2] + ";"
sql_construction_groups = sql_construction_groups[:-2] + ";"
sql_construction_classes = sql_construction_classes[:-2] + ";"
sql_construction_specs = sql_construction_specs[:-2] + ";"

########################################################################
#
# Geodesy
#
########################################################################
    
class Street:
    next_id = 1
    def __init__(self, name):
        self.name = name
        self.id = Street.next_id
        Street.next_id += 1

class Place:
    next_id = 1
    streets: List[Street]
    def __init__(self, name, area_place_name, cad_unit):
        self.name = name
        self.area_place_name = area_place_name
        self.cad_unit = cad_unit
        self.id = Place.next_id
        self.streets = [Street("-")]
        Place.next_id += 1

class Commune:
    next_id = 1
    places: List[Place]
    def __init__(self, name):
        self.name = name
        self.id = Commune.next_id
        self.places = [Place("-", "-", "-")]
        Commune.next_id += 1

communes: List[Commune] = [
    Commune("-")
]

df = pandas.read_excel('BiA_KOMBAJN_NACZELNIK.ods', engine="odf", sheet_name="GEODEZJA")

for _, row in df.iterrows():
    commune_name = filter_name(row.gmina)
    place_name = filter_name(row.miejscowość)
    street_name = filter_name(row.ulica)
    area_place_name = filter_name(row.Obręb)
    cad_unit = row["Jedn ewidencyjna"]
    
    commune = next((x for x in communes if x.name == commune_name), None)
    if commune is None and is_valid_value(commune_name):
        commune = Commune(commune_name)
        communes.append(commune)

    if commune is None:
        continue

    place = next((x for x in commune.places if x.name == place_name), None)
    if place is None and is_valid_value(place_name):
        place = Place(place_name, area_place_name, cad_unit)
        commune.places.append(place)

    if place is None:
        continue

    street = next((x for x in place.streets if x.name == street_name), None)
    if street is None and is_valid_value(street_name):
        street = Street(street_name)
        place.streets.append(street)

sql_communes = "insert into communes(`id`, `name`) values\n"
sql_places = "insert into places(`id`, `name`, `commune_id`, `area_place_id`, `cad_unit`) values\n"
sql_streets = "insert into streets(`id`, `name`, `place_id`) values\n"

for commune in communes:
    sql_communes += f"\t({commune.id}, '{commune.name}'),\n"
    for place in commune.places:
        area_place_id = -999
        area_place = next((x for x in commune.places if x.name == place.area_place_name), None)
        if area_place:
            area_place_id = area_place.id
        sql_places += f"\t({place.id}, '{place.name}', {commune.id}, {area_place_id}, '{place.cad_unit}'),\n"
        for street in place.streets:
            sql_streets += f"\t({street.id}, '{street.name}', {place.id}),\n"


sql_communes = sql_communes[:-2] + ";"
sql_places = sql_places[:-2] + ";"
sql_streets = sql_streets[:-2] + ";"

########################################################################
#
# Investors
#
########################################################################

df = pandas.read_excel('BiA_KOMBAJN_NACZELNIK.ods', engine="odf", sheet_name="Inwestorzy")

sql_investors = "insert into investors(`id`, `name`, `address`, `is_legal`) values\n"

for _, row in df.iterrows():
    investor_name = filter_name(row.INWESTOR)
    address = row.adres
    is_legal_person = True

    if is_valid_value(investor_name):
        sql_investors += f"\t(null, '{investor_name}', '{address}', {is_legal_person}),\n"

sql_investors = sql_investors[:-2] + ";"

########################################################################
#
# Construction Law
#
########################################################################

class ConstructionLawCategory:
    next_id = 1
    def __init__(self, name, register_type):
        self.name = name
        self.register_type = register_type
        self.id = ConstructionLawCategory.next_id
        ConstructionLawCategory.next_id += 1

class ConstructionLawIntent:
    next_id = 1
    def __init__(self, name, category_id, legal_basis, additional_requirements):
        self.name = name
        self.category_id = category_id
        self.legal_basis = legal_basis
        self.additional_requirements = additional_requirements
        self.id = ConstructionLawIntent.next_id
        ConstructionLawIntent.next_id += 1

construction_law_categories: List[ConstructionLawCategory] = []

sql_construction_law_categories = "insert into construction_law_categories(`id`, `name`, `register_type`) values\n"
sql_construction_law_intents = "insert into construction_law_intents(`id`, `intent`, `category_id`, `legal_basis`, `additional_requirements`) values\n"

for sheet_name in [
    "art. 29 Pr.bud. 6743.2",
    "art. 29 Pr.bud. BiP",
    "art.29 pr.bud. tymczasem"
]:
    sql_construction_law_categories += f"\t-- {sheet_name}\n"
    sql_construction_law_intents += f"\t-- {sheet_name}\n"

    df = pandas.read_excel('BiA_KOMBAJN_NACZELNIK.ods', engine="odf", sheet_name=sheet_name)

    for _, row in df.iterrows():
        category_name = filter_name(row.Rodzaj)
        intent_name = row["Zamierzenie budowlane "]
        legal_basis = row["Podstawa prawna"]
        register_number = valid_or_default(row["Nr reejstru"], "-")
        register_type = {
            "Wojewoda": "Zg. Zwykłe (6743.2)", #FIXME
            "6743.2": "Zg. Zwykłe (6743.2)",
            "6743.5": "Tymczasowe (6743.5)",
            "BiP": "BiP (6743.4)",
            "-": None
        }[register_number]
        additional_requirements = valid_or_default(row["dodatkowe wymagania"], "-") if "dodatkowe wymagania" in row else "-"

        if register_type is None:
            continue

        category = next((x for x in construction_law_categories if x.name == category_name and x.register_type == register_type), None)
        if category is None and is_valid_value(category_name):
            category = ConstructionLawCategory(category_name, register_type)
            construction_law_categories.append(category)
            sql_construction_law_categories += f"\t({category.id}, '{category.name}', '{register_type}'),\n"
        if category is None:
            continue

        sql_construction_law_intents += f"\t(null, '{intent_name}', {category.id}, '{legal_basis}', '{additional_requirements}'),\n"

sql_construction_law_categories = sql_construction_law_categories[:-2] + ";"
sql_construction_law_intents = sql_construction_law_intents[:-2] + ";"

########################################################################
#
# SQL
#
########################################################################

sql = '\n\n'.join([
    "-- This script was auto-generated by /scripts/ods_to_sql.py",
    dedent("""
        ------------------------------------
        --
        -- PKOB
        --
        ------------------------------------
    """),
    sql_construction_sections,
    sql_construction_divisions,
    sql_construction_groups,
    sql_construction_classes,
    sql_construction_specs,
    dedent("""
        ------------------------------------
        --
        -- Geodesy
        --
        ------------------------------------
    """),
    sql_communes,
    sql_places,
    sql_streets,
    dedent("""
        ------------------------------------
        --
        -- Investors
        --
        ------------------------------------
    """),
    sql_investors,
    dedent("""
        ------------------------------------
        --
        -- Construction Law
        --
        ------------------------------------
    """),
    sql_construction_law_categories,
    sql_construction_law_intents
])

f = open("odsgen.sql", "w", encoding="utf-8")
f.write(sql)
f.close()

print("Success!")