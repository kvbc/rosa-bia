-- 
-- data.sql
-- Sample data for the database
-- 

-- 
-- Investors
-- 

insert into investors values
    (null, '"ODEJEWSKI - ODAN" Sp.  Z o.o.', 'blah blah blah', 'info ...'),
    (null, '"ROLA" Sp. z o.o.', 'blah blah blah', 'info ...'),
    (null, '"SZCZEPAN" J. SZCZEPAŃSKI i Z. SZCZEPAŃSKI', 'blah blah blah', 'info ...'),
    (null, '„POLSTYR” Sp. z o. o.', 'blah blah blah', 'info ...'),
    (null, 'Adam Stec', 'blah blah blah', 'info ...'),
    (null, 'Agencja Mienia Wojskowego', 'blah blah blah', 'info ...'),
    (null, 'Agnieszka Chudy', 'blah blah blah', 'info ...'),
    (null, 'Anna Bartoś', 'blah blah blah', 'info ...'),
    (null, 'Anna Szymanek', 'blah blah blah', 'info ...'),
    (null, 'Burmistrz Czarnego', 'blah blah blah', 'info ...'),
    (null, 'Burmistrz Debrzna', 'blah blah blah', 'info ...'),
    (null, 'Burmistrz Miasta Człuchów', 'blah blah blah', 'info ...'),
    (null, 'Daniel Folehr', 'blah blah blah', 'info ...'),
    (null, 'Edyta Sobolewska', 'blah blah blah', 'info ...'),
    (null, 'Ewa Stroińska', 'blah blah blah', 'info ...'),
    (null, 'Ewa Zagórzańska', 'blah blah blah', 'info ...'),
    (null, 'GABI BIS JERCZYŃSKI ', 'blah blah blah', 'info ...'),
    (null, 'Generalna Dyrekcja Dróg Krajowych i Autostrad', 'blah blah blah', 'info ...'),
    (null, 'Gmina Czarne', 'blah blah blah', 'info ...'),
    (null, 'Gmina Człuchów', 'blah blah blah', 'info ...'),
    (null, 'Gmina Debrzno', 'blah blah blah', 'info ...'),
    (null, 'Gmina Miejska Człuchów', 'blah blah blah', 'info ...'),
    (null, 'Gmina Przechlewo', 'blah blah blah', 'info ...'),
    (null, 'Grzegorz Józefko', 'blah blah blah', 'info ...'),
    (null, 'Inwestycje Sp. z o . o.', 'blah blah blah', 'info ...'),
    (null, 'Józef Rzeszczyński', 'blah blah blah', 'info ...'),
    (null, 'Katarzyna Stec', 'blah blah blah', 'info ...'),
    (null, 'Krajowy Ośrodek Wsparcia Rolnictwa', 'blah blah blah', 'info ...'),
    (null, 'Krystyna Rzeszczyńska', 'blah blah blah', 'info ...'),
    (null, 'Marcin Bartoś', 'blah blah blah', 'info ...'),
    (null, 'Michał Dyl', 'blah blah blah', 'info ...'),
    (null, 'MKS Piast Człuchów', 'blah blah blah', 'info ...'),
    (null, 'Nadleśnictwo Czarnobór ', 'blah blah blah', 'info ...'),
    (null, 'Nadleśnictwo Człuchów', 'blah blah blah', 'info ...'),
    (null, 'NOVODOM Developer Sp. z o.o.', 'blah blah blah', 'info ...'),
    (null, 'Ośrodek Sportu i Rekreacji ', 'blah blah blah', 'info ...'),
    (null, 'Pan Grzegorz Wojas', 'blah blah blah', 'info ...'),
    (null, 'Pan Piotr Piotrowicz', 'blah blah blah', 'info ...'),
    (null, 'Państwowe Gospodarstwo Leśne Lasy Państwowe', 'blah blah blah', 'info ...'),
    (null, 'PINB w Człuchowie', 'blah blah blah', 'info ...'),
    (null, 'Piotr Staszków', 'blah blah blah', 'info ...'),
    (null, 'POLTAREX Polskie Drewno Sp. z o.o. ', 'blah blah blah', 'info ...'),
    (null, 'Powiat Człuchowski', 'blah blah blah', 'info ...'),
    (null, 'Przedsiębiorstwo Komunalne Spółka z o.o.', 'blah blah blah', 'info ...'),
    (null, 'PVE 19 Sp. z o.o.', 'blah blah blah', 'info ...'),
    (null, 'Regionalny Zarząd Gospodarki Wodnej', 'blah blah blah', 'info ...'),
    (null, 'Rodzinny Ogród Działkowy "NASZ OGRÓD"', 'blah blah blah', 'info ...'),
    (null, 'Starostwo Powiatowe w Człuchowie', 'blah blah blah', 'info ...'),
    (null, 'Stowarzyszenie Solidarni "PLUS"', 'blah blah blah', 'info ...'),
    (null, 'Szymon Szultka', 'blah blah blah', 'info ...'),
    (null, 'Władysław Stec', 'blah blah blah', 'info ...'),
    (null, 'Wojewódzki Konserwator Zabytków', 'blah blah blah', 'info ...'),
    (null, 'Wojewódzki Urząd Ochrony Zabytków w Gdańsku', 'blah blah blah', 'info ...'),
    (null, 'Wójt gminy Przechlewo', 'blah blah blah', 'info ...'),
    (null, 'Zakład Karny w Czarnem', 'blah blah blah', 'info ...'),
    (null, 'Zarząd Powiatu Człuchowskiego', 'blah blah blah', 'info ...');

-- 
-- Geodesy
-- 

insert into communes values
    (null, 'Bukowo'),
    (null, 'Człuchów'),
    (null, 'Płonica'),
    (null, 'Polnica'),
    (null, 'Wierzchowo'),
    (null, 'Wejherowo'),
    (null, 'Gdańsk'),
    (null, 'Pomerania'),
    (null, 'Gdynia'),
    (null, 'Bydgoszcz'),
    (null, 'Radom'),
    (null, 'Warszawa');

insert into places values
    (null, 'Wejcherowo', 1, 1, '132334'),
    (null, 'Bukowo', 1, 1, '13423344'),
    (null, 'Dzuma', 1, 1, '3412334434'),
    (null, 'Las', 1, 1, '1234433'),
    (null, 'xd', 1, 1, '1230');
    
insert into streets values
    (null, 'Jana Pawla', 1),
    (null, 'Jana Pawla II', 2),
    (null, 'Zygmunta', 2),
    (null, 'Tadeusza', 4);

-- 
-- PKOB
-- 

insert into construction_sections values
    (null, 'Budynki'),
    (null, 'Statki'),
    (null, 'Pałace');

insert into construction_divisions values
    (null, 'mieszkalne', 1),
    (null, 'niemieszkalne', 1),
    (null, 'kosmiczne', 2),
    (null, 'pasazerskie', 2),
    (null, 'wakacyjne', 3),
    (null, 'kultury', 3),
    (null, 'sztuki', 3),
    (null, 'nauki', 3);

insert into construction_groups values
    (null, 'jednorodzinne', 1),
    (null, 'wielorodzinne', 1),
    (null, 'udekorowane', 2),
    (null, 'nieudekorowane', 2),
    (null, 'malarnej', 3),
    (null, 'digitalnej', 3);

insert into construction_classes values
    (null, 'pawilon', 1, 1110),
    (null, 'willa', 1, 1112);

insert into construction_specs values
    (null, 'abc', 1, 'WR', 'XVI'),
    (null, 'def', 2, 'FF', 'DOS'),
    (null, 'ghi', 3, 'DE', 'LOS'),
    (null, 'jkl', 4, 'DE', 'FAE');

-- 
-- Registers
-- 

insert into registers(
    id,
    `type`,

    app_number,
    app_submission_date,
    app_investor_id,
    app_decision_type,
    app_decision_number,
    app_decision_issue_date,
    app_resolution_type,
    app_resolution_number,
    app_resolution_issue_date,

    object_construction_spec_id,
    object_construction_form_type,
    object_spatial_plan_type,
    object_street_id,
    object_number,
    object_pnb_acc_infra,
    object_demo_under_conservation_protection,
    object_demo_building_area,
    object_demo_usable_area,
    object_demo_volume,
    object_demo_building_count,

    admin_construction_journal_number,
    admin_construction_journal_date
) values (
    null,
    'PnB (6740)',

    69,
    '2006-12-19',
    1,
    null, 420, '2019-02-05',
    null, 2137, '2011-07-23',

    1,
    1,
    1,
    1,
    34,
    1,
    1,
    69,
    69,
    69,
    69,

    420,
    '1999-12-19'
);

-- 
-- Employees
-- 

insert into employees values
    (null, 'Tomasz Jomasz', '', 0),
    (null, 'Tymek Dymek', '', 0),
    (null, 'Marek Zegarek', '123', 0),
    (null, 'Arek Garek', '', 0),
    (null, 'Admin', '12345', 1);

-- 
-- Home
-- 

insert into info_boards values(null, 'testowa zawartosc');