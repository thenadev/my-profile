import AmselLogo from "../assets/amsel_logo.jpg";
import MyDexLogo from "../assets/mydex.png";

export const projects = [
    {
        id: 1,
        image: AmselLogo,
        description: 'A hybrid Webapp for searching/buying farmer and vending machine products.',
        technologies: 'Flutter, Firebase',
        livePreviewLink: 'https://amsel-ths.web.app/#/',
    },
    {
        id: 2,
        image: MyDexLogo,
        description: 'A full decentralized Exchange deployed on the Sepolia Testnet, including the solidity smart contracts.',
        technologies: 'React, Solidity, Hardhat, Foundry',
        githubLink: 'https://github.com/tjoooobooo/web3-academy',
        livePreviewLink: 'https://my-o2wznex4e-tjoooobooo.vercel.app/',
    }
];
