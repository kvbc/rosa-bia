//
// Inwestorzy
//

export type Inwestor = {
    id: number;
    nazwa: string;
    adres: string;
};

export type GetInwestorzyZadanie = {
    startIndex: number;
    endIndex: number;
};

export type GetInwestorzyOdpowiedz = {
    liczba: number;
    inwestorzy: Inwestor[];
};
