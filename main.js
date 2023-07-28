"use strict";

let api_key = "2BNG5GUPKQEDS4WY3G4T77F4RA1VUCE6CF";
let base_url = "https://api.etherscan.io/api";
let address = '0x48e3E4F95CE13fe5427D1c45DC40202c1F614F67';
let url = `https://api.etherscan.io/api
?module=account
&action=txlist
&address=${address}
&page=1
&offset=10000
&startblock=0
&endblock=99999999
&sort=desc
&apikey=${api_key}`;

async function Get_Transactions() {
  const response = await fetch(url);
  const data = await response.json();
  const transactions = data.result;

  transactions.forEach((transaction) => {
    let value = parseInt(transaction.value);
    if (value !== 0) {
      value = value / 1000000000000000;
      value = value / 1000;
      let sender = transaction.from;
      let reciever = transaction.to;
      //console.log(`address is ${address}`)
      //console.log(`sender is ${sender}`);
      //console.log(`receiver is ${reciever}`);

      if(sender.toLowerCase() === address.toLowerCase()) {
        console.log(`Mito sent ${value} to ${sender}`)
      } else {
        console.log(`Mito recieved ${value} from ${reciever}`)
      }

    }
  });
}

Get_Transactions();
