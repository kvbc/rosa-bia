export enum WSSBCMessageType {
    InvestorAdded,
    InvestorUpdated,
    InvestorDeleted,
}
export type WSSBCMessage = {
    type: WSSBCMessageType;
};

export type HTTPFetchResponse<T> = {
    liczba: number;
    results: T[];
};

//
// Inwestorzy
//

export type Inwestor = {
    id: number;
    nazwa: string;
    adres: string;
};

export type InwestorRequestPost = Inwestor;
export type InwestorRequestPut = Inwestor;

export type WSSBCMessageInvestor = WSSBCMessage & {
    type:
        | WSSBCMessageType.InvestorAdded
        | WSSBCMessageType.InvestorDeleted
        | WSSBCMessageType.InvestorUpdated;
    investor: Inwestor;
};

//
// Geodesy
//

export type Commune = {
    id: number;
    name: string;
};

export type CommuneRequestPost = Commune;
export type CommuneRequestPut = Commune;
