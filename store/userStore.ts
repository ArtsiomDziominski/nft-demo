import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {reactive} from "@vue/reactivity";

export const userStore = defineStore('userStore', () => {
    const user: Ref<{ wallet: string | null, countNFT: number | null, isConnectWallet: boolean }> = ref({
        wallet: '',
        countNFT: null,
        isConnectWallet: false
    });
    const userBase = reactive({id: '', profitWeek: 0, profitMonth: 0, profitAll: 0})
    return {user, userBase}
})