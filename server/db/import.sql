-- 
-- Inwestorzy
-- 

create table inwestorzy(
    id integer primary key autoincrement,
    nazwa text not null unique,
    adres text not null
);

-- 
-- Geodezja
-- 

create table gminy(
    id integer primary key autoincrement,
    nazwa text not null unique
);
create table miejscowosci(
    id integer primary key autoincrement,
    nazwa text not null,
    gmina_id integer not null,
    obreb_id integer not null,
    jedn_ewid text not null unique,
    foreign key(gmina_id) references gminy(id),
    foreign key(obreb_id) references miejscowosci(id)
);
create table ulice(
    id integer primary key autoincrement,
    nazwa text not null,
    miejscowosc_id integer not null,
    foreign key(miejscowosc_id) references miejscowosci(id)
);

-- 
-- PKOB
-- 

create table sekcje_budowlane(
    id integer primary key autoincrement,
    sekcja text not null unique
);
create table dzialy_budowlane(
    id integer primary key autoincrement,
    dzial text not null,
    sekcja_id integer not null,
    foreign key(sekcja_id) references sekcje_budowlane(id)
);
create table grupy_budowlane(
    id integer primary key autoincrement,
    grupa text not null unique,
    dzial_id integer not null,
    foreign key(dzial_id) references dzialy_budowlane(id)
);
create table klasy_budowlane(
    id integer primary key autoincrement,
    klasa text not null unique,
    grupa_id integer not null,
    pkob integer not null unique,
    foreign key(grupa_id) references grupy_budowlane(id)
);
create table wyszczegolnienia_budowlane(
    id integer primary key autoincrement,
    nazwa text not null unique,
    klasa_id integer not null,
    klasa_zl text not null, /* klasa zagrozenia ludzi */
    kat_ob text not null, /* kat. obiektu budowy */
    foreign key(klasa_id) references klasy_budowlane(id)
);

create table typy_budowy(
    id integer primary key autoincrement,
    typ text not null unique
);
create table formy_budownictwa(
    id integer primary key autoincrement,
    forma text not null unique
);
create table planowania_przestrzenne(
    id integer primary key autoincrement,
    planowanie text not null unique
);

-- 
-- Konfiguracja
-- 

create table typy_czynnosci_admin(
    id integer primary key autoincrement,
    typ text not null unique
);

-- 
-- Rejestry
-- 

create table rejestry(
    id integer primary key autoincrement,
    typ text not null,

    wniosek_numer integer not null unique,
    wniosek_data_zlozenia date not null,
    wniosek_inwestor_id integer not null,
    wniosek_decyzja_typ text,
    wniosek_decyzja_numer integer not null,
    wniosek_decyzja_data_wydania date not null,
    wniosek_rozstrzygniecie_typ text,
    wniosek_rozstrzygniecie_numer_pisma integer not null,
    wniosek_rozstrzygniecie_data_wydania date not null,

    obiekt_wyszczegolnienie_id integer not null,
    obiekt_forma_budownictwa_id integer not null,
    obiekt_planowanie_przestrzenne_id integer not null,
    obiekt_ulica_id integer not null,
    obiekt_nr text not null,
    obiekt_pnb_infrastruktura_towarzyszaca boolean not null,
    obiekt_rozbiorka_objety_ochrona_konserwatorska boolean not null,

    foreign key(wniosek_inwestor_id) references inwestorzy(id),
    foreign key(obiekt_wyszczegolnienie_id) references wyszczegolnienia_budowlane(id),
    foreign key(obiekt_forma_budownictwa_id) references formy_budownictwa(id),
    foreign key(obiekt_planowanie_przestrzenne_id) references planowania_przestrzenne(id),
    foreign key(obiekt_ulica_id) references ulice(id)
);
create table rejestry_typy_budowy(
    id integer primary key autoincrement,
    typ_id integer not null,
    rejestr_id integer not null,
    foreign key(typ_id) references typy_budowy(id),
    foreign key(rejestr_id) references rejestry(id)
);
create table rejestry_dzialki_objete_inwestycja(
    id integer primary key autoincrement,
    dzialka text not null,
    rejestr_id integer not null,
    foreign key(rejestr_id) references rejestry(id)
);
create table rejestry_czynnosci_admin(
    id integer primary key autoincrement,
    typ_id integer not null,
    rejestr_id integer not null,
    wybor boolean not null,
    termin integer not null,
    data_pisma date not null,
    data_odebrania date,
    data_odpowiedzi date,
    foreign key(typ_id) references typy_czynnosci_admin(id),
    foreign key(rejestr_id) references rejestry(id)
);

-- 
-- Glowna
-- 

create table tablice_informacyjne(
    id integer primary key autoincrement,
    zawartosc text not null
);

-- 
-- 
-- 

insert into inwestorzy values
    (null, '"ODEJEWSKI - ODAN" Sp.  Z o.o.', 'blah blah blah'),
    (null, '"ROLA" Sp. z o.o.', 'blah blah blah'),
    (null, '"SZCZEPAN" J. SZCZEPAŃSKI i Z. SZCZEPAŃSKI', 'blah blah blah'),
    (null, '„POLSTYR” Sp. z o. o.', 'blah blah blah'),
    (null, 'Adam Stec', 'blah blah blah'),
    (null, 'Agencja Mienia Wojskowego', 'blah blah blah'),
    (null, 'Agnieszka Chudy', 'blah blah blah'),
    (null, 'Anna Bartoś', 'blah blah blah'),
    (null, 'Anna Szymanek', 'blah blah blah'),
    (null, 'Burmistrz Czarnego', 'blah blah blah'),
    (null, 'Burmistrz Debrzna', 'blah blah blah'),
    (null, 'Burmistrz Miasta Człuchów', 'blah blah blah'),
    (null, 'Daniel Folehr', 'blah blah blah'),
    (null, 'Edyta Sobolewska', 'blah blah blah'),
    (null, 'Ewa Stroińska', 'blah blah blah'),
    (null, 'Ewa Zagórzańska', 'blah blah blah'),
    (null, 'GABI BIS JERCZYŃSKI ', 'blah blah blah'),
    (null, 'Generalna Dyrekcja Dróg Krajowych i Autostrad', 'blah blah blah'),
    (null, 'Gmina Czarne', 'blah blah blah'),
    (null, 'Gmina Człuchów', 'blah blah blah'),
    (null, 'Gmina Debrzno', 'blah blah blah'),
    (null, 'Gmina Miejska Człuchów', 'blah blah blah'),
    (null, 'Gmina Przechlewo', 'blah blah blah'),
    (null, 'Grzegorz Józefko', 'blah blah blah'),
    (null, 'Inwestycje Sp. z o . o.', 'blah blah blah'),
    (null, 'Józef Rzeszczyński', 'blah blah blah'),
    (null, 'Katarzyna Stec', 'blah blah blah'),
    (null, 'Krajowy Ośrodek Wsparcia Rolnictwa', 'blah blah blah'),
    (null, 'Krystyna Rzeszczyńska', 'blah blah blah'),
    (null, 'Marcin Bartoś', 'blah blah blah'),
    (null, 'Michał Dyl', 'blah blah blah'),
    (null, 'MKS Piast Człuchów', 'blah blah blah'),
    (null, 'Nadleśnictwo Czarnobór ', 'blah blah blah'),
    (null, 'Nadleśnictwo Człuchów', 'blah blah blah'),
    (null, 'NOVODOM Developer Sp. z o.o.', 'blah blah blah'),
    (null, 'Ośrodek Sportu i Rekreacji ', 'blah blah blah'),
    (null, 'Pan Grzegorz Wojas', 'blah blah blah'),
    (null, 'Pan Piotr Piotrowicz', 'blah blah blah'),
    (null, 'Państwowe Gospodarstwo Leśne Lasy Państwowe', 'blah blah blah'),
    (null, 'PINB w Człuchowie', 'blah blah blah'),
    (null, 'Piotr Staszków', 'blah blah blah'),
    (null, 'POLTAREX Polskie Drewno Sp. z o.o. ', 'blah blah blah'),
    (null, 'Powiat Człuchowski', 'blah blah blah'),
    (null, 'Przedsiębiorstwo Komunalne Spółka z o.o.', 'blah blah blah'),
    (null, 'PVE 19 Sp. z o.o.', 'blah blah blah'),
    (null, 'Regionalny Zarząd Gospodarki Wodnej', 'blah blah blah'),
    (null, 'Rodzinny Ogród Działkowy "NASZ OGRÓD"', 'blah blah blah'),
    (null, 'Starostwo Powiatowe w Człuchowie', 'blah blah blah'),
    (null, 'Stowarzyszenie Solidarni "PLUS"', 'blah blah blah'),
    (null, 'Szymon Szultka', 'blah blah blah'),
    (null, 'Władysław Stec', 'blah blah blah'),
    (null, 'Wojewódzki Konserwator Zabytków', 'blah blah blah'),
    (null, 'Wojewódzki Urząd Ochrony Zabytków w Gdańsku', 'blah blah blah'),
    (null, 'Wójt gminy Przechlewo', 'blah blah blah'),
    (null, 'Zakład Karny w Czarnem', 'blah blah blah'),
    (null, 'Zarząd Powiatu Człuchowskiego', 'blah blah blah');

insert into gminy values
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

insert into miejscowosci values
    (null, 'Wejcherowo', 1, 1, '132334'),
    (null, 'Bukowo', 1, 1, '13423344'),
    (null, 'Dzuma', 1, 1, '3412334434'),
    (null, 'Las', 1, 1, '1234433'),
    (null, 'xd', 1, 1, '1230');
    
insert into ulice values
    (null, 'Jana Pawla', 1),
    (null, 'Jana Pawla II', 2),
    (null, 'Zygmunta', 2),
    (null, 'Tadeusza', 4);

insert into typy_czynnosci_admin values
    (null, 'Wezwanie'),
    (null, 'Zawiadomienie'),
    (null, 'Postanowienie'),
    (null, 'Konserwator'),
    (null, 'Zawieszenie postępowania'),
    (null, 'Przedłużenie terminu');

insert into sekcje_budowlane values
    (null, 'Budynki'),
    (null, 'Statki'),
    (null, 'Pałace');

insert into dzialy_budowlane values
    (null, 'mieszkalne', 1),
    (null, 'niemieszkalne', 1),
    (null, 'kosmiczne', 2),
    (null, 'pasazerskie', 2),
    (null, 'wakacyjne', 3),
    (null, 'kultury', 3),
    (null, 'sztuki', 3),
    (null, 'nauki', 3);

insert into grupy_budowlane values
    (null, 'jednorodzinne', 1),
    (null, 'wielorodzinne', 1),
    (null, 'udekorowane', 2),
    (null, 'nieudekorowane', 2),
    (null, 'malarnej', 3),
    (null, 'digitalnej', 3);

insert into klasy_budowlane values
    (null, 'pawilon', 1, 1110),
    (null, 'willa', 1, 1112);

insert into wyszczegolnienia_budowlane values
    (null, 'abc', 1, 'WR', 'XVI'),
    (null, 'def', 2, 'FF', 'DOS'),
    (null, 'ghi', 3, 'DE', 'LOS'),
    (null, 'jkl', 4, 'DE', 'FAE');


insert into typy_budowy values
    (null, 'Budowa'),
    (null, 'Rozbudowa'),
    (null, 'Nadbudowa'),
    (null, 'Odbudowa'),
    (null, 'Wykonanie robót budowlanych'),
    (null, 'Remont'),
    (null, 'Zmiana sposobu użytkowania'),
    (null, 'Rozbiórka'),
    (null, 'Przebudowa');

insert into formy_budownictwa values
    (null, 'Indywidualna'),
    (null, 'Zakładowa'),
    (null, 'Sprzedaż / wynajem');

insert into planowania_przestrzenne values  
    (null, 'Dec WZ'),
    (null, 'MPZP');

insert into rejestry(
    id,
    typ,

    wniosek_numer,
    wniosek_data_zlozenia,
    wniosek_inwestor_id,
    wniosek_decyzja_typ,
    wniosek_decyzja_numer,
    wniosek_decyzja_data_wydania,
    wniosek_rozstrzygniecie_typ,
    wniosek_rozstrzygniecie_numer_pisma,
    wniosek_rozstrzygniecie_data_wydania,

    obiekt_wyszczegolnienie_id,
    obiekt_forma_budownictwa_id,
    obiekt_planowanie_przestrzenne_id,
    obiekt_ulica_id,
    obiekt_nr,
    obiekt_pnb_infrastruktura_towarzyszaca,
    obiekt_rozbiorka_objety_ochrona_konserwatorska
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
    1
);

insert into tablice_informacyjne values(null, 'testowa zawartosc');