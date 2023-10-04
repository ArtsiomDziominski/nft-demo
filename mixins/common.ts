import {userStore} from "../store/userStore";
import {storeToRefs} from "pinia";
import {SnackbarColor} from "../const/const";

export default function common() {
    const store = userStore();
    const {snackbar} = storeToRefs(store);

    function setSnackbar(text: string, val: boolean = true, color: SnackbarColor = SnackbarColor.Success) {
        snackbar.value = {is: val, text, color};
        setTimeout(() => snackbar.value.is = false, 3000);
    }

    return {
        setSnackbar
    }
}