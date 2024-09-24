# scroll-alchemy-level-up-2024

## Chainlink Any API Nodes

OperatorInherit.sol deployed and verified on Scroll Sepolia:

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

## Foundry 

:warning: Note: you might need to add libraries in forge with remappings.txt :warning:

## Install Chainlink libraries
```
forge install smartcontractkit/chainlink-brownie-contracts --no-commit
```
## Deploy and verify Chainlink Operator.sol
```
forge create src/Operator.sol:OperatorInherit \
--private-key $devTestnetPrivateKey \
--rpc-url $scrollSepoliaHTTPS \
--etherscan-api-key $scrollscanApiKey \
--verify 
```

## Compiler Optimization Error Fix

If you get the following error trying to inherit Operator.sol during compilation:
```shell
Error (1284): Some immutables were read from but never assigned, possibly because of optimization.
```
add the following flag in foundry.toml (under section "[profile.default]"):
```toml
[profile.default]
optimizer = false
```