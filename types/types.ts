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

export interface IUserNFT {
    id: number;
    isStaked: boolean;
    rewards: number
}

export interface INFTParamsAttributes {
    trait_type: string;
    value: string;
}

export interface INFTParams {
    name: string;
    description: string;
    image: string;
    attributes: INFTParamsAttributes[];
}

export interface IUser {
    wallet: string | null;
    countNFT: number;
    isConnectWallet: boolean;
    rewardSecond: string;
}