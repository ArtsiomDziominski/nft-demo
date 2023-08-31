import {defineStore} from "pinia";
import {Ref, ref, UnwrapRef} from "vue";
import {reactive} from "@vue/reactivity";
import {IUser, IUserNFT} from "../types/types";

export const userStore = defineStore('userStore', () => {
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

    function addUsersNFT(nft: { id: number, isStaked: boolean }): void {
        // @ts-ignore
        usersNFT.value.push(nft)
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
