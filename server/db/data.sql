-- 
-- data.sql
-- Sample data for the database
-- 

-- 
-- Investors
-- 

insert into investors values
    (null, '-', '-', TRUE),
    -- https://mail.google.com/mail/u/0/#starred/FMfcgzQXKhHPMFQHSvXQqXhwQQFGlGzh
    (null, 'IVGROUP VALERII LAZARIEV', '-', TRUE),
    (null, 'Estimet Sp. z o.o.', '-', TRUE),
    (null, 'Hanna i Piotr Kalinowscy', '-', FALSE),
    (null, 'Piotr Staszków', '-', FALSE),
    (null, 'Magdalena i Piotr Majer', '-', FALSE);
-- insert into investors values
--     (null, '"ODEJEWSKI - ODAN" Sp.  Z o.o.', 'blah blah blah'),
--     (null, '"ROLA" Sp. z o.o.', 'blah blah blah'),
--     (null, '"SZCZEPAN" J. SZCZEPAŃSKI i Z. SZCZEPAŃSKI', 'blah blah blah'),
--     (null, '„POLSTYR” Sp. z o. o.', 'blah blah blah'),
--     (null, 'Adam Stec', 'blah blah blah'),
--     (null, 'Agencja Mienia Wojskowego', 'blah blah blah'),
--     (null, 'Agnieszka Chudy', 'blah blah blah'),
--     (null, 'Anna Bartoś', 'blah blah blah'),
--     (null, 'Anna Szymanek', 'blah blah blah'),
--     (null, 'Burmistrz Czarnego', 'blah blah blah'),
--     (null, 'Burmistrz Debrzna', 'blah blah blah'),
--     (null, 'Burmistrz Miasta Człuchów', 'blah blah blah'),
--     (null, 'Daniel Folehr', 'blah blah blah'),
--     (null, 'Edyta Sobolewska', 'blah blah blah'),
--     (null, 'Ewa Stroińska', 'blah blah blah'),
--     (null, 'Ewa Zagórzańska', 'blah blah blah'),
--     (null, 'GABI BIS JERCZYŃSKI ', 'blah blah blah'),
--     (null, 'Generalna Dyrekcja Dróg Krajowych i Autostrad', 'blah blah blah'),
--     (null, 'Gmina Czarne', 'blah blah blah'),
--     (null, 'Gmina Człuchów', 'blah blah blah'),
--     (null, 'Gmina Debrzno', 'blah blah blah'),
--     (null, 'Gmina Miejska Człuchów', 'blah blah blah'),
--     (null, 'Gmina Przechlewo', 'blah blah blah'),
--     (null, 'Grzegorz Józefko', 'blah blah blah'),
--     (null, 'Inwestycje Sp. z o . o.', 'blah blah blah'),
--     (null, 'Józef Rzeszczyński', 'blah blah blah'),
--     (null, 'Katarzyna Stec', 'blah blah blah'),
--     (null, 'Krajowy Ośrodek Wsparcia Rolnictwa', 'blah blah blah'),
--     (null, 'Krystyna Rzeszczyńska', 'blah blah blah'),
--     (null, 'Marcin Bartoś', 'blah blah blah'),
--     (null, 'Michał Dyl', 'blah blah blah'),
--     (null, 'MKS Piast Człuchów', 'blah blah blah'),
--     (null, 'Nadleśnictwo Czarnobór ', 'blah blah blah'),
--     (null, 'Nadleśnictwo Człuchów', 'blah blah blah'),
--     (null, 'NOVODOM Developer Sp. z o.o.', 'blah blah blah'),
--     (null, 'Ośrodek Sportu i Rekreacji ', 'blah blah blah'),
--     (null, 'Pan Grzegorz Wojas', 'blah blah blah'),
--     (null, 'Pan Piotr Piotrowicz', 'blah blah blah'),
--     (null, 'Państwowe Gospodarstwo Leśne Lasy Państwowe', 'blah blah blah'),
--     (null, 'PINB w Człuchowie', 'blah blah blah'),
--     (null, 'Piotr Staszków', 'blah blah blah'),
--     (null, 'POLTAREX Polskie Drewno Sp. z o.o. ', 'blah blah blah'),
--     (null, 'Powiat Człuchowski', 'blah blah blah'),
--     (null, 'Przedsiębiorstwo Komunalne Spółka z o.o.', 'blah blah blah'),
--     (null, 'PVE 19 Sp. z o.o.', 'blah blah blah'),
--     (null, 'Regionalny Zarząd Gospodarki Wodnej', 'blah blah blah'),
--     (null, 'Rodzinny Ogród Działkowy "NASZ OGRÓD"', 'blah blah blah'),
--     (null, 'Starostwo Powiatowe w Człuchowie', 'blah blah blah'),
--     (null, 'Stowarzyszenie Solidarni "PLUS"', 'blah blah blah'),
--     (null, 'Szymon Szultka', 'blah blah blah'),
--     (null, 'Władysław Stec', 'blah blah blah'),
--     (null, 'Wojewódzki Konserwator Zabytków', 'blah blah blah'),
--     (null, 'Wojewódzki Urząd Ochrony Zabytków w Gdańsku', 'blah blah blah'),
--     (null, 'Wójt gminy Przechlewo', 'blah blah blah'),
--     (null, 'Zakład Karny w Czarnem', 'blah blah blah'),
--     (null, 'Zarząd Powiatu Człuchowskiego', 'blah blah blah');

-- 
-- Geodesy
-- 

-- insert into communes values
--     (null, 'Bukowo'),
--     (null, 'Człuchów'),
--     (null, 'Płonica'),
--     (null, 'Polnica'),
--     (null, 'Wierzchowo'),
--     (null, 'Wejherowo'),
--     (null, 'Gdańsk'),
--     (null, 'Pomerania'),
--     (null, 'Gdynia'),
--     (null, 'Bydgoszcz'),
--     (null, 'Radom'),
--     (null, 'Warszawa');

-- insert into places values
--     (null, 'Wejcherowo', 1, 1, '132334'),
--     (null, 'Bukowo', 1, 1, '13423344'),
--     (null, 'Dzuma', 1, 1, '3412334434'),
--     (null, 'Las', 1, 1, '1234433'),
--     (null, 'xd', 1, 1, '1230');
    
-- insert into streets values
--     (null, 'Jana Pawla', 1),
--     (null, 'Jana Pawla II', 2),
--     (null, 'Zygmunta', 2),
--     (null, 'Tadeusza', 4);

-- 
-- PKOB
-- 

-- insert into construction_sections values
--     (null, 'Budynki'),
--     (null, 'Statki'),
--     (null, 'Pałace');

-- insert into construction_divisions values
--     (null, 'mieszkalne', 1),
--     (null, 'niemieszkalne', 1),
--     (null, 'kosmiczne', 2),
--     (null, 'pasazerskie', 2),
--     (null, 'wakacyjne', 3),
--     (null, 'kultury', 3),
--     (null, 'sztuki', 3),
--     (null, 'nauki', 3);

-- insert into construction_groups values
--     (null, 'jednorodzinne', 1),
--     (null, 'wielorodzinne', 1),
--     (null, 'udekorowane', 2),
--     (null, 'nieudekorowane', 2),
--     (null, 'malarnej', 3),
--     (null, 'digitalnej', 3);

-- insert into construction_classes values
--     (null, 'pawilon', 1, 1110),
--     (null, 'willa', 1, 1112);

-- insert into construction_specs values
--     (null, 'abc', 1, 'WR', 'XVI'),
--     (null, 'def', 2, 'FF', 'DOS'),
--     (null, 'ghi', 3, 'DE', 'LOS'),
--     (null, 'jkl', 4, 'DE', 'FAE');

-- 
-- Registers
-- 

insert into registers(
    id,
    `type`,

    assigned_employee_id,

    app_number,
    app_submission_date,
    app_investor_id,
    app_new_investor_id,
    app_decision_type, app_decision_number, app_decision_issue_date,
    app_resolution_type, app_resolution_number, app_resolution_issue_date,
    app_construction_journal_type,

    object_construction_spec_id,
    object_custom_construction_intent,
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
    object_demo_premises_count,
    object_usage_change_from,
    object_usage_change_to,
    object_construction_law_intent_id,
    object_public_info,
    object_localization_date_from,
    object_localization_date_to,
    object_neighbouring_property_type,

    admin_construction_journal_number,
    admin_construction_journal_date,
    admin_construction_journal_tome,

    other_case_title,
    other_case_from,
    other_case_sign,
    other_case_date,
    other_case_init_date,
    other_case_settle_date,
    other_case_comments
) values (
    null,
    'PnB (6740)',

    1,

    '69',
    '2022-12-19',
    1, 1,
    'Inne rozstrzygnięcie', '420', '2019-02-05',
    'Bez rozpatrzenia', '2137', '2011-07-23',
    'Elektroniczny',

    1,
    '',
    'Indywidualne',
    'MPZP',
    1,
    34,
    TRUE,
    TRUE, 69, 69, 69, 69, 1,
    'z ...',
    'na ...',
    1,
    FALSE,
    '1999-12-19', '1999-12-19',
    'Budynek',

    420,
    '1999-12-19',
    1,

    '', '', '', '', '', '', ''
), (
    null,
    'PnB (6740)',
    
    2,

    '69420',
    '2022-12-19',
    2, 1,
    'Inne rozstrzygnięcie', '420', '2019-02-05',
    'Bez rozpatrzenia', '2137', '2011-07-23',
    'Elektroniczny',

    1,
    '',
    'Indywidualne',
    'MPZP',
    1,
    34,
    TRUE,
    TRUE, 69, 69, 69, 69, 2,
    'z ...',
    'na ...',
    1,
    FALSE,
    '1999-12-19', '1999-12-19',
    'Budynek',

    420,
    '1999-12-19',
    1,

    '', '', '', '', '', '', ''
), (
    null,
    'PnB (6740)',

    3,

    '2137',
    '2022-12-19',
    3, 1,
    'Inne rozstrzygnięcie', '420', '2019-02-05',
    'Bez rozpatrzenia', '2137', '2011-07-23',
    'Elektroniczny',

    1,
    '',
    'Indywidualne',
    'MPZP',
    1,
    34,
    TRUE,
    TRUE, 69, 69, 69, 69, 3,
    'z ...',
    'na ...',
    1,
    FALSE,
    '1999-12-19', '1999-12-19',
    'Budynek',

    420,
    '1999-12-19',
    1,

    '', '', '', '', '', '', ''
), (
    null,
    'PnB (6740)',

    4,

    '666',
    '2023-12-19',
    4, 1,
    'Inne rozstrzygnięcie', '420', '2019-02-05',
    'Bez rozpatrzenia', '2137', '2011-07-23',
    'Elektroniczny',

    1,
    '',
    'Indywidualne',
    'MPZP',
    1,
    34,
    TRUE,
    TRUE, 69, 69, 69, 69, 4,
    'z ...',
    'na ...',
    1,
    FALSE,
    '1999-12-19', '1999-12-19',
    'Budynek',

    420,
    '1999-12-19',
    1,

    '', '', '', '', '', '', ''
), (
    null,
    'PnB (6740)',

    5,

    '619',
    '2023-12-19',
    5, 1,
    'Inne rozstrzygnięcie', '420', '2019-02-05',
    'Bez rozpatrzenia', '2137', '2011-07-23',
    'Elektroniczny',

    1,
    '',
    'Indywidualne',
    'MPZP',
    1,
    34,
    TRUE,
    TRUE, 69, 69, 69, 69, 5,
    'z ...',
    'na ...',
    1,
    FALSE,
    '1999-12-19', '1999-12-19',
    'Budynek',

    420,
    '1999-12-19',
    1,

    '', '', '', '', '', '', ''
),
--
-- https://mail.google.com/mail/u/0/#starred/FMfcgzQXKhHPMFQHSvXQqXhwQQFGlGzh
--
(
    null, 'Tymczasowe (6743.5)', 1,
    'BiA.6743.2.114.2023', '2023-04-13', 2, 1,
    'Sprzeciwu', '-', '2024-07-18', -- dec
    '-', '-', '', -- res
    'Elektroniczny',

    0,
    'Budowa obiektu tymczasowego niepołączonego stałe z gruntem – obiekt malej gastronomii zlokalizowanego na działce nr 87/7 w m. Człuchów, ul. Rynek',
    '-', '-',
    0, '',
    FALSE, FALSE,
    0, 0, 0, 0, 0,
    '', '',
    0, FALSE,
    '2023-04-13', '2023-09-31',
    'Budynek',

    0, '', 0,

    '', '', '', '', '', '', ''
), (
    null, 'Tymczasowe (6743.5)', 1,
    'BiA.6743.2.276.2023', '2023-08-29', 3, 1,
    'Pozytywna', '41.2024', '2024-02-27', -- dec
    '-', '-', '', -- res
    'Elektroniczny',

    0,
    'Budowa tymczasowego obiektu budowlanego – hali namiotowej – nietrwale związanej z gruntem na okres 180 dni 693/11 obr. Koczała, gm. Koczała',
    '-', '-',
    0, '',
    FALSE, FALSE,
    0, 0, 0, 0, 0,
    '', '',
    0, FALSE,
    '2023-09-11', '2024-03-09',
    'Budynek',

    0, '', 0,

    '', '', '', '', '', '', ''
), (
    null, 'Tymczasowe (6743.5)', 1,
    'BiA.6743.2.337.2023.ED', '2023-11-08', 4, 1,
    '-', '-', '', -- dec
    '-', '-', '', -- res
    'Elektroniczny',

    0,
    'Budowa budynku tymczasowego na okres 180dni tymczasowa ekspozycja, niepołączona trwale z gruntem o pow.zab. 69,82m2 na dz. Nr 417/25 obr. Nieżywięć, gm. Człuchów',
    '-', '-',
    0, '',
    FALSE, FALSE,
    0, 0, 0, 0, 0,
    '', '',
    0, FALSE,
    '2023-11-22', '2024-05-20',
    'Budynek',

    0, '', 0,

    '', '', '', '', '', '', ''
), (
    null, 'Tymczasowe (6743.5)', 1,
    'BiA.6743.2.104.2023', '2024-05-10', 5, 1,
    '-', '-', '', -- dec
    '-', '-', '', -- res
    'Elektroniczny',

    0,
    'Budowa budynku tymczasowego o funkcji handlowo-usługowej niepołączonym trwale z gruntem na dz. nr 2/19 w m. Człuchów.',
    '-', '-',
    0, '',
    FALSE, FALSE,
    0, 0, 0, 0, 0,
    '', '',
    0, FALSE,
    '2024-07-03', '2024-09-30',
    'Budynek',

    0, '', 0,

    '', '', '', '', '', '', ''
), (
    null, 'Tymczasowe (6743.5)', 1,
    'BiA.6743.2.157.2024', '2024-07-09', 4, 1,
    '-', '-', '', -- dec
    '-', '-', '', -- res
    'Elektroniczny',

    0,
    'Budynek tymczasowy ekspozycyjny niepołączony trwale z gruntem o pow.zab 69,82 m2 na okres na dz. Nr 417/25 obr. Niezywięć, gm. Człuchów',
    '-', '-',
    0, '',
    FALSE, FALSE,
    0, 0, 0, 0, 0,
    '', '',
    0, FALSE,
    '2024-07-30', '2025-01-27',
    'Budynek',

    0, '', 0,

    '', '', '', '', '', '', ''
), (
    null, 'Tymczasowe (6743.5)', 1,
    'BiA.6743.2.180.2024', '2024-08-09', 6, 1,
    '-', '-', '', -- dec
    '-', '-', '', -- res
    'Elektroniczny',

    0,
    'Postawienie tymczasowego kontenera o funkcji handlowej nie połączonego trwale z gruntem na dz. nr 334/1 obręb Przechlewo, gm. Przechlewo',
    '-', '-',
    0, '',
    FALSE, FALSE,
    0, 0, 0, 0, 0,
    '', '',
    0, FALSE,
    '2024-09-02', '2025-03-01',
    'Budynek',

    0, '', 0,

    '', '', '', '', '', '', ''
);

-- 
-- Employees
-- 

insert into employees values
    (null, '-', '-', 0, ''),
    (null, 'Elżbieta Dawidziak', '', 0, ''),
    (null, 'Krzysztof Czuryło', '', 0, ''),
    (null, 'Lucyna Spisak', '', 0, ''),
    (null, 'Edyta Drążek', '', 0, ''),
    (null, 'Małgorzata Marczak', '', 0, ''),
    (null, 'Roman Bębenek', '', 0, ''),
    (null, 'Marta Kozakiewicz', '', 0, ''),
    (null, 'Edyta Pałubicka', '', 0, ''),
    (null, 'Admin', '12345', 1, '');

-- 
-- Home
-- 

insert into info_boards values(null, 'testowa zawartosc');

-- 
-- PrBud
-- 

-- insert into construction_law_categories values
--     (null, 'Zg. Zwykłe (6743.2)', 'Budowa'),
--     (null, 'Zg. Zwykłe (6743.2)', 'Przebudowa'),
--     (null, 'Zg. Zwykłe (6743.2)', 'Remont'),
--     (null, 'Zg. Zwykłe (6743.2)', 'Instalacja'),
--     (null, 'Zg. Zwykłe (6743.2)', 'Inne'),
--     (null, 'BiP (6743.4)', 'Budowa'),
--     (null, 'BiP (6743.4)', 'Przebudowa'),
--     (null, 'BiP (6743.4)', 'Instalacja'),
--     (null, 'BiP (6743.4)', 'Inne');

--
-- Other
--
-- table registers_admin_actions( -- rejestry: czynnosci administracyjne
--     id integer primary key autoincrement,
--     `type` text not null,
--     register_id integer not null,
--     `select` boolean not null, -- wybor
--     deadline integer not null, -- termin
--     letter_date date not null, -- data pisma
--     receipt_date date, -- data odebrania
--     reply_date date, -- data odpowiedzi
--     foreign key(register_id) references registers(id),
--     CONSTRAINT uq UNIQUE(register_id, `type`) ON CONFLICT REPLACE
-- );
--
-- https://mail.google.com/mail/u/0/#starred/FMfcgzQXKhHPMFQHSvXQqXhwQQFGlGzh
--
insert into registers_admin_actions values (
    null, 'Kontrola', 10,
    TRUE, 0,
    '2024-07-25', '', ''
);