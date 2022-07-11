import { Button, Spin } from "antd";
import "antd/dist/antd.min.css";
// import ErrorModal from "./Modal/ErrorModal/ErrorModal";
// import LoadingModal from "./Modal/LoadingModal/LoadingModal";
import { Zilliqa, units, BN } from "@zilliqa-js/zilliqa";
import { schnorr } from "@zilliqa-js/crypto";
import { useEffect, useState } from "react";
import crypto from "crypto";
import bip39 from "bip39/index";
import "./app.css";
import { ReloadOutlined } from "@ant-design/icons";

const zilliqaLib = new Zilliqa("https://dev-api.zilliqa.com");

function App() {
  const [buttonState, setButtonState] = useState(false);
  const [balance, setBalance] = useState(null);

  const setLocalStorage = (mnemonic) => {
    if (mnemonic) localStorage.setItem("Mnemonic", mnemonic);
    localStorage.setItem(
      "PrivateKey",
      zilliqaLib.wallet.defaultAccount.privateKey
    );
    localStorage.setItem("Address", zilliqaLib.wallet.defaultAccount.address);
    localStorage.setItem(
      "PublicKey",
      zilliqaLib.wallet.defaultAccount.publicKey
    );
    localStorage.setItem(
      "Bech32Address",
      zilliqaLib.wallet.defaultAccount.bech32Address
    );
  };
  const accountHandlerByPrivateKey = () => {
    setButtonState(true);
    localStorage.clear();
    const pvtKey = schnorr.generatePrivateKey();
    console.log(`Pkey - ${pvtKey}`);
    zilliqaLib.wallet.addByPrivateKey(pvtKey);
    setLocalStorage();
  };
  const accountHandlerBySeed = () => {
    setButtonState(true);
    localStorage.clear();
    const randomBytes = crypto.randomBytes(16);
    console.log(randomBytes.toString("hex"), "check");

    const mnemonic = bip39.entropyToMnemonic(randomBytes.toString("hex"));
    console.log(mnemonic);
    zilliqaLib.wallet.addByMnemonic(mnemonic);
    setLocalStorage(mnemonic);
  };
  async function checkBalance() {
    const data = await zilliqaLib.blockchain.getBalance(
      // "zil1cjtvfl2d32f2fxhv6yj2qs7x40v9mzh7a5syjg"
      localStorage.getItem("Bech32Address")
    );
    const zil_balance = units.fromQa(
      new BN(data.result?.balance),
      units.Units.Zil
    );

    // console.log(zil_balance);
    setBalance(zil_balance);
    console.log(zil_balance);
  }
  useEffect(() => {
    checkBalance();
  }, [balance]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ padding: "20px 0px" }}>SikshyaTech Crypto Wallet</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          height: "80vh",
          alignItems: "center",
          border: "1px solid ",
          borderRadius: "16px",
          padding: "10px",
          boxShadow: "5px 6px 8px 6px #a9c4de",
        }}
      >
        <div className="">
          <Button
            type="primary"
            shape="round"
            onClick={accountHandlerByPrivateKey}
            disabled={buttonState}
          >
            Create Account
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={accountHandlerBySeed}
            disabled={buttonState}
            style={{ marginLeft: "10px" }}
          >
            Create Account Using Seed
          </Button>
        </div>
        <div className="bg-gray-100" style={{ padding: "8px" }}>
          <hr />
          <p>
            <h3>PrivateKey:</h3> <p>{localStorage.getItem("PrivateKey")}</p>
          </p>
          <hr />
          <p>
            <h3>PublicKey:</h3> <p>{localStorage.getItem("PublicKey")}</p>
          </p>
          <hr />
          <p>
            <h3>Address:</h3> <p>{localStorage.getItem("Address")}</p>
          </p>
          <hr />
          <p>
            <h3>Bech32Address:</h3>{" "}
            <p>{localStorage.getItem("Bech32Address")}</p>
          </p>
          <hr />
          <p>
            <h3>Mnemonic:</h3> <p>{localStorage.getItem("Mnemonic")}</p>
          </p>
          <hr />
        </div>
        <Button
          type="primary"
          shape="round"
          onClick={checkBalance}
          disabled={buttonState}
          style={{ marginLeft: "10px" }}
          icon={<ReloadOutlined />}
        >
          Check Balance
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "3px",
            color: "green",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          <p style={{ justifyContent: "center" }}>BALANCE:</p>
          {!balance ? (
            <Spin />
          ) : (
            <div className="flex flex-row">
              <p
                style={{ color: "green", fontWeight: "700", fontSize: "20px" }}
              >
                {balance} Zil
              </p>
            </div>
          )}
        </div>
        <a
          rel="noreferrer"
          href="https://dev-wallet.zilliqa.com/faucet?network=testnet"
          target="_blank"
        >
          {" "}
          Go to Faucet
        </a>
      </div>
    </div>
  );
}

export default App;
