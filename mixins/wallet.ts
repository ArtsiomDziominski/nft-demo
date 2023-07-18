import {userStore} from "~/store/userStore";
import {Web3} from "web3";
import {ABI, ADDRESS} from "../const/mint";
import {chain} from "../config";

export default function wallet() {
    const store = userStore();
    const {user} = store;

    const timeGetNFT: number = 0;

    async function connectMetamask() {
        let someError: boolean = false;
        const walletEthereum = await (window as any).ethereum;
        // const metamask = await walletEthereum.request({method: 'eth_requestAccounts'})
        const metamask = await walletEthereum.request({
            method: 'wallet_requestPermissions',
            "params": [{"eth_accounts": {}}]
        })
            .catch(() => {
                someError = true;
            })

        if (someError) return;
        user.wallet = metamask[0].caveats[0].value[0];
        sessionStorage.setItem("address", user.wallet ? user.wallet : '');
        if (getChainId() !== chain.chainId) {
            await switchNetwork();
        }

        // await getUserNFT();
        // return metamask[0];
    }

    async function getAddressWallet() {
        const ethereum = (window as any).ethereum;
        const web3 = new Web3(ethereum);
        const accounts = await web3.eth.getAccounts();
        user.wallet = accounts.length ? accounts[0] : null;
        return user.wallet;
    }

    function getChainId() {
        const ethereum = (window as any).ethereum;
        const web3 = new Web3(ethereum);
        const currentProvider = web3.currentProvider
        // @ts-ignore
        return currentProvider?.chainId;
    }

    const switchNetwork = async () => {
        const ethereum = (window as any).ethereum;
        const web3 = new Web3(ethereum);
        try {
            // @ts-ignore
            await web3.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{chainId: chain.chainId}],
            });
        } catch (error) {
            // @ts-ignore
            if (error.code === 4902) {
                try {
                    // @ts-ignore
                    await web3.currentProvider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: chain.chainId,
                                chainName: chain.chainName,
                                rpcUrls: chain.rpcUrls,
                                nativeCurrency: {
                                    name: chain.nativeCurrency.name,
                                    symbol: chain.nativeCurrency.symbol,
                                    decimals: chain.nativeCurrency.decimals,
                                },
                                blockExplorerUrls: chain.blockExplorerUrls,
                            },
                        ],
                    });
                } catch (error) {
                    // @ts-ignore
                    console.log(error.message);
                }
            }
        }
    };

    async function checkConnect() {
        const wallet = (await (window as any).ethereum.request({method: 'eth_requestAccounts'}))[0];
        user.isConnectWallet = wallet ?? false;
        return user.isConnectWallet;
    }

    async function getUserNFT(): Promise<number> {
        const ethereum = (window as any).ethereum;
        const web3 = new Web3(ethereum);
        const tokenInst = new web3.eth.Contract(ABI, ADDRESS);
        const walletAddress = await getAddressWallet();
        // @ts-ignore
        user.countNFT = Number(await tokenInst.methods.balanceOf(walletAddress).call());
        return Number(user.countNFT);
    }

    return {connectMetamask, getUserNFT, checkConnect}
}
