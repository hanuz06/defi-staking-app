pragma solidity ^0.5.0;

contract Tether {
  string public name = 'Mock Tether Token';
  string public symbol = 'mUSDT';
  uint256 public totalSupply = 1000000000000000000000000; // 1 mln tokens
  uint8 public decimals = 18;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint _value
  );

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint _value 
  );

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function approve(address _spender, uint _value) public returns(bool success){
    allowance[msg.sender][_spender] = _value; // msg.sender is the person who is approving the transaction
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

// this is a transfer from third party
  function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
    require(_value <= balanceOf[_from]);
    require(_value <= allowance[_from][msg.sender]);
    balanceOf[_to] += _value;
    balanceOf[_from] -= _value;
    allowance[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
} 