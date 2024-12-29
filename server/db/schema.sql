-- 
-- Investors
-- 

create table investors(
    id integer primary key autoincrement,
    `name` text not null,
    `address` text not null,
    `is_legal` boolean not null -- osoba fizyczna? (lub prawna)
);

-- 
-- Geodesy
-- 

create table communes( -- gminy
    id integer primary key autoincrement,
    `name` text not null unique
);
create table places( -- miejscowosci
    id integer primary key autoincrement,
    `name` text not null,
    commune_id integer not null,
    area_place_id integer not null, -- obreb
    cad_unit text not null, -- unique, -- cadastral unit (jedn. ewid.),
    foreign key(commune_id) references communes(id),
    foreign key(area_place_id) references places(id)
);
create table streets( -- ulice
    id integer primary key autoincrement,
    `name` text not null,
    place_id integer not null,
    foreign key(place_id) references places(id)
);

-- 
-- PKOB
-- 

create table construction_sections( -- sekcje budowlane
    id integer primary key autoincrement,
    `name` text not null unique
);
create table construction_divisions( -- dzialy budowlane
    id integer primary key autoincrement,
    `name` text not null,
    section_id integer not null,
    foreign key(section_id) references construction_sections(id)
);
create table construction_groups( -- grupy budowlane
    id integer primary key autoincrement,
    `name` text not null,
    division_id integer not null,
    foreign key(division_id) references construction_divisions(id)
);
create table construction_classes( -- klasy budowlane
    id integer primary key autoincrement,
    `name` text not null,
    group_id integer not null,
    pkob integer not null,
    foreign key(group_id) references construction_groups(id)
);
create table construction_specs( -- wyszczegolnienia budowlane
    id integer primary key autoincrement,
    `name` text not null,
    class_id integer not null,
    zl_class text not null, /* klasa zagrozenia ludzi */
    ob_cat text not null, /* kat. obiektu budowy */
    foreign key(class_id) references construction_classes(id)
);

-- 
-- Registers
-- 

create table registers(
    id integer primary key autoincrement,
    `type` text not null,

    assigned_employee_id integer, -- przypisany pracownik (przydzial)

    app_number text not null unique, -- numer wniosku
    app_submission_date date not null, -- data zlozenia
    app_investor_id integer not null,
    app_new_investor_id integer not null, -- nowy inwestor (uzupelniajacy)
    app_decision_type text,
    app_decision_number text not null,
    app_decision_issue_date date not null, -- data wydania decyzji wniosku
    app_resolution_type text,
    app_resolution_number text not null,
    app_resolution_issue_date date not null, -- data wydania rozstrzygniecia
    app_construction_journal_type text not null, -- typ dziennika budowy

    object_construction_spec_id integer not null, -- id wyszczegolnienia budowlanego obiektu 
    object_custom_construction_intent text not null, -- customowa nazwa zamierzenia budowlanego (np. dla ZRiDu)
    object_construction_form_type text, -- typ formy budownictwa
    object_spatial_plan_type text, -- typ planowania przestrzennego
    object_street_id integer not null,
    object_number text not null,
    object_pnb_acc_infra boolean not null, -- infrastruktura towarzyszaca
    object_demo_under_conservation_protection boolean not null, -- objety ochrona konserwatorska
    object_demo_building_area integer not null, -- powierzchnia zabudowy
    object_demo_usable_area integer not null, -- powierzchnia uzytkowa
    object_demo_volume integer not null, -- kubatura
    object_demo_building_count integer not null, -- ilosc budynkow
    object_demo_premises_count integer not null, -- ilosc lokali
    object_usage_change_from text not null, -- zm. sp. uzytk. z
    object_usage_change_to text not null, -- zm. sp. uzytk. na
    object_construction_law_intent_id integer not null, -- id zamierzenia budowlanego
    object_public_info boolean not null, -- informacja publiczna?
    object_localization_date_from date, -- data lokalizacji od 
    object_localization_date_to date, -- data lokalizacji do
    object_neighbouring_property_type text, -- dane nieruchomości sąsiedniej

    admin_construction_journal_number integer not null, -- numer dziennika budowy
    admin_construction_journal_date date not null, -- data dziennika budowy
    admin_construction_journal_tome integer not null, -- numer tomu dziennika budowy

    other_case_title text not null, -- sprawa
    other_case_from text not null, -- od kogo
    other_case_sign text not null, -- znak pisma
    other_case_date date, -- z dnia
    other_case_init_date date, -- data wszczęcia sprawy
    other_case_settle_date date, -- data ostatecznego załatwienia sprawy
    other_case_comments text not null, -- uwagi

    foreign key(assigned_employee_id) references employees(id),
    foreign key(app_investor_id) references investors(id),
    foreign key(app_new_investor_id) references investors(id),
    foreign key(object_construction_spec_id) references construction_specs(id),
    foreign key(object_street_id) references streets(id),
    foreign key(object_construction_law_intent_id) references construction_law_intents(id)
);

create table registers_plots( -- rejestry: dzialki
    id integer primary key autoincrement,
    `type` text not null,
    `plot` text not null,
    register_id integer not null,
    foreign key(register_id) references registers(id)
);

create table registers_admin_actions( -- rejestry: czynnosci administracyjne
    id integer primary key autoincrement,
    `type` text not null,
    register_id integer not null,
    `select` boolean not null, -- wybor
    deadline integer not null, -- termin
    letter_date date not null, -- data pisma
    receipt_date date, -- data odebrania
    reply_date date, -- data odpowiedzi
    foreign key(register_id) references registers(id),
    CONSTRAINT uq UNIQUE(register_id, `type`) ON CONFLICT REPLACE
);

-- 
-- Employees
-- 

create table employees(
    id integer primary key autoincrement,
    `name` text not null,
    `password` text not null,
    `admin` boolean not null,
    `email` text not null
);

-- 
-- Home
-- 

create table info_boards(
    id integer primary key autoincrement,
    contents text not null
);

-- 
-- Construction law (prawo budowlane)
-- 

create table construction_law_categories(
    id integer primary key autoincrement,
    register_type text not null,
    `name` text not null
);

create table construction_law_intents(
    id integer primary key autoincrement,
    category_id integer not null,
    intent text not null,
    legal_basis text not null, -- podstawa prawna
    additional_requirements text not null, -- dodatkowe wymagania
    foreign key(category_id) references construction_law_categories(id)
);