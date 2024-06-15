import { updateMetadataFiles, uploadFolderToIPFS } from "./metadata";
import * as dotenv from "dotenv";

import { openWallet } from "./utils";
import { readdir } from "fs/promises";
import { NftCollection } from "./NftCollection";
import { waitSeqno } from './delay'
import { NftItem } from './NftItem'
import { toNano, Address, TonClient } from '@ton/ton'

export class mintNFTs {
    public async mintNormalCat(address: Address) {
        const client = new TonClient({
            endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
            apiKey: process.env.TONCENTER_API_KEY,
          });
        const getMethodResult = await client.runMethod(process.env.CATCOLLECTIONADDRESS, 'get_collection_data');
        let nextItemIndex = getMethodResult.stack.readNumber();

        const wallet = await openWallet(process.env.MNEMONIC!.split(" "), true);
        console.log("Start deploy of nft collection...");
        const collectionData = {
        ownerAddress: wallet.contract.address,
        royaltyPercent: 0, // 0.05 = 5%
        royaltyAddress: wallet.contract.address,
        nextItemIndex: 0,
        collectionContentUrl: process.env.CATIPFS + `collection.json`,
        commonContentUrl: process.env.CATIPFS,
        };
        const collection = new NftCollection(collectionData);

        let index = nextItemIndex;
        console.log(`Start deploy of ${index} NFT`);
        const mintParams = {
            queryId: 0,
            itemOwnerAddress: Address.parse(process.env.CATADDRESS),
            itemIndex: index,
            amount: toNano("0.05"),
            commonContentUrl: 'default.json',
        };
    
        const nftItem = new NftItem(collection);
        let seqno = await nftItem.deploy(wallet, mintParams);
        console.log(`Successfully deployed number ${index} NFT`);
        await waitSeqno(seqno, wallet);
    }

    
    public async mintNormalDog(address: Address) {
        const client = new TonClient({
            endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
            apiKey: process.env.TONCENTER_API_KEY,
          });
        const getMethodResult = await client.runMethod(process.env.CATCOLLECTIONADDRESS, 'get_collection_data');
        let nextItemIndex = getMethodResult.stack.readNumber();

        const wallet = await openWallet(process.env.MNEMONIC!.split(" "), true);
        console.log("Start deploy of nft collection...");
        const collectionData = {
        ownerAddress: wallet.contract.address,
        royaltyPercent: 0, // 0.05 = 5%
        royaltyAddress: wallet.contract.address,
        nextItemIndex: 0,
        collectionContentUrl: process.env.DOGIPFS + `collection.json`,
        commonContentUrl: process.env.DOGIPFS,
        };
        const collection = new NftCollection(collectionData);

        let index = nextItemIndex;
        console.log(`Start deploy of ${index} NFT`);
        const mintParams = {
            queryId: 0,
            itemOwnerAddress: Address.parse(process.env.DOGADDRESS),
            itemIndex: index,
            amount: toNano("0.05"),
            commonContentUrl: 'default.json',
        };
    
        const nftItem = new NftItem(collection);
        let seqno = await nftItem.deploy(wallet, mintParams);
        console.log(`Successfully deployed number ${index} NFT`);
        await waitSeqno(seqno, wallet);
    }

    
    public async mintSpecialCat(address: Address) {
        const client = new TonClient({
            endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
            apiKey: process.env.TONCENTER_API_KEY,
          });
        const getMethodResult = await client.runMethod(process.env.CATCOLLECTIONADDRESS, 'get_collection_data');
        let nextItemIndex = getMethodResult.stack.readNumber();

        const wallet = await openWallet(process.env.MNEMONIC!.split(" "), true);
        console.log("Start deploy of nft collection...");
        const collectionData = {
        ownerAddress: wallet.contract.address,
        royaltyPercent: 0, // 0.05 = 5%
        royaltyAddress: wallet.contract.address,
        nextItemIndex: 0,
        collectionContentUrl: process.env.SCATIPFS + `collection.json`,
        commonContentUrl: process.env.SCATIPFS,
        };
        const collection = new NftCollection(collectionData);

        let index = nextItemIndex;
        console.log(`Start deploy of ${index} NFT`);
        const mintParams = {
            queryId: 0,
            itemOwnerAddress: Address.parse(process.env.SCATADDRESS),
            itemIndex: index,
            amount: toNano("0.05"),
            commonContentUrl: 'default.json',
        };
    
        const nftItem = new NftItem(collection);
        let seqno = await nftItem.deploy(wallet, mintParams);
        console.log(`Successfully deployed number ${index} NFT`);
        await waitSeqno(seqno, wallet);
    }
}