export interface ITokenBalance {
    status: string;
    message: string;
    result: string;
}

export interface IHistory {
    date: string;
    profit: number;
    currency?: string;
}

export interface IProfit {
    profitWeek: number;
    profitMonth: number;
    profitAll: number;
}


export interface IUserBase {
    id: number;
    address: string;
    profits: IProfit;
    histories: IHistory[];
    registered: boolean;
}