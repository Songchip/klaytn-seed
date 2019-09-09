pragma solidity ^0.5.6;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";

contract SCVCard is ERC721Full {
    struct Card{
        string name;
        uint256 balance;
    }

    Card[] public cards;
    address public owner;

    constructor() ERC721Full("SCVCard", "SCVCARD") public {
        owner = msg.sender;
    }

    function mintCard(string memory name, uint256 balance, address account) public {
        require(owner==msg.sender);
        uint cardId = cards.length;

        cards.push(Card(name, balance));

        _mint(account, cardId);

    }


    function getCardCount() public view returns (uint count){
        return cards.length;
    }
}