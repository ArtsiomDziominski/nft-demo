import axios from "axios";

export default function requests() {
    const getLinkNFT = (idNFT: number) => {
      return `https://bafybeiczazqgh55rsxbl2povopejkdunjhnfft4g6eq2tcrjaamcizv5bq.ipfs.nftstorage.link/${idNFT}.json`
    }
    const getParamsNFT = (id: number) => {
        const nftURL = getLinkNFT(id);
        return axios.get(nftURL);

    }

    return {
        getParamsNFT
    }
}