# scroll-alchemy-level-up-2024

## Scroll Sepolia Chainlink Node Setup

https://github.com/MarcusWentz/chainlink-scroll-sepolia

## Scroll Sepolia Chainlink Oracle Contracts

### OperatorInherit.sol

Inherits Operator.sol deployed and verified on Scroll Sepolia:

https://sepolia.scrollscan.com/address/0x3d38e57b5d23c3881affb8bc0978d5e0bd96c1c6#code

As the contract owner, add new Chainlink node addresses with the function:

```solidity 
setauthorizedsenders(
    [
    "<chainlink_node_address>"
    ]
)
```

https://sepolia.scrollscan.com/address/0x3d38e57b5d23c3881affb8bc0978d5e0bd96c1c6#writeContract#F14

### testRequestUint256.sol

Working uint256 request contract that updated uint256 values:

https://sepolia.scrollscan.com/address/0x83ef71b80c78b1ca3e044e9bc282077c3b209008#code

## Foundry 

:warning: Note: you might need to add libraries in forge with remappings.txt :warning:

### Install Chainlink libraries
```
forge install smartcontractkit/chainlink-brownie-contracts --no-commit
```
### Deploy and verify Chainlink Operator.sol
```
forge create src/Operator.sol:OperatorInherit \
--private-key $devTestnetPrivateKey \
--rpc-url $scrollSepoliaHTTPS \
--etherscan-api-key $scrollscanApiKey \
--verify 
```

### Deploy and verify Chainlink testRequestUint256.sol
```
forge create src/testRequestUint256.sol:testRequestUint256 \
--private-key $devTestnetPrivateKey \
--rpc-url $scrollSepoliaHTTPS \
--etherscan-api-key $scrollscanApiKey \
--verify 
```

### Deploy and verify Chainlink testRequestUint256.sol
```
forge create src/testRequestString.sol:testRequestString \
--private-key $devTestnetPrivateKey \
--rpc-url $scrollSepoliaHTTPS \
--etherscan-api-key $scrollscanApiKey \
--verify 
```

### Compiler Optimization Error Fix

If you get the following error trying to inherit Operator.sol during compilation:
```shell
Error (1284): Some immutables were read from but never assigned, possibly because of optimization.
```
add the following flag in foundry.toml (under section "[profile.default]"):
```toml
[profile.default]
optimizer = false
```
