import { UALJs } from "ual-plainjs-renderer";
import { Wax } from "@alienworlds/ual-wax";
import { AtomicMarketApi } from "atomicmarket";

const WaxChain = {
  chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
  name: "WAX Mainnet",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "wax.greymass.com",
      port: "443",
    },
  ],
};

const onLoggedIn = async function (users) {
  const appRoot = document.getElementById("wax-pass");
  const login = document.getElementById("login")
  const marketApi = new AtomicMarketApi(
    "https://wax.api.atomicassets.io",
    "atomicmarket",
    { fetch }
  );

  const loading = document.createElement("div");
  loading.innerHTML = "Loading...";
  const accessGranted = document.createElement("div");
  accessGranted.innerHTML = "Access Granted";
  const accessDenied = document.createElement("div");
  accessDenied.innerHTML = "Access Denied";

  login.style.display = "none";
  const { accountName } = users[0];


  appRoot.appendChild(loading);

  const assetResponse = await marketApi.getAssets({
    owner: accountName,
    template_id: 338124,
  });

  loading.remove();
  if(assetResponse.length > 0) {
    appRoot.appendChild(accessGranted);
  } else {
    appRoot.appendChild(accessDenied);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const buttonContainer = {
    containerElement: document.getElementById("login"),
  };

  const waxAuth = new Wax([WaxChain]);
  const ual = new UALJs(
    onLoggedIn,
    [WaxChain],
    "WAXPass",
    [waxAuth],
    buttonContainer
  );
  ual.init();
});
