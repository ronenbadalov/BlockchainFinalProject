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
    event LandTransfer();
    event PriceChanged(uint landId, uint256 newPrice);
    event saveChangedEvent();


    constructor() ERC721("MetaLand", "MND") {
        owner = payable(msg.sender);
       
    }

    function purchase(uint256 landId, uint256 pay) public payable returns (uint256) {
        require(landId >= 0 && landId <= 2499);
        require(owners[landId] == 0x0000000000000000000000000000000000000000);
        price[landId] = pay;
        _mint(msg.sender, landId);
        owners[landId] = msg.sender;
        games[landId] = "Numble";
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

    function getLandsData() public view returns(string[2500] memory, bool[2500] memory, uint256[2500] memory) {
        return (games, notForSale, price);
    }
    function transferLand(uint256 landId, address payable _to ) public payable {
       bool sent = _to.send(msg.value);
       owners[landId] = msg.sender;
       emit LandTransfer();
        require(sent, "Failed to send Ether");
    }
    function setPrice(uint256 landId, uint256 newPrice) public virtual {
        // require(ownerOf(landId) == msg.sender);
        price[landId] = newPrice;
        notForSale[landId] = true;
        emit PriceChanged(landId, newPrice);
    }


    function saveChanged(uint256 landId, uint256 pay, bool status, string memory nameGame) public {
        // require(owners[landId] == msg.sender);
        notForSale[landId] = status;
        price[landId] = pay;
        games[landId] = nameGame;
        emit saveChangedEvent();
    }
}
