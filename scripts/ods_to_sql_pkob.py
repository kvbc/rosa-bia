import pandas
from typing import List
import re

class ConstructionSpec:
    next_id = 1
    def __init__(self, name, zl_class, ob_cat):
        self.name = name
        self.id = ConstructionSpec.next_id
        ConstructionSpec.next_id += 1
        self.zl_class = zl_class
        self.ob_cat = ob_cat

class ConstructionClass:
    next_id = 1
    specs: List[ConstructionSpec]
    def __init__(self, name, pkob):
        self.name = name
        self.id = ConstructionClass.next_id
        ConstructionClass.next_id += 1
        self.specs = []
        self.pkob = pkob

class ConstructionGroup:
    next_id = 1
    classes: List[ConstructionClass]
    def __init__(self, name):
        self.name = name
        self.id = ConstructionGroup.next_id
        ConstructionGroup.next_id += 1
        self.classes = []

class ConstructionDivision:
    next_id = 1
    groups: List[ConstructionGroup]
    def __init__(self, name):
        self.name = name
        self.id = ConstructionDivision.next_id
        ConstructionDivision.next_id += 1
        self.groups = []

class ConstructionSection:
    next_id = 1
    divisions: List[ConstructionDivision]
    def __init__(self, name):
        self.name = name
        self.id = ConstructionSection.next_id
        ConstructionSection.next_id += 1
        self.divisions = []

construction_sections: List[ConstructionSection] = []

df = pandas.read_excel('BiA_KOMBAJN_NACZELNIK.ods', engine="odf", sheet_name="PKOB")

def is_valid_value(value: str):
    return not pandas.isnull(value) and len(value) > 0 and value != "-"

def valid_or_default(value: str, default: str) -> str:
    if is_valid_value(value):
        return value
    return default

def filter_name(name: str) -> str | None:
    if is_valid_value(name):
        match = re.search(r"(\D*\d+\W+)?(.+)", name)
        if match:
            return match.group(2)
    return None

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

sql = '\n\n'.join([
    "-- This script was auto-generated by /scripts/ods_to_sql_pkob.py",
    sql_construction_sections,
    sql_construction_divisions,
    sql_construction_groups,
    sql_construction_classes,
    sql_construction_specs
])

f = open("odsgen.sql", "w", encoding="utf-8")
f.write(sql)
f.close()

print("Success!")