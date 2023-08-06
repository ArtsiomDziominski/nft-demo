import {userStore} from "~/store/userStore";
import {Web3} from "web3";
import {ABI, ADDRESS} from "~/const/mint";
import {ref, Ref, onMounted} from "vue";

export default function requestsNFT() {
  const store = userStore();
  const {user, changeWallet, changeCountNFT, addUsersNFT, cleanUsersNFT} = store;
  let contract: any = null;
  let web3: any = null;
  let ethereum: any = null;
  let totalSupply: Ref<number | null> = ref(null);

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

  function getContract() {
    web3 = new Web3(ethereum);
    return new web3.eth.Contract(ABI, ADDRESS);
  }

  async function getUserNFT(): Promise<number> {
    cleanUsersNFT();
    contract = getContract()
    const walletAddress = await getAddressWallet();
    changeCountNFT(Number(await contract.methods.balanceOf(walletAddress).call()))
    await getTotalSupply()
    await getNftList();
    await getNftListStake()
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

  async function getTotalSupply(): Promise<void> {
    await contract.methods.totalNFT().call()
      .then((total: any) => {
        totalSupply.value = Number(total);
      });
  }

  async function getNftList(): Promise<void> {
    for (let i = 1; i <= totalSupply.value!; i++) {
      await contract.methods.ownerOf(String(i)).call()
        .then((ownerAddress: string) => {
          if (ownerAddress.toLowerCase() === user.wallet!.toLowerCase()) addUsersNFT({id: i, isStaked: false})
        })
    }
  }

  async function getNftListStake(): Promise<void> {
    for (let i = 1; i <= totalSupply.value!; i++) {
      await contract.methods.nftOwnerStake(String(i)).call()
        .then((ownerAddressStake: string) => {
          if (ownerAddressStake.toLowerCase() === user.wallet!.toLowerCase()) addUsersNFT({id: i, isStaked: true})
        });
    }
  }

  async function stake(idNft: number): Promise<void> {
    await contract.methods.stake(idNft).send({from: user.wallet})
      .then(async (total: any) => {
        getUserNFT()
      });
  }

  async function unStake(idNft: number): Promise<void> {
    await contract.methods.unstake(idNft).send({from: user.wallet})
      .then(async (total: any) => {
        getUserNFT()
      });
  }

  async function claimRewards(id: number) {
    await contract.methods.claimRewards(id).send({from: user.wallet})
      .then((response: any) => console.log(response))
  }

  return {getUserNFT, stake, unStake, claimRewards}

}
