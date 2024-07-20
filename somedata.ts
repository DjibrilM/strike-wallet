// const cryptocurrencies = [
//     {
//         name: "Algorand (ALGO)",
//         currencyName: "ALGO",
//         blockchain: "Algorand",
//         derivationPath: "m/44'/283'/0'/0/0",
//         description: "Algorand is a blockchain platform that aims to provide a secure and efficient way for developers and businesses to build decentralized applications (dApps). ALGO is the native token used for transactions and staking on the Algorand network."
//     },
//     {
//         name: "Arbitrum Nova",
//         currencyName: "Arbitrum Nova",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Arbitrum Nova is a layer 2 scaling solution for Ethereum, aiming to provide low-cost transactions with high throughput and low latency. It uses the Arbitrum Rollup technology to achieve these goals."
//     },
//     {
//         name: "Arbitrum One",
//         currencyName: "Arbitrum One",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Arbitrum One is another implementation of Arbitrum Rollup, offering scalability and low transaction costs for Ethereum-based dApps and transactions."
//     },
//     {
//         name: "Aurora",
//         currencyName: "Aurora",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Aurora is a blockchain platform designed to offer compatibility with Ethereum while enhancing scalability and reducing transaction costs."
//     },
//     {
//         name: "Avalanche C-Chain",
//         currencyName: "Avalanche",
//         blockchain: "Avalanche",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Avalanche is a highly-scalable blockchain platform for decentralized applications and enterprise blockchain deployments. The C-Chain is Avalanche's main chain."
//     },
//     {
//         name: "Base",
//         currencyName: "Base",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Base is a decentralized platform that aims to provide easy-to-use tools for blockchain developers. It utilizes Ethereum for its operations."
//     },
//     {
//         name: "Legacy Bitcoin (BTC) address (starts with a 1)",
//         currencyName: "BTC",
//         blockchain: "Bitcoin",
//         derivationPath: "m/44'/0'/0'/0/0",
//         description: "Bitcoin (BTC) is the first and most well-known cryptocurrency. It operates on a decentralized peer-to-peer network and is used primarily as a store of value and medium of exchange."
//     },
//     {
//         name: "SegWit Bitcoin (BTC) address (starts with a bc1q)",
//         currencyName: "BTC",
//         blockchain: "Bitcoin",
//         derivationPath: "m/84'/0'/0'/0/0",
//         description: "Segregated Witness (SegWit) is a Bitcoin improvement protocol that increases block size limits on a blockchain by removing signature data from Bitcoin transactions. This is to minimize data footprint.
//     }]

// const cryptocurrencies2 = [
//     {
//         name: "Algorand (ALGO)",
//         currencyName: "ALGO",
//         blockchain: "Algorand",
//         derivationPath: "m/44'/283'/0'/0/0",
//         description: "Algorand is a blockchain platform that aims to provide a secure and efficient way for developers and businesses to build decentralized applications (dApps). ALGO is the native token used for transactions and staking on the Algorand network."
//     },
//     {
//         name: "Arbitrum Nova",
//         currencyName: "Arbitrum Nova",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Arbitrum Nova is a layer 2 scaling solution for Ethereum, aiming to provide low-cost transactions with high throughput and low latency. It uses the Arbitrum Rollup technology to achieve these goals."
//     },
//     {
//         name: "Arbitrum One",
//         currencyName: "Arbitrum One",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Arbitrum One is another implementation of Arbitrum Rollup, offering scalability and low transaction costs for Ethereum-based dApps and transactions."
//     },
//     {
//         name: "Aurora",
//         currencyName: "Aurora",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Aurora is a blockchain platform designed to offer compatibility with Ethereum while enhancing scalability and reducing transaction costs."
//     },
//     {
//         name: "Avalanche C-Chain",
//         currencyName: "Avalanche",
//         blockchain: "Avalanche",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Avalanche is a highly-scalable blockchain platform for decentralized applications and enterprise blockchain deployments. The C-Chain is Avalanche's main chain."
//     },
//     {
//         name: "Base",
//         currencyName: "Base",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Base is a decentralized platform that aims to provide easy-to-use tools for blockchain developers. It utilizes Ethereum for its operations."
//     },
//     {
//         name: "Legacy Bitcoin (BTC) address (starts with a 1)",
//         currencyName: "BTC",
//         blockchain: "Bitcoin",
//         derivationPath: "m/44'/0'/0'/0/0",
//         description: "Bitcoin (BTC) is the first and most well-known cryptocurrency. It operates on a decentralized peer-to-peer network and is used primarily as a store of value and medium of exchange."
//     },
//     {
//         name: "SegWit Bitcoin (BTC) address (starts with a bc1q)",
//         currencyName: "BTC",
//         blockchain: "Bitcoin",
//         derivationPath: "m/84'/0'/0'/0/0",
//         description: "Segregated Witness (SegWit) is a Bitcoin improvement protocol that increases block size limits on a blockchain by removing signature data from Bitcoin transactions. This is to minimize data footprint."
//     },
//     {
//         name: "Taproot Bitcoin (BTC) address (starts with a bc1p)",
//         currencyName: "BTC",
//         blockchain: "Bitcoin",
//         derivationPath: "m/86'/0'/0'/0/0",
//         description: "Taproot is a Bitcoin protocol upgrade that introduces Schnorr signatures, Taproot, and Tapscript, which are expected to enhance the privacy, security, and efficiency of the Bitcoin blockchain."
//     },
//     {
//         name: "Bitcoin Cash (BCH)",
//         currencyName: "BCH",
//         blockchain: "Bitcoin Cash",
//         derivationPath: "m/44'/145'/0'/0/0",
//         description: "Bitcoin Cash (BCH) is a peer-to-peer electronic cash system. It is a fork of Bitcoin that aims to provide fast, reliable, and low-cost transactions."
//     },
//     {
//         name: "Bitcoin Gold (BTG)",
//         currencyName: "BTG",
//         blockchain: "Bitcoin Gold",
//         derivationPath: "m/44'/156'/0'/0/0",
//         description: "Bitcoin Gold (BTG) is a fork of Bitcoin that aims to decentralize mining by adopting a PoW algorithm that is ASIC-resistant. It allows more individuals to participate in mining."
//     },
//     {
//         name: "Bitcoin SV (BSV)",
//         currencyName: "BSV",
//         blockchain: "Bitcoin SV",
//         derivationPath: "m/44'/236'/0'/0/0",
//         description: "Bitcoin SV (BSV) is a fork of Bitcoin Cash that aims to restore the original Satoshi protocol, increase block size, and enable faster transactions."
//     },
//     {
//         name: "BNB Smart Chain",
//         currencyName: "BNB",
//         blockchain: "Binance Smart Chain",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "BNB Smart Chain is a blockchain platform by Binance that runs in parallel with Binance Chain. It supports smart contracts and is compatible with the Ethereum Virtual Machine (EVM)."
//     },
//     {
//         name: "Cardano (ADA)",
//         currencyName: "ADA",
//         blockchain: "Cardano",
//         derivationPath: "m/44'/1815'/0'/0/0",
//         description: "Cardano (ADA) is a blockchain platform that aims to provide a more secure and sustainable infrastructure for the development of decentralized applications and smart contracts."
//     },
//     {
//         name: "Cosmos (ATOM)",
//         currencyName: "ATOM",
//         blockchain: "Cosmos",
//         derivationPath: "m/44'/118'/0'/0/0",
//         description: "Cosmos (ATOM) is a decentralized network of independent blockchains that are powered by Byzantine Fault Tolerant (BFT) consensus algorithms like Tendermint. ATOM is used for staking and governance."
//     },
//     {
//         name: "Dash (DASH)",
//         currencyName: "DASH",
//         blockchain: "Dash",
//         derivationPath: "m/44'/5'/0'/0/0",
//         description: "Dash (DASH) is a digital currency that focuses on fast and low-cost transactions. It uses a two-tier network with miners and masternodes to achieve consensus and provide advanced features like InstantSend and PrivateSend."
//     },
//     {
//         name: "Decred (DCR)",
//         currencyName: "DCR",
//         blockchain: "Decred",
//         derivationPath: "m/44'/42'/0'/0/0",
//         description: "Decred (DCR) is a community-directed digital currency designed to be a superior store of value for generations to come. Its hybrid consensus system offers a balance between miners and stakeholders."
//     },
//     {
//         name: "DigiByte (DGB)",
//         currencyName: "DGB",
//         blockchain: "DigiByte",
//         derivationPath: "m/44'/20'/0'/0/0",
//         description: "DigiByte (DGB) is a rapidly growing open-source blockchain created in late 2013 and released in early 2014. After 7 years of forward-thinking development, DigiByte has become one of the safest, fastest, longest and most decentralized UTXO blockchain in existence."
//     }]


// const cryptocurrencies3 = [
//     // Previous entries...
//     {
//         name: "Dogecoin (DOGE)",
//         currencyName: "DOGE",
//         blockchain: "Dogecoin",
//         derivationPath: "m/44'/3'/0'/0/0",
//         description: "Dogecoin (DOGE) started as a meme cryptocurrency based on the Shiba Inu dog meme. It has since gained a following and is used for tipping and microtransactions."
//     },
//     {
//         name: "Elrond (EGLD)",
//         currencyName: "EGLD",
//         blockchain: "Elrond",
//         derivationPath: "m/44'/508'/0'/0'/0'",
//         description: "Elrond (EGLD) is a highly scalable blockchain platform designed for fast, secure, and low-cost transactions. EGLD is the native token used for staking and transaction fees."
//     },
//     {
//         name: "Eos (EOS)",
//         currencyName: "EOS",
//         blockchain: "EOS",
//         derivationPath: "m/44'/194'/0'/0/0",
//         description: "EOS is a blockchain platform designed for the development of decentralized applications (dApps). EOS tokens are used to pay for bandwidth, computation, and storage on the EOS network."
//     },
//     {
//         name: "Ethereum (ETH)",
//         currencyName: "ETH",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Ethereum (ETH) is a decentralized platform that enables developers to build and deploy smart contracts and decentralized applications (dApps). ETH is used for transactions and as a store of value."
//     },
//     {
//         name: "Ethereum Classic (ETC)",
//         currencyName: "ETC",
//         blockchain: "Ethereum Classic",
//         derivationPath: "m/44'/61'/0'/0/0",
//         description: "Ethereum Classic (ETC) is a continuation of the original Ethereum blockchain that split after a hard fork in 2016. It upholds the principle of immutability and decentralization."
//     },
//     {
//         name: "Fantom",
//         currencyName: "FTM",
//         blockchain: "Fantom",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Fantom is a high-performance, scalable blockchain platform for decentralized finance (DeFi) and enterprise applications. FTM tokens are used for payments, staking, and governance."
//     },
//     {
//         name: "Filecoin (FIL)",
//         currencyName: "FIL",
//         blockchain: "Filecoin",
//         derivationPath: "m/44'/461'/0'/0/0",
//         description: "Filecoin (FIL) is a decentralized storage network designed to store humanity's most important information. FIL tokens are used to pay for storage and retrieval of data on the Filecoin network."
//     },
//     {
//         name: "Flare (FLR)",
//         currencyName: "FLR",
//         blockchain: "Flare Network",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Flare Network is a blockchain platform that integrates the Ethereum Virtual Machine (EVM) and enables smart contract functionality for non-EVM chains like XRP. FLR tokens are used for governance and as collateral."
//     },
//     {
//         name: "Hedera Hashgraph (HBAR)",
//         currencyName: "HBAR",
//         blockchain: "Hedera Hashgraph",
//         derivationPath: "m/44'/3030'/0'/0/0",
//         description: "Hedera Hashgraph (HBAR) is a decentralized public network where developers can build secure, fair applications with near real-time finality. HBAR tokens are used for transactions and network services."
//     },
//     {
//         name: "ICON (ICX)",
//         currencyName: "ICX",
//         blockchain: "ICON",
//         derivationPath: "m/44'/74'/0'/0/0",
//         description: "ICON (ICX) is a blockchain platform that connects independent blockchains without the use of intermediaries. ICX tokens are used for transactions, governance, and staking."
//     },
//     {
//         name: "Lisk (LSK)",
//         currencyName: "LSK",
//         blockchain: "Lisk",
//         derivationPath: "m/44'/134'/0'/0/0",
//         description: "Lisk (LSK) is a blockchain application platform that enables developers to build decentralized applications (dApps) in JavaScript. LSK tokens are used for transactions and staking."
//     },
//     {
//         name: "Litecoin (LTC)",
//         currencyName: "LTC",
//         blockchain: "Litecoin",
//         derivationPath: "m/44'/2'/0'/0/0",
//         description: "Litecoin (LTC) is a peer-to-peer cryptocurrency created as a 'lite' version of Bitcoin. It is designed for fast and low-cost transactions."
//     },
//     {
//         name: "NANO (XNO)",
//         currencyName: "NANO",
//         blockchain: "Nano",
//         derivationPath: "m/44'/165'/0'/0/0",
//         description: "NANO (XNO) is a digital currency designed for fast and feeless transactions. It uses a block-lattice architecture where each account has its own blockchain."
//     },
//     {
//         name: "NEM (XEM)",
//         currencyName: "XEM",
//         blockchain: "NEM",
//         derivationPath: "m/44'/43'/0'/0/0",
//         description: "NEM (XEM) is a blockchain platform that aims to provide better performance and scalability for enterprise-level applications. XEM tokens are used for transactions and as a unit of account on the NEM network."
//     },
//     {
//         name: "Neo (NEO)",
//         currencyName: "NEO",
//         blockchain: "Neo",
//         derivationPath: "m/44'/888'/0'/0/0",
//         description: "Neo (NEO) is a blockchain platform for building decentralized applications (dApps) and smart contracts. NEO tokens are used for governance, network fees, and staking."
//     },
//     {
//         name: "Ontology (ONT) / Ontology Gas (ONG)",
//         currencyName: "ONT/ONG",
//         blockchain: "Ontology",
//         derivationPath: "m/44'/1024'/0'/0/0",
//         description: "Ontology (ONT) is a high-performance public blockchain and distributed collaboration platform. ONG is the utility token used to pay for transactions and services on the Ontology network."
//     },
//     {
//         name: "Optimism",
//         currencyName: "Optimism",
//         blockchain: "Ethereum",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Optimism is a layer 2 scaling solution for Ethereum, aiming to increase transaction throughput and reduce costs using optimistic rollups."
//     },
//     {
//         name: "Polkadot (DOT)",
//         currencyName: "DOT",
//         blockchain: "Polkadot",
//         derivationPath: "m/44'/354'/0'/0'/0'",
//         description: "Polkadot (DOT) is a heterogeneous multi-chain blockchain platform that enables different blockchains to interoperate. DOT tokens are used for governance and bonding."
//     },
//     {
//         name: "Polygon (MATIC)",
//         currencyName: "MATIC",
//         blockchain: "Polygon",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Polygon (MATIC) is a protocol and framework for building and connecting Ethereum-compatible blockchain networks. MATIC tokens are used for transactions, staking, and governance."
//     },
//     {
//         name: "Qtum (QTUM)",
//         currencyName: "QTUM",
//         blockchain: "Qtum",
//         derivationPath: "m/44'/2301'/0'/0'/0'",
//         description: "Qtum (QTUM) is a proof-of-stake blockchain platform that combines the strength of Bitcoin’s UTXO model with the Ethereum Virtual Machine (EVM). QTUM tokens are used for staking and governance."
//     },
//     {
//         name: "Ravencoin (RVN)",
//         currencyName: "RVN",
//         blockchain: "Ravencoin",
//         derivationPath: "m/44'/175'/0'/0'/0'",
//         description: "Ravencoin (RVN) is a blockchain platform optimized for transferring assets such as tokens from one holder to another. RVN tokens are used for asset issuance and transfer."
//     },
//     {
//         name: "Rootstock",
//         currencyName: "Rootstock",
//         blockchain: "Bitcoin",
//         derivationPath: "m/44'/60'/0'/0/0",
//         description: "Rootstock (RSK) is a smart contract platform that is connected to the Bitcoin blockchain. It enables smart contract functionality while using Bitcoin's security."
//     },
//     {
//         name: "Solana (SOL)",
//         currencyName: "SOL",
//         blockchain: "Solana",
//         derivationPath: "m/44'/501'/0'/0/0",
//         description: "Solana (SOL) is a high-performance blockchain platform focused on scalability without sacrificing decentralization. SOL tokens are used for transactions and staking."
//     },
//     {
//         name: "Stellar Lumens (XLM)",
//         currencyName: "XLM",
//         blockchain: "Stellar",
//         derivationPath: "m/44'/148'/0'/}"
//     }]






//     const cryptocurrencies4 = [
//   // Previous entries...
//   {
//     name: "Terra (LUNA)",
//     currencyName: "LUNA",
//     blockchain: "Terra",
//     derivationPath: "m/44'/330'/0'/0'/0'",
//     description: "Terra (LUNA) is a blockchain platform that aims to create a global payment system powered by the stability and scalability of fiat-pegged stablecoins. LUNA is the native token used for stability and governance."
//   },
//   {
//     name: "Tezos (XTZ)",
//     currencyName: "XTZ",
//     blockchain: "Tezos",
//     derivationPath: "m/44'/1729'/0'/0/0",
//     description: "Tezos (XTZ) is a self-amending blockchain platform that enables the creation of smart contracts and decentralized applications (dApps). XTZ tokens are used for governance and staking."
//   },
//   {
//     name: "Theta (THETA) / Theta Fuel (TFUEL)",
//     currencyName: "THETA/TFUEL",
//     blockchain: "Theta",
//     derivationPath: "m/44'/500'/0'/0'/0'",
//     description: "Theta is a decentralized video delivery network powered by users and an innovative new blockchain. THETA tokens are used for governance and staking, while TFUEL is used for on-chain operations like payments to relayers for sharing a video stream."
//   },
//   {
//     name: "Tron (TRX)",
//     currencyName: "TRX",
//     blockchain: "Tron",
//     derivationPath: "m/44'/195'/0'/0'/0'",
//     description: "Tron (TRX) is a blockchain-based platform that aims to build a decentralized internet. TRX tokens are used to power applications on the Tron network."
//   },
//   {
//     name: "VeChain (VET) / VeThor (VTHO)",
//     currencyName: "VET/VTHO",
//     blockchain: "VeChain",
//     derivationPath: "m/44'/818'/0'/0'/0'",
//     description: "VeChain (VET) is a blockchain platform focused on enhancing supply chain management and business processes. VET tokens are used for transactions and as a store of value, while VTHO is used to pay for transactions and smart contract execution."
//   },
//   {
//     name: "Waves (WAVES)",
//     currencyName: "WAVES",
//     blockchain: "Waves",
//     derivationPath: "m/44'/5741564'/0'/0'/0'",
//     description: "Waves (WAVES) is a blockchain platform that allows users to issue, transfer, and exchange digital assets on a decentralized blockchain. WAVES tokens are used for transactions, staking, and as a reserve currency."
//   },
//   {
//     name: "XRP (XRP)",
//     currencyName: "XRP",
//     blockchain: "Ripple",
//     derivationPath: "m/44'/144'/0'/0'/0'",
//     description: "XRP is the digital asset native to the Ripple blockchain. It is used for fast and low-cost international payments and acts as a bridge currency for other currencies."
//   },
//   {
//     name: "Zcash (ZEC)",
//     currencyName: "ZEC",
//     blockchain: "Zcash",
//     derivationPath: "m/44'/133'/0'/0'/0'",
//     description: "Zcash (ZEC) is a privacy-focused cryptocurrency that uses zero-knowledge proofs to provide enhanced privacy for transactions. ZEC tokens can be shielded for privacy or transparent for auditing purposes."
//   },
//   {
//     name: "Zilliqa (ZIL)",
//     currencyName: "ZIL",
//     blockchain: "Zilliqa",
//     derivationPath: "m/44'/313'/0'/0'/0'",
//     description: "Zilliqa (ZIL) is a high-throughput blockchain platform that aims to improve scalability and security for decentralized applications (dApps). ZIL tokens are used for transactions, staking, and governance."
//   }
// ];
