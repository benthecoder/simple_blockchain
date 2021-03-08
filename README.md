# Blockchain from scratch with Node.js and TypeScript

[Try it out on repl](https://repl.it/@benthecoder/simpleblockchain)

### Bitcoin vs modern financial system 
Bitcoin is a peer-to-peer electronic cash system. The modern financial system today depends on our trust of huge centralized banks to hold our fiat currency and to execute transactions. However, trust is a weakness and that eventually requires intervention by lawyers or the government.

Bitcoin allows two parties to make reliable transactions based on cryptographic proofs, eliminating the need for a middle man. The optimist call it digital gold and the pessimist call it fool's gold, but in reality it's just software. And like all software, it's purpose is to arrange 1s and 0s in a meaningful way. The protocol that makes it meaningful is blockchain, which allows two parties to engage in transactions denominated in Bitcoins or Satoshis. And just like any form of currency, they have value because we believe they do. 

### What is Bitcoin?
From a financial standpoint, think of blockchain as a shared public ledger that contains all the transactions from all bitcoin users which is distributed and scynchronised around the world. This eliminates the need for a central authority to maintain or validated it. 

From a technical perspective, think of blockchain as a linked-list database, where each block represents a group of transaction that have been permenantly commited to the database. Each new block is linked to the previous one in the blockchain and its creation goes through a very strict set of cryptographic rules.

### How do transactions work?
Each user or wallet has a unique public and private key. The public key is like a username for receiving money, and the private key is like a password for spending money. Before you can spend money, you have to prove that you're the owner of the public key that money has been sent to in the past. 

> [ public key (receiver) -> hash -> private key (sender signature) ]

Each transaction contains a hash or encrypted representation of the previous transaction and the new owner's public key. The hash is then signed with the previous owner's private key. This makes it possible to validate the chain of ownership without the need to expose the private key. The signature also makes it virtually impossible to alter the transaction after it's been issued.

### Mining
If someone decides to pay two different people at the same time (double-spending), a system called mining is comes in. Mining allows multiple computers around the world to agree on the appropriate state of the entire system or ledger. Each new transaction is broadcast to all nodes in the network. The transactions are packaged into a block, and miners will expend computing power to validate proof-of-work. They compute a proof for a random problem that is difficult to solve but easy to verify. The first miner who solves is will get a portion of the bitcoin as a reward. The block is then broadcasted back onto other nodes where it is permanently validated on the blockchain (note that only one of the double-spending trasaction will be validated, and this depends on which transaction is validated first by the miners)

---
## The code

Start from scratch
```js
npm init -y
npm install -D typescript @types/node
```

or clone the repo

``` js
git clone <this-repo>
npm install
npm start
```

### To run

typescript compiler
```js
npm run dev
```

the code
```js
npm run start
```

### Example usage
``` js
const satoshi = new Wallet();
const elon = new Wallet();
const ben = new Wallet();

satoshi.sendMoney(50, elon.publicKey);
elon.sendMoney(23, ben.publicKey);
ben.sendMoney(5, satoshi.publicKey);

console.log(Chain.instance)
```

Output 
```
Mining...
Solved: 11960
Mining...
Solved: 22626
Mining...
Solved: 7973
Chain {
  chain: [
    Block {
      prevHash: '',
      transaction: [Transaction],
      ts: 1615194880321,
      nonce: 766539676
    },
    Block {
      prevHash: '52f518fd225d58e987430e3e1293073462477a878b9955914c5ff033992a9988',
      transaction: [Transaction],
      ts: 1615194880825,
      nonce: 772809537
    },
    Block {
      prevHash: '7f2634242baa1d344b300b894c673f63e13a1364ce0cf7ac2546b86c53f90f24',
      transaction: [Transaction],
      ts: 1615194882283,
      nonce: 300003683
    },
    Block {
      prevHash: 'f4d7e0dd77c5ea4a0bed1ad32506c84d35ecddedd75601185fc081ca3baf5119',
      transaction: [Transaction],
      ts: 1615194884646,
      nonce: 937043714
    }
  ]
}
```

---

## Credits
* [Bitcoin ₿ in 100 Seconds // Build your Own Blockchain by Fireship](https://www.youtube.com/watch?v=qF7dkrce-mQ&t=215s)
* [github repo](https://github.com/fireship-io/node-blockchain)

## typescript vs javascript
* [When To Use TypeScript - A Detailed Guide Through Common Scenarios](https://khalilstemmler.com/articles/when-to-use-typescript-guide/)

## Resources for Bitcoin
* [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf)
* [But how does bitcoin actually work?](https://www.youtube.com/watch?v=bBC-nXj3Ng4)
* [How does Bitcoin work?](https://bitcoin.org/en/how-it-works)
* [Investopedia](https://www.investopedia.com/blockchain-4689765)
## Crypto
* [MIT 15.S12 Blockchain and Money, Fall 2018](https://www.youtube.com/playlist?list=PLUl4u3cNGP63UUkfL0onkxF6MYgVa04Fn)
* [Coinbase learn crpto-basics](https://www.coinbase.com/learn/crypto-basics)

## More videos
* [Vitalik Buterin: Ethereum, Cryptocurrency, and the Future of Money | Lex Fridman Podcast](https://www.youtube.com/watch?v=3x1b_S6Qp2Q&t=1s)
* [How secure is 256 bit security?](https://www.youtube.com/watch?v=S9JGmA5_unY)