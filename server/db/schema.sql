-- 
-- Investors
-- 

create table investors(
    id integer primary key autoincrement,
    `name` text not null unique,
    `address` text not null,
    info text not null
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
    cad_unit text not null unique, -- cadastral unit (jedn. ewid.),
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
    `name` text not null unique,
    division_id integer not null,
    foreign key(division_id) references construction_divisions(id)
);
create table construction_classes( -- klasy budowlane
    id integer primary key autoincrement,
    `name` text not null unique,
    group_id integer not null,
    pkob integer not null unique,
    foreign key(group_id) references construction_groups(id)
);
create table construction_specs( -- wyszczegolnienia budowlane
    id integer primary key autoincrement,
    `name` text not null unique,
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

    app_number integer not null unique, -- numer wniosku
    app_submission_date date not null, -- data zlozenia
    app_investor_id integer not null,
    app_decision_type text,
    app_decision_number integer not null,
    app_decision_issue_date date not null, -- data wydania decyzji wniosku
    app_resolution_type text,
    app_resolution_number integer not null,
    app_resolution_issue_date date not null, -- data wydania rozstrzygniecia

    object_construction_spec_id integer not null, -- id wyszczegolnienia budowlanego obiektu 
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
    object_usage_change_from text not null, -- zm. sp. uzytk. z
    object_usage_change_to text not null, -- zm. sp. uzytk. na

    admin_construction_journal_number integer not null, -- numer dziennika budowy
    admin_construction_journal_date date not null, -- data dziennika budowy

    foreign key(app_investor_id) references investors(id),
    foreign key(object_construction_spec_id) references construction_specs(id),
    foreign key(object_street_id) references streets(id)
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
    foreign key(register_id) references registers(id)
);

-- 
-- Employees
-- 

create table employees(
    id integer primary key autoincrement,
    `name` text not null,
    `password` text not null,
    `admin` boolean not null
);

-- 
-- Home
-- 

create table info_boards(
    id integer primary key autoincrement,
    contents text not null
);