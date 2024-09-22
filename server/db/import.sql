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

    obiekt_zamierzenie_id integer not null,
    obiekt_forma_budownictwa_id integer not null,
    obiekt_planowanie_przestrzenne_id integer not null,
    obiekt_miejscowosc_id integer not null,
    obiekt_ulica_id integer not null,
    obiekt_nr text not null,

    foreign key(wniosek_inwestor_id) references inwestorzy(id),
    foreign key(wniosek_decyzja_typ_id) references typy_decyzji_starosty(id),
    foreign key(wniosek_rozstrzygniecie_typ_id) references typy_rozstrzygniec(id),

    foreign key(obiekt_zamierzenie_id) references zamierzenia_budowlane(id),
    foreign key(obiekt_forma_budownictwa_id) references formy_budownictwa(id),
    foreign key(obiekt_planowanie_przestrzenne_id) references planowania_przestrzenne(id),
    foreign key(obiekt_miejscowosc_id) references miejscowosci(id),
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

insert into inwestorzy values (null, '"ODEJEWSKI - ODAN" Sp.  Z o.o.', 'blah blah blah');
insert into inwestorzy values (null, '"ROLA" Sp. z o.o.', 'blah blah blah');
insert into inwestorzy values (null, '"SZCZEPAN" J. SZCZEPAŃSKI i Z. SZCZEPAŃSKI', 'blah blah blah');
insert into inwestorzy values (null, '„POLSTYR” Sp. z o. o.', 'blah blah blah');
insert into inwestorzy values (null, 'Adam Stec', 'blah blah blah');
insert into inwestorzy values (null, 'Agencja Mienia Wojskowego', 'blah blah blah');
insert into inwestorzy values (null, 'Agnieszka Chudy', 'blah blah blah');
insert into inwestorzy values (null, 'Anna Bartoś', 'blah blah blah');
insert into inwestorzy values (null, 'Anna Szymanek', 'blah blah blah');
insert into inwestorzy values (null, 'Burmistrz Czarnego', 'blah blah blah');
insert into inwestorzy values (null, 'Burmistrz Debrzna', 'blah blah blah');
insert into inwestorzy values (null, 'Burmistrz Miasta Człuchów', 'blah blah blah');
insert into inwestorzy values (null, 'Daniel Folehr', 'blah blah blah');
insert into inwestorzy values (null, 'Edyta Sobolewska', 'blah blah blah');
insert into inwestorzy values (null, 'Ewa Stroińska', 'blah blah blah');
insert into inwestorzy values (null, 'Ewa Zagórzańska', 'blah blah blah');
insert into inwestorzy values (null, 'GABI BIS JERCZYŃSKI ', 'blah blah blah');
insert into inwestorzy values (null, 'Generalna Dyrekcja Dróg Krajowych i Autostrad', 'blah blah blah');
insert into inwestorzy values (null, 'Gmina Czarne', 'blah blah blah');
insert into inwestorzy values (null, 'Gmina Człuchów', 'blah blah blah');
insert into inwestorzy values (null, 'Gmina Debrzno', 'blah blah blah');
insert into inwestorzy values (null, 'Gmina Miejska Człuchów', 'blah blah blah');
insert into inwestorzy values (null, 'Gmina Przechlewo', 'blah blah blah');
insert into inwestorzy values (null, 'Grzegorz Józefko', 'blah blah blah');
insert into inwestorzy values (null, 'Inwestycje Sp. z o . o.', 'blah blah blah');
insert into inwestorzy values (null, 'Józef Rzeszczyński', 'blah blah blah');
insert into inwestorzy values (null, 'Katarzyna Stec', 'blah blah blah');
insert into inwestorzy values (null, 'Krajowy Ośrodek Wsparcia Rolnictwa', 'blah blah blah');
insert into inwestorzy values (null, 'Krystyna Rzeszczyńska', 'blah blah blah');
insert into inwestorzy values (null, 'Marcin Bartoś', 'blah blah blah');
insert into inwestorzy values (null, 'Michał Dyl', 'blah blah blah');
insert into inwestorzy values (null, 'MKS Piast Człuchów', 'blah blah blah');
insert into inwestorzy values (null, 'Nadleśnictwo Czarnobór ', 'blah blah blah');
insert into inwestorzy values (null, 'Nadleśnictwo Człuchów', 'blah blah blah');
insert into inwestorzy values (null, 'NOVODOM Developer Sp. z o.o.', 'blah blah blah');
insert into inwestorzy values (null, 'Ośrodek Sportu i Rekreacji ', 'blah blah blah');
insert into inwestorzy values (null, 'Pan Grzegorz Wojas', 'blah blah blah');
insert into inwestorzy values (null, 'Pan Piotr Piotrowicz', 'blah blah blah');
insert into inwestorzy values (null, 'Państwowe Gospodarstwo Leśne Lasy Państwowe', 'blah blah blah');
insert into inwestorzy values (null, 'PINB w Człuchowie', 'blah blah blah');
insert into inwestorzy values (null, 'Piotr Staszków', 'blah blah blah');
insert into inwestorzy values (null, 'POLTAREX Polskie Drewno Sp. z o.o. ', 'blah blah blah');
insert into inwestorzy values (null, 'Powiat Człuchowski', 'blah blah blah');
insert into inwestorzy values (null, 'Przedsiębiorstwo Komunalne Spółka z o.o.', 'blah blah blah');
insert into inwestorzy values (null, 'PVE 19 Sp. z o.o.', 'blah blah blah');
insert into inwestorzy values (null, 'Regionalny Zarząd Gospodarki Wodnej', 'blah blah blah');
insert into inwestorzy values (null, 'Rodzinny Ogród Działkowy "NASZ OGRÓD"', 'blah blah blah');
insert into inwestorzy values (null, 'Starostwo Powiatowe w Człuchowie', 'blah blah blah');
insert into inwestorzy values (null, 'Stowarzyszenie Solidarni "PLUS"', 'blah blah blah');
insert into inwestorzy values (null, 'Szymon Szultka', 'blah blah blah');
insert into inwestorzy values (null, 'Władysław Stec', 'blah blah blah');
insert into inwestorzy values (null, 'Wojewódzki Konserwator Zabytków', 'blah blah blah');
insert into inwestorzy values (null, 'Wojewódzki Urząd Ochrony Zabytków w Gdańsku', 'blah blah blah');
insert into inwestorzy values (null, 'Wójt gminy Przechlewo', 'blah blah blah');
insert into inwestorzy values (null, 'Zakład Karny w Czarnem', 'blah blah blah');
insert into inwestorzy values (null, 'Zarząd Powiatu Człuchowskiego', 'blah blah blah');

insert into gminy values (null, 'Bukowo');
insert into gminy values (null, 'Człuchów');
insert into gminy values (null, 'Płonica');
insert into gminy values (null, 'Polnica');
insert into gminy values (null, 'Wierzchowo');
insert into gminy values (null, 'Wejherowo');
insert into gminy values (null, 'Gdańsk');
insert into gminy values (null, 'Pomerania');
insert into gminy values (null, 'Gdynia');
insert into gminy values (null, 'Bydgoszcz');
insert into gminy values (null, 'Radom');
insert into gminy values (null, 'Warszawa');

insert into miejscowosci values (null, 'Niggerowo', 0, 0, '1234');
insert into miejscowosci values (null, 'Murzynowo', 0, 0, '1231114');
insert into miejscowosci values (null, 'Wejcherowo', 0, 0, '132334');
insert into miejscowosci values (null, 'Bukowo', 0, 0, '13423344');
insert into miejscowosci values (null, 'Dzuma', 0, 0, '3412334434');
insert into miejscowosci values (null, 'Las', 0, 0, '1234433');
insert into miejscowosci values (null, 'xd', 0, 0, '1230');

insert into ulice values (null, 'Jana Pawla', 1);
insert into ulice values (null, 'Jana Pawla II', 2);
insert into ulice values (null, 'Zygmunta', 2);
insert into ulice values (null, 'Tadeusza', 4);

insert into typy_decyzji_starosty values (null, 'Pozytywna');
insert into typy_decyzji_starosty values (null, 'Sprzeciwu');
insert into typy_decyzji_starosty values (null, 'Umarzająca');
insert into typy_decyzji_starosty values (null, 'Inne rozstrzygnięcie');

insert into typy_rozstrzygniec values (null, 'Wygaśnięcia');
insert into typy_rozstrzygniec values (null, 'Bez rozpatrzenia');
insert into typy_rozstrzygniec values (null, 'Uchylająca');
insert into typy_rozstrzygniec values (null, 'Utrzymana w mocy');

insert into typy_czynnosci_admin values (null, 'Wezwanie');
insert into typy_czynnosci_admin values (null, 'Zawiadomienie');
insert into typy_czynnosci_admin values (null, 'Postanowienie');
insert into typy_czynnosci_admin values (null, 'Konserwator');
insert into typy_czynnosci_admin values (null, 'Zawieszenie postępowania');
insert into typy_czynnosci_admin values (null, 'Przedłużenie terminu');

insert into typy_rejestrow values (null, 'PnB (6740)');
insert into typy_rejestrow values (null, 'O Rozbiórkę (6741)');
insert into typy_rejestrow values (null, 'Zgłoszenie Rozbiórki (6743.1)');
insert into typy_rejestrow values (null, 'Zgłoszenie „zwykłe” (6743.2)');
insert into typy_rejestrow values (null, 'Zgłoszenie ZSU (6743.3)');
insert into typy_rejestrow values (null, 'Zgłoszenie BiP (6743.4)');
insert into typy_rejestrow values (null, 'Zaświadczenie (705)');
insert into typy_rejestrow values (null, 'Sprawy Różne (670)');
insert into typy_rejestrow values (null, 'ZRiD (7012)');
insert into typy_rejestrow values (null, 'Rejestr do Budowy');