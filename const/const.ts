import {BURL} from "../config";

export const CONNECT_WALLET: string = 'Connect Wallet';

export const NAME: string = 'Truck #';

export const REQUEST_BASE = {
    users: BURL + '/users/',
    usersPost: BURL + '/users',
    dateRewards: BURL + '/daterewards',
    registrationRewards: BURL + '/registrationrewards'
}


export enum ImageNFTStorage {
    nft = 'ipfs://bafybeiecreihqxsd6tur7cjcbmb6kixwalxyq6ncfqexjctwf3bangk4he/1.png',
    nft2 = 'ipfs://bafybeiecreihqxsd6tur7cjcbmb6kixwalxyq6ncfqexjctwf3bangk4he/2.png'
}

export enum ImageNFT {
    nft = 'nft.webp',
    nft2 = 'nft-2.webp'
}

export enum ImageNFTProd {
    nft = 'nft.f71c0619.webp',
    nft2 = 'nft-2.a404d47f.webp'
}

export enum SnackbarColor {
    Error = 'red',
    Success = ''
}