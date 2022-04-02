import React from "react";
import {useState} from 'react'; 
//package allow connect blockhain very easy make life easier
import {ethers, BigNumber} from 'ethers';
import evmStudyNFT from './EVMStudyNFT.json'


const evmStudyNFTAddress = '0xf65E85818553508F97D6E7Da0Cc36335C453b632'

const MainMint = ( { accounts, setAccounts}) => {
    //number of user mints
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            //initial setup 
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            //some sign transaction
            const signer = provider.getSigner()
            const contract =  new ethers.Contract(
                //from nft json file
                evmStudyNFTAddress,
                evmStudyNFT.abi,
                signer
            );
            try {
                //run mint public function in EVMStudyNFT.sol
                //solidity require bignumber instead regular js number
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response: ', response)
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return; 
        setMintAmount(mintAmount - 1);
    }

    //variable maxPerWallet in EVMStudyNFT.sol
    const handleIncrement = () => {
        if (mintAmount >= 3) return; 
        setMintAmount(mintAmount + 1);
    }

    return (
        <div>
            <h1>EVMStudy</h1>
            <p>Это самое желаемое NFT в 2025 году</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type='number' value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Заминтить!</button>
                </div>
            ) : (
                <p>Вы не подключили metamask!</p>
            )}
        </div>
    );
};

export default MainMint;