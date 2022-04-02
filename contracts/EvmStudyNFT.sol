// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;


import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';


contract EVMStudyNFT is ERC721, Ownable {
    //Storage Variables. Cost a lot ETH. Very carryfull.
    uint256 public mintPrice;
    //Current number of NFT minted  
    uint256 public totalSupply;
    // maximum number in nft collection
    uint256 public maxSupply;
    //max number per wallet
    uint256 public maxPerWallet;
    //Owner can set true or false
    bool public isPublicMintEnabled;
    string internal baseTokenUri; 
    //how retrieve funds
    address payable public witdrawWallet;


    mapping(address=> uint256) public walletMints;

    //run when contract deploy
    //Name and symbol
    constructor() payable ERC721('EvmStudyNFT', 'EVMS') {
        // устанавливает переменные тут, потому что это более дешева операция
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    //isPublicMintEnabled_ with underscore cos its arguemnt
    //onlyOwner - can execute this fucntion
    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    //Функция уже существыует в ERC721
    //Её перегружают
    //Чтобы такие как OpenSEA имели правильную ссылку для вызова
    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token deos not exist');

        //grab id and place behind the baseTokenURI and attached .json
        //allows OpenSEA grap every single urls of the images 
        //token URI for each token
        //That how your images get displayed on OpenSEA.io
        return string(abi.encodePacked(baseTokenURI, String.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        //grap the whallet
        //call it (low level function)
        //pass value with address (balance of address of this contract)
        //and passing empty ('') - there is no data??? 
        //grabing success value
        (bool success, ) = witdrawWallet.call{  value: address(this).balance }('');
        //if its not succes gonna error and revert
        require(success, 'withdraw failed');
    }

    //payeble is anyone require transafer
    //most valueble part of code
    function mint(uint256 quantity_) public payable  {
        //must be true before mint started
        require(isPublicMintEnabled, 'minting not enabld');
        //user must set correct value. Price must be equal to price of NFT * quantity of NFT
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        //nft не должно закончится, превышать максимально кол-во доступных
        require(totalSupply + quantity_ <= maxSupply, 'sold out');
        //чтобы не превысело лимит кол-во NFT на один кошелек
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');

        //цикл для несколькоих NFT
        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            //function from ERC
            //pass address to recieve NFT
            //pass tokenID 
            //make sure increment totalSupply
            //Do thtis Change before do interaction 
            //any time you change, you shoud it before interact with external function
            _safeMint(msg.sender, newTokenId);
        }
    }


}
