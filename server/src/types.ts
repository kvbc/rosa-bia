export enum WSSBCMessageType {
    InvestorAdded,
    InvestorUpdated,
    InvestorDeleted,
}
export type WSSBCMessage = {
    type: WSSBCMessageType;
};

//
// Inwestorzy
//

export type Inwestor = {
    id: number;
    nazwa: string;
    adres: string;
};

export type InwestorResponseGet = {
    liczba: number;
    inwestorzy: Inwestor[];
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
