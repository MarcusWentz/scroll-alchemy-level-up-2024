# scroll-alchemy-level-up-2024

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