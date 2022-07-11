import {Button} from 'antd'
import 'antd/dist/antd.min.css';
import ErrorModal from './Modal/ErrorModal/ErrorModal'
import LoadingModal from './Modal/LoadingModal/LoadingModal'
import {Zilliqa,units,BN}  from '@zilliqa-js/zilliqa'
import {schnorr} from '@zilliqa-js/crypto'
import { useEffect, useState } from 'react';

const zilliqaLib = new Zilliqa("https://dev-api.zilliqa.com");


function App() {

  const [buttonState, setButtonState] = useState(false)
  const [balance, setBalance] = useState(0)
  const accountHandler = () => {
    setButtonState(true)
    localStorage.clear()
    const pvtKey = schnorr.generatePrivateKey()
    console.log(`Pkey - ${pvtKey}`)
    zilliqaLib.wallet.addByPrivateKey(pvtKey)
    localStorage.setItem('PrivateKey', zilliqaLib.wallet.defaultAccount.privateKey)
    localStorage.setItem('Address', zilliqaLib.wallet.defaultAccount.address)
    localStorage.setItem('PublicKey', zilliqaLib.wallet.defaultAccount.publicKey)
    localStorage.setItem('Bech32Address', zilliqaLib.wallet.defaultAccount.bech32Address)

  }


  const checkBalance = async () => {
      const data = await zilliqaLib.blockchain.getBalance(localStorage.getItem('Bech32Address'))
      const zil_balance = units.fromQa(new BN(data.result?.balance),units.Units.Zil)
      setBalance(zil_balance)
  }  
   
  return (
    <div className=" flex flex-col">
      <div className=''>
      <Button type="primary" shape="round" onClick={accountHandler} disabled= {buttonState}>
        Create Account</Button>
        </div>
        <div className='bg-gray-100'>
        <p>PrivateKey: <p>{localStorage.getItem('PrivateKey')}</p></p>
        <p>PublicKey: <p>{localStorage.getItem('PublicKey')}</p></p>
        <p>Address: <p>{localStorage.getItem('Address')}</p></p>
        <p>Bech32Address: <p>{localStorage.getItem('Bech32Address')}</p></p>

        </div>
        <div>
        <Button type="primary" shape="round" onClick={checkBalance} >
        Check Balance</Button>
        </div>
        <div className='flex flex-row'>
        <p>Balance: {balance} zil</p>

        </div>
    </div>
  );
}

export default App;
