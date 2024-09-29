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

https://sepolia.scrollscan.com/address/0x841458a0b4d3df3a14dec51cb96f1c0fc03a96ea#code

### testRequestString.sol

Working string request contract that updated uint256 values:

https://sepolia.scrollscan.com/address/0xcafec77253150a920a81118ae82381223b4b13f5#code

### ScrollLibrary.sol

https://sepolia.scrollscan.com/address/0x7bbb7716b346874e31fa40f1c959868720f25fd2#code

## Foundry 

:warning: Note: you might need to add libraries in forge with remappings.txt :warning:

### Install Chainlink libraries
```
forge install smartcontractkit/chainlink-brownie-contracts --no-commit
```

### Test and Fork Scroll Sepolia
```
forge coverage --fork-url $scrollSepoliaHTTPS --report lcov && genhtml lcov.info -o report --branch-coverage
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

### Deploy and verify Chainlink testRequestString.sol
```
forge create src/testRequestString.sol:testRequestString \
--private-key $devTestnetPrivateKey \
--rpc-url $scrollSepoliaHTTPS \
--etherscan-api-key $scrollscanApiKey \
--verify 
```

### Deploy and verify ScrollLibrary.sol
```
forge create src/ScrollLibrary.sol:ScrollLibrary \
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

## Frontend

### GitHub Pages Hosting Link

https://marcuswentz.github.io/scroll-alchemy-level-up-2024/

### Run locally for testing

⚠️ Node.js version v16.14.2 is recommended to avoid errors running the website locally. ⚠️
```shell
npm install http-server
```
then
```shell
npx http-server
```
or
```shell
http-server
```