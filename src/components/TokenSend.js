import { useState } from 'react';
import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const tokenAddress = "0xE48B9e36c3a88CcBD8F45347bFC3Fa9B79F86c0e"

const TokenSend = (props) => {

  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function sendCoins() {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, signer);
    const transation = await contract.transfer(userAccount, amount);
    await transation.wait();
    console.log(`${amount} Coins successfully sent to ${userAccount}`);
  }
}
    return (
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
        <Card.Body>
        <Card.Subtitle> send faucet to an address
        </Card.Subtitle>
        <br></br>
        <div className="d-grid gap-2">
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Payee 0x address" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        <Button onClick={sendCoins} variant="success">send </Button>
        </div>
        </Card.Body>
        </Card>
    )
}

export default TokenSend
