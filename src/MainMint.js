import React from "react";
import {useState} from 'react'; 
//package allow connect blockhain very easy make life easier
import {ethers, BigNumber} from 'ethers';
import evmStudyNFT from './EVMStudyNFT.json'
import { Box, Button, Flex, Link, Spacer, Input, Text} from '@chakra-ui/react';
 

const evmStudyNFTAddress = ' 0x78623138412DD9a6b2b35051BAA769F5D9d10baB'

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
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    //need to pass correct mintPrice
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
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
        <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
            <Box width='520px'>
                <div>
                    <Text fontSize='48px' textShadow='0 5px #000000'>EVMStudy</Text>
                    <Text
                    fontSize='30px'
                    letterSpacing='-5.5%'
                    fontFamily='VT323'
                    textShadow='0 2px 2px #000'>
                        Most Wanted NFT in 21 century.
                        <br/>
                        Test Network: Rinkeby.
                        <br/>
                        3 NFT per Wallet.
                        <br/>
                        <a href='https://rinkeby.etherscan.io/address/0x78623138412DD9a6b2b35051BAA769F5D9d10baB#code' target='_blank'>etherscan</a>
                        <br/>
                        <a href='https://faucets.chain.link/rinkeby'  target='_blank'>faucet</a>
                    </Text>
                </div>
                {isConnected ? (
                    <div>
                    <Flex align='center' justify='center'>
                                <Button
                            backgroundColor='#D6517D'
                            borderRadius='5px'
                            boxShadow='0px 2px 2px 1px #0F0F0F'
                            color='white'
                            cursor='pointer'
                            fontFamily='inherit'
                            padding='15px'
                            marginTop='10px'
                            onClick={handleDecrement}>
                                -
                            </Button> 
                            <Input
                            readOnly
                            fontFamily='inherit'
                            width='100px'
                            height='40px'
                            textAlign='center'
                            paddingLeft='19px'
                            marginTop='10px'
                            type='number' 
                            value={mintAmount} 
                            />
                            <Button
                            backgroundColor='#D6517D'
                            borderRadius='5px'
                            boxShadow='0px 2px 2px 1px #0F0F0F'
                            color='white'
                            cursor='pointer'
                            fontFamily='inherit'
                            padding='15px'
                            marginTop='10px'
                            onClick={handleIncrement}>
                                +
                            </Button> 
                    </Flex>
                    <Button
                            backgroundColor='#D6517D'
                            borderRadius='5px'
                            boxShadow='0px 2px 2px 1px #0F0F0F'
                            color='white'
                            cursor='pointer'
                            fontFamily='inherit'
                            padding='15px'
                            marginTop='10px'
                            onClick={handleMint}>
                                MINT!!!
                    </Button> 
                    </div>
                ) : (
                    <Text
                    marginTop='70px'
                    fontsize='30px'
                    letterSpacing='-5.5%'
                    fontfamily='VT323'
                    textShadow='0 3px #000'
                    color='#D6517D'
                    >
                        Вы не подключили metamask!
                    </Text>
                )}
            </Box>
  
        </Flex>
    );
};

export default MainMint;