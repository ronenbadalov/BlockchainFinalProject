// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./tokens/ERC721.sol";

contract PurchaseLand is ERC721 {
    address [2500] public owners;
    address payable owner;
    uint256 [2500] public price;
    bool [2500] public notForSale;
    string [2500] public games;

    event LandBought(address indexedFrom, uint256 landId, address owner);
    event LandTransfer(address from, address to, uint landId);
    event PriceChanged(uint landId, uint256 newPrice);
    event SaveChanges(uint256[2500] price,string[2500] games, bool[2500] notForSale);


    constructor() ERC721("MetaLand", "MND") {
        owner = payable(msg.sender);
       
    }

    function purchase(uint256 landId, uint256 pay) public payable returns (uint256) {
        require(landId >= 0 && landId <= 2499);
        require(owners[landId] == 0x0000000000000000000000000000000000000000);
        price[landId] = pay;
        _mint(msg.sender, landId);
        owners[landId] = msg.sender;
        notForSale[landId] = true;
        emit LandBought(msg.sender, landId, owners[landId]);
        return landId;
    }
    // Retrieving the owners
    function getOwners() public view returns (address[2500] memory) {
        return owners;
    }
    // Retrieving specific owner
    function getOwner(uint256 landId) public view returns (address landOwner) {
        return owners[landId];
    }
    function transferLand(address payable from, address payable to, uint256 landId ) public virtual  returns (uint256) {
        //solhint-disable-next-line max-line-length
        _transfer(from, to, landId);
        owners[landId] = to;
        emit LandTransfer(from ,to ,landId);
        return landId;
    }
    function setPrice(uint256 landId, uint256 newPrice) public virtual {
        require(ownerOf(landId) == msg.sender);
        price[landId] = newPrice;
        emit PriceChanged(landId, newPrice);
    }

    function saveChanged(uint256 landId, uint256 pay, bool status, string memory nameGame) public virtual{
        // require(owners[landId] == msg.sender);
        // notForSale[landId] = status;
        // price[landId] = pay;
        // games[landId] = nameGame;
        emit SaveChanges(price, games, notForSale);
    }
}
