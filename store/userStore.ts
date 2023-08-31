import {defineStore} from "pinia";
import {Ref, ref, UnwrapRef} from "vue";
import {reactive} from "@vue/reactivity";
import {IUser, IUserNFT} from "../types/types";
import requests from "../mixins/requests";
import {ImageNFT, ImageNFTStorage} from "../const/const";

export const userStore = defineStore('userStore', () => {
    const {getParamsNFT} = requests();
    let user: Ref<IUser> = ref({
        wallet: null,
        countNFTTotal: 0,
        countNFT: 0,
        isConnectWallet: false,
        rewardSecond: ''
    });
    let usersNFT: Ref<IUserNFT[]> = ref([]);
    const userBase = reactive({id: '', profitWeek: 0, profitMonth: 0, profitAll: 0});
    let isMainLoader = ref(true);

    function changeWallet(address: string): void {
        user.value.wallet = address;
    }

    function changeCountNFT(amount: number): void {
        user.value.countNFTTotal = amount
    }

    async function addUsersNFT(nft: { id: number, isStaked: boolean }): void {
        let NFT = nft;

        await getParamsNFT(nft.id).then((res) => {
            const NFTParams = res.data;
            NFT = {
            ...nft,
            ...NFTParams,
                image: ImageNFTStorage.nft === NFTParams.image ? ImageNFT.nft : ImageNFT.nft2
            }
        });
        // @ts-ignore
        usersNFT.value.push(NFT);


    }

    function cleanUsersNFT(): void {
        usersNFT.value = [];
    }

    function cleanUserStore(): void {
        user.value = {
            wallet: null,
            countNFT: 0,
            isConnectWallet: false,
            rewardSecond: user.value.rewardSecond
        }
        usersNFT.value = [];
    }

    return {
        user,
        changeWallet,
        changeCountNFT,
        userBase,
        usersNFT,
        addUsersNFT,
        cleanUsersNFT,
        cleanUserStore,
        isMainLoader
    }
})
