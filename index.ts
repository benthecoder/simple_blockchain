import * as crypto from 'crypto';

class Transaction {
  constructor(
    public amount: number,
    public payer: string, // public key
    public payee: string // public key
  ) {}

  toString() {
    return JSON.stringify(this);
  }
}

class Block {

  public nonce = Math.round(Math.random() * 999999999);

  constructor(
    public prevHash: string,
    public transaction: Transaction,
    public ts = Date.now() //chronological order
  ) {}

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash('SHA256'); // secure hash algorithm
    hash.update(str).end(); 
    return hash.digest('hex') // input -> hash() -> digest
  }
}


// The blockchain
class Chain {
  // singleton instance
  public static instance = new Chain(); 

  chain: Block[]; // new array

  constructor() {
  	// genesis block
    this.chain = [new Block('', new Transaction(100, 'genesis', 'satoshi'))];
  }

  // Most recent block
  get lastBlock() {
  	return this.chain[this.chain.length - 1]
  }

  // proof-of-work system
  mine(nonce: number) {
  	let solution = 1;
  	console.log('Mining...')

  	while (true) {

  		// message-digest algorithm, faster and lesser bits than SHA-256
  		
  		const hash = crypto.createHash('MD5')
  		hash.update((nonce + solution).toString()).end();

  		const attempt = hash.digest('hex');

  		if(attempt.substr(0, 4) === '0000') {
  			console.log(`Solved: ${solution}`);
  			return solution;
  		}

  		solution += 1;
  	}
  }

  // Add new block to chain if signature is valid and pow is complete
  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
  	const verify = crypto.createVerify('SHA256');
  	verify.update(transaction.toString());

  	// verify with public key and signature
  	const isValid = verify.verify(senderPublicKey, signature);

  	if (isValid) {
  		const newBlock = new Block(this.lastBlock.hash, transaction);
  		this.mine(newBlock.nonce); // prevents double-spending
  		this.chain.push(newBlock);
  	}
  }

}


// Wallet gives users a public and private key
class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keypair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' }, // Privacy Enhanced Mail
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
  }

  sendMoney(amount: number, payeePublicKey: string) {
  	const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

  	const sign = crypto.createSign('SHA256');
  	sign.update(transaction.toString()).end();

  	const signature = sign.sign(this.privateKey);
	Chain.instance.addBlock(transaction, this.publicKey, signature)
  }


}

 
// Example usage

const satoshi = new Wallet();
const elon = new Wallet();
const ben = new Wallet();

satoshi.sendMoney(50, elon.publicKey);
elon.sendMoney(23, ben.publicKey);
ben.sendMoney(5, satoshi.publicKey);

console.log(Chain.instance)

