"use strict";

let api_key = "2BNG5GUPKQEDS4WY3G4T77F4RA1VUCE6CF";
let base_url = "https://api.etherscan.io/api";
let address = "0x48e3E4F95CE13fe5427D1c45DC40202c1F614F67";

let url = `https://api.etherscan.io/api
?module=account
&action=tokentx
&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2
&address=${address}
&page=1
&offset=100
&startblock=0
&endblock=27025780
&sort=asc
&apikey=${api_key}`;

url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${api_key}`

console.log(url)

//fetch(url);
