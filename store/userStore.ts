import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {reactive} from "@vue/reactivity";
import {IUser, IUserNFT} from "../types/types";
import requests from "../mixins/requests";
import {SnackbarColor} from "../const/const";

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
    let loaderGetNft = ref(false);
    const snackbar = ref({is: false, text: '', color: SnackbarColor.Success});

    function changeWallet(address: string): void {
        user.value.wallet = address;
    }

    function changeCountNFT(amount: number): void {
        user.value.countNFTTotal = amount;
    }

    async function addUsersNFT(nft): Promise<void> {
        usersNFT.value.push(nft);
        usersNFT.value.sort((a, b) => a.id + b.id);
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
        cleanUsersNFT,
        cleanUserStore,
        isMainLoader,
        loaderGetNft,
        addUsersNFT,
        snackbar
    }
})
