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
create table zamierzenia_budowlane(
    id integer primary key autoincrement,
    zamierzenie text not null unique,
    pkob integer not null unique,
    klasa_zl text not null, /* klasa zagrozenia ludzi */
    kat_ob text not null, /* kat. obiektu budowy */
    dzial_id integer not null,
    foreign key(dzial_id) references dzialy_budowlane(id)
);
create table klasy_budowlane(
    id integer primary key autoincrement,
    klasa text not null unique,
    zamierzenie_id integer not null,
    foreign key(zamierzenie_id) references zamierzenia_budowlane(id)
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

create table typy_decyzji_starosty(
    id integer primary key autoincrement,
    typ text not null unique
);
create table typy_rozstrzygniec(
    id integer primary key autoincrement,
    typ text not null unique
);
create table typy_czynnosci_admin(
    id integer primary key autoincrement,
    typ text not null unique
);
create table typy_rejestrow(
    id integer primary key autoincrement,
    typ text not null unique
);

-- 
-- Rejestry
-- 

create table rejestry(
    id integer primary key autoincrement,
    typ_id integer not null,

    wniosek_numer integer not null unique,
    wniosek_data_zlozenia date not null,
    wniosek_inwestor_id integer not null,
    wniosek_decyzja_typ_id integer not null,
    wniosek_decyzja_numer integer not null,
    wniosek_decyzja_data_wydania date not null,
    wniosek_rozstrzygniecie_typ_id integer not null,
    wniosek_rozstrzygniecie_numer_pisma integer not null,
    wniosek_rozstrzygniecie_data_wydania date not null,

    obiekt_klasa_id integer not null,
    obiekt_forma_budownictwa_id integer not null,
    obiekt_planowanie_przestrzenne_id integer not null,
    obiekt_ulica_id integer not null,
    obiekt_nr text not null,

    foreign key(wniosek_inwestor_id) references inwestorzy(id),
    foreign key(wniosek_decyzja_typ_id) references typy_decyzji_starosty(id),
    foreign key(wniosek_rozstrzygniecie_typ_id) references typy_rozstrzygniec(id),

    foreign key(obiekt_klasa_id) references klasy_budowlane(id),
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
    (null, 'Niggerowo', 0, 0, '1234'),
    (null, 'Murzynowo', 0, 0, '1231114'),
    (null, 'Wejcherowo', 0, 0, '132334'),
    (null, 'Bukowo', 0, 0, '13423344'),
    (null, 'Dzuma', 0, 0, '3412334434'),
    (null, 'Las', 0, 0, '1234433'),
    (null, 'xd', 0, 0, '1230');
    
insert into ulice values
    (null, 'Jana Pawla', 1),
    (null, 'Jana Pawla II', 2),
    (null, 'Zygmunta', 2),
    (null, 'Tadeusza', 4);

insert into typy_decyzji_starosty values
    (null, 'Sprzeciwu'),
    (null, 'Pozytywna'),
    (null, 'Umarzająca'),
    (null, 'Inne rozstrzygnięcie');

insert into typy_rozstrzygniec values
    (null, 'Wygaśnięcia'),
    (null, 'Bez rozpatrzenia'),
    (null, 'Uchylająca'),
    (null, 'Utrzymana w mocy');

insert into typy_czynnosci_admin values
    (null, 'Wezwanie'),
    (null, 'Zawiadomienie'),
    (null, 'Postanowienie'),
    (null, 'Konserwator'),
    (null, 'Zawieszenie postępowania'),
    (null, 'Przedłużenie terminu');

insert into typy_rejestrow values 
    (null, 'PnB (6740)'),
    (null, 'O Rozbiórkę (6741)'),
    (null, 'Zgłoszenie Rozbiórki (6743.1)'),
    (null, 'Zgłoszenie „zwykłe” (6743.2)'),
    (null, 'Zgłoszenie ZSU (6743.3)'),
    (null, 'Zgłoszenie BiP (6743.4)'),
    (null, 'Zaświadczenie (705)'),
    (null, 'Sprawy Różne (670)'),
    (null, 'ZRiD (7012)'),
    (null, 'Rejestr do Budowy');

insert into sekcje_budowlane values
    (null, 'Budynki'),
    (null, 'Statki'),
    (null, 'Pałace');

insert into dzialy_budowlane values
    (null, 'mieszkalne', 0),
    (null, 'niemieszkalne', 0),
    (null, 'kosmiczne', 1),
    (null, 'pasazerskie', 1),
    (null, 'wakacyjne', 1),
    (null, 'kultury', 2),
    (null, 'sztuki', 2),
    (null, 'nauki', 2);

insert into zamierzenia_budowlane values
    (null, 'jednorodzinne', 1110, 'WR', 'XVI', 0),
    (null, 'wielorodzinne', 1112, 'FF', 'DOS', 0),
    (null, 'udekorowane', 4554, 'DE', 'LOS', 1),
    (null, 'nieudekorowane', 4551, 'DE', 'LOS', 1),
    (null, 'malarnej', 1337, 'DAE', 'TROS', 6),
    (null, 'digitalnej', 420, 'FAE', 'DES', 6);

insert into klasy_budowlane values
    (null, 'pawilon', 0),
    (null, 'willa', 0);

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
    typ_id,

    wniosek_numer,
    wniosek_data_zlozenia,
    wniosek_inwestor_id,
    wniosek_decyzja_typ_id,
    wniosek_decyzja_numer,
    wniosek_decyzja_data_wydania,
    wniosek_rozstrzygniecie_typ_id,
    wniosek_rozstrzygniecie_numer_pisma,
    wniosek_rozstrzygniecie_data_wydania,

    obiekt_klasa_id,
    obiekt_forma_budownictwa_id,
    obiekt_planowanie_przestrzenne_id,
    obiekt_ulica_id,
    obiekt_nr
) values (
    null,
    0,

    69,
    '2006-12-19',
    0,
    0, 420, '2019-02-05',
    0, 2137, '2011-07-23',

    0,
    0,
    0,
    0,
    34
);