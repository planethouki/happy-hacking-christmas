pragma solidity >0.4.99 <0.6.0;

import "./ChristmasStocking.sol";

contract GiveMeStocking {
    ChristmasStocking public christmasStocking;

    event Fallback(
        uint256 value,
        address txOrigin
    );

    constructor(address _address) public {
        christmasStocking = ChristmasStocking(_address);
    }

    function abiEncodePacked() external pure returns (bytes memory) {
        return abi.encodePacked();
    }

    function abiEncodeWithSignature() external pure returns (bytes memory) {
        return abi.encodeWithSignature("deposit()");
    }

    function abiEncodeWithSignatureArgs() external view returns (bytes memory) {
        return abi.encodeWithSignature("deposit()", msg.sender);
    }

    function balanceOf() external returns (bytes memory) {
        (bool success, bytes memory ret) = address(christmasStocking).call(abi.encodeWithSignature("balanceOf(address)", msg.sender));
        require(success);
        return ret;
    }

    function deposit() external payable {
        require(msg.value > 0);
        (bool success,) = address(christmasStocking).call.value(msg.value)(abi.encodeWithSignature("deposit()"));
        require(success);
    }

    function () external payable {
        require(msg.value > 0);
        emit Fallback(msg.value, tx.origin);
        (bool success,) = address(christmasStocking).call.value(msg.value)(abi.encodeWithSignature("bribe()"));
        require(success);
        emit Fallback(msg.value, tx.origin);
    }
}
