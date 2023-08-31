import {userStore} from "~/store/userStore";
import {Web3} from "web3";
import {ABI, ADDRESS} from "~/const/mint";
import {ref, Ref, onMounted, UnwrapRef} from "vue";

export default function requestsNFT() {
    const store = userStore();
    const {user, changeWallet, changeCountNFT, addUsersNFT, cleanUsersNFT, usersNFT} = store;
    let contract: any = null;
    let web3: any = null;
    let ethereum: any = null;
    let totalNFT: Ref<number | null> = ref(null);

    let loaderStake: Ref<UnwrapRef<boolean>> = ref(false);
    let loaderUnstake: Ref<UnwrapRef<boolean>> = ref(false);

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
        cleanUsersNFT();
        contract = await getContract();
        const walletAddress = await getAddressWallet();
        changeCountNFT(Number(await contract.methods.balanceOf(walletAddress).call()))
        await getTotalNFT()
        getNftList();
        getNftListStake()
        return Number(user.countNFT);
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
        for (let i = 1; i <= totalNFT.value!; i++) {
            await contract.methods.ownerOf(String(i)).call()
                .then((ownerAddress: string) => {
                    if (ownerAddress.toLowerCase() === user.wallet!.toLowerCase()) addUsersNFT({id: i, isStaked: false})
                })
        }
    }

    async function getNftListStake(): Promise<void> {
        for (let i = 1; i <= totalNFT.value!; i++) {
            await contract.methods.nftOwnerStake(String(i)).call()
                .then((ownerAddressStake: string) => {
                    if (ownerAddressStake.toLowerCase() === user.wallet!.toLowerCase()) addUsersNFT({
                        id: i,
                        isStaked: true
                    })
                });
        }
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
