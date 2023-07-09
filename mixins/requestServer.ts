import {userStore} from "~/store/userStore";
import axios from "axios";
import {REQUEST_BASE} from "../const/const";

const config = {
    headers:{
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
        'Content-Type': 'application/json'
    }
};

export default function wallet() {
    const store = userStore();
    const {user} = store;

    async function requestDateRewards(): Promise<number> {
        return axios.get(REQUEST_BASE.dateRewards, config);
    }

    async function requestUser(address: string): Promise<number> {
        return axios.get(REQUEST_BASE.users + address, config);
    }



    return {requestDateRewards, requestUser}
}