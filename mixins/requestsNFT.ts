import {userStore} from "~/store/userStore";
import {Web3} from "web3";
import {ABI, ADDRESS} from "~/const/mint";
import {ref, Ref, onMounted, UnwrapRef} from "vue";
import requests from "./requests";
import {ImageNFT, ImageNFTStorage} from "../const/const";
import {storeToRefs} from "pinia";

export default function requestsNFT() {
    const store = userStore();
    let {
        user,
        changeWallet,
        changeCountNFT,
        cleanUsersNFT,
        usersNFT,
        addUsersNFT
    } = store;
    let {loaderGetNft} = storeToRefs(store);
    const {getParamsNFT} = requests();
    let contract: any = null;
    let web3: any = null;
    let ethereum: any = null;
    let totalNFT: Ref<number | null> = ref(null);

    let loaderStake: Ref<UnwrapRef<boolean>> = ref(false);
    let loaderUnstake: Ref<UnwrapRef<boolean>> = ref(false);
    const nftIdList = ref([]);
    const nftIdListStaked = ref([]);

    onMounted(async () => {
        // @ts-ignore
        if (process.client) {
            ethereum = (window as any).ethereum;
            web3 = (window as any).web3;
        }
        if (web3) {
            contract = await getContract();
        }
    })

    async function setWeb3() {
        // @ts-ignore
        if (process.client) {
            ethereum = (window as any).ethereum;
            web3 = (window as any).web3;
        }
    }

    async function setContract() {
        if (web3) {
            contract = await getContract();
        }
    }

    function getContract() {
        web3 = new Web3(ethereum);
        return new web3.eth.Contract(ABI, ADDRESS);
    }

    async function getUserNFT(): Promise<number> {
        try {
            cleanUsersNFT();
            contract = await getContract();
            const walletAddress = await getAddressWallet();
            changeCountNFT(Number(await contract.methods.balanceOf(walletAddress).call()))
            await getTotalNFT();
            await rewardSecond();
            await setNftUser();
        } catch (_) {}
        return Number(user.countNFT);
    }

    async function setNftUser() {
        loaderGetNft.value = true;
        await getNftList();
        await getNftListStake();

        nftIdList.value.forEach((nft: any) => {
            getParamsNFT(Number(nft)).then((res) => {
                const NFTParams = res.data;
                const NFT = {
                    id: Number(nft),
                    isStaked: false,
                    ...NFTParams,
                    image: ImageNFTStorage.nft === NFTParams.image ? ImageNFT.nft : ImageNFT.nft2
                }
                addUsersNFT(NFT);
            });
        })

        nftIdListStaked.value.forEach((nft: any) => {
            getParamsNFT(Number(nft)).then((res) => {
                const NFTParams = res.data;
                const NFT = {
                    id: Number(nft),
                    isStaked: true,
                    ...NFTParams,
                    image: ImageNFTStorage.nft === NFTParams.image ? ImageNFT.nft : ImageNFT.nft2
                }
                addUsersNFT(NFT);
            });
        })
        loaderGetNft.value = false;
    }

    async function getAddressWallet() {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length) {
            changeWallet(accounts[0])
        }
        // user.wallet = accounts.length ? accounts[0] : null;
        return user.wallet;
    }

    async function getTotalNFT(): Promise<void> {
        await contract.methods.totalNFT().call()
            .then((total: any) => {
                totalNFT.value = Number(total);
            });
    }

    async function getNftList(): Promise<void> {
        const walletAddress = await getAddressWallet();
        nftIdList.value = await contract.methods.walletOfOwner(walletAddress).call();
    }

    async function getNftListStake(): Promise<void> {
        const walletAddress = await getAddressWallet();
        nftIdListStaked.value = await contract.methods.walletOfOwnerStake(walletAddress).call();
    }

    async function stake(idNft: number): Promise<void> {
        loaderStake.value = true;
        await contract.methods.stake(idNft).send({from: user.wallet})
            .then(async (total: any) => {
                usersNFT.forEach((nft) => {
                    if (nft.id === idNft) {
                        nft.isStaked = !nft.isStaked
                    }
                });
                loaderStake.value = false;
            }).catch(() => loaderStake.value = false)
    }

    async function unStake(idNft: number): Promise<void> {
        loaderUnstake.value = true;
        await contract.methods.unstake(idNft).send({from: user.wallet})
            .then(async (total: any) => {
                usersNFT.forEach((nft) => {
                    if (nft.id === idNft) {
                        nft.isStaked = !nft.isStaked
                    }
                });
                loaderUnstake.value = false;
            }).catch(() => loaderUnstake.value = false);
    }

    function claimRewards(id: number) {
        return contract.methods.claimRewards(id).send({from: user.wallet});

    }

    async function rewardSecond() {
        let reward = 0;
        contract = await getContract();
        await contract.methods
            .rewardSecond()
            .call()
            .then((response: any) => {
                reward = Number(response);
                user.rewardSecond = web3.utils.fromWei(reward, 'ether');
            });
        return web3.utils.fromWei(reward, 'ether');
    }

    async function getRewards(id: number) {
        let rewards = 0;
        await contract.methods
            .checkRewards(String(id))
            .call()
            .then((response: any) => {
                rewards = response
            })
            .catch((e) => console.log(e));

        return web3.utils.fromWei(rewards, 'ether');
    }



    return {
        getUserNFT,
        stake,
        unStake,
        claimRewards,
        rewardSecond,
        getRewards,
        setContract,
        setWeb3,
        loaderStake,
        loaderUnstake
    }

}
