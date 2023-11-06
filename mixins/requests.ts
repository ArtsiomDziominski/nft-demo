import axios from "axios";

export default function requests() {
    const getLinkNFT = (idNFT: number) => {
      return `https://bafybeihb43fh7ijwnjrfwxpjgbe5jc2uubbuk7bz5wb4jqrhkcml5zfdbi.ipfs.nftstorage.link/${idNFT}.json`
    }
    const getParamsNFT = (id: number) => {
        const nftURL = getLinkNFT(id);
        return axios.get(nftURL);

    }

    return {
        getParamsNFT
    }
}