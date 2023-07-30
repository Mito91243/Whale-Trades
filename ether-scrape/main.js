"use strict";
import axios from "axios";
import cheerio from "cheerio";

let address = "0x48e3E4F95CE13fe5427D1c45DC40202c1F614F67";

function Get_Transactions() {
  axios
    .get(`https://etherscan.io/txs`)
    .then((response) => {
      if (response.status === 200) {
        //extract html of the response
        const $ = cheerio.load(response.data);

        //loop over each transaction
        $("tr td:nth-child(11)").each((index, element) => {
          //get the eth amount
          let eth_amount = $(element).text();
          //remove the eth part and dynamic cast into float
          eth_amount = parseFloat(eth_amount.slice(0, -3).replace(/,/g, ""));
          //Print only eth Transactions
          if(eth_amount > 1) console.log(eth_amount);
        });
      } else {
        //if error happens let me know the status code
        console.log(response.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function Get_Transactions_Account() {
  let url = `https://etherscan.io/txs?a=${address}`;

  axios.get(url).then((response) => {
    if (response.status === 200) {
      //extract html of the response
      const $ = cheerio.load(response.data);
      //loop over each transaction
      $("tr td:nth-child(11)").each((i, el) => {
        //get the eth amount
        let eth_amount = $(el).text();
        //remove the eth part and dynamic cast into float
        eth_amount = parseFloat(eth_amount.slice(0, -3).replace(/,/g, ""));
        //Print only eth Transactions

        //GET THE HASH OF THE TRANSACTION
        //CLOSEST ROW WHICH IS THE SAME ROW FIND THE HASH THEN IT'S TEXT
        let transaction_hash = $(el)
          .closest("tr")
          .find("tr > td:nth-child(2) > div > span > a")
          .text();

        if (eth_amount > 0) {
          console.log(`${eth_amount} moved`);
        } else {
          let action = $(el)
            .closest("tr")
            .find("td:nth-child(3) > span")
            .text();
          if (action === "Transfer") {
            Get_Hash_Details(transaction_hash);
          }
        }
      });
    }
  });
}

function Get_Hash_Details(hash) {
  let url = `https://etherscan.io/tx/${hash}`;
  //console.log(url)

  axios.get(url).then((response) => {
    if (response.status === 200) {
      //extract html of the response
      const $ = cheerio.load(response.data);
      //loop over each transaction
      $(
        "span.d-inline-flex.flex-wrap.align-items-center > #tokenpricebutton"
      ).each((i, el) => {
        //Get The Value
        let alt_value = $(el).text();

        //IN THE SAME DIV I NEED TO GET THE ALT
        let alt_amount = $(el)
          .closest("span.d-inline-flex.flex-wrap.align-items-center")
          .find('span.me-1[data-bs-toggle="tooltip"]')
          .text()
          .replace(/,/g, "");

        //Get The Token
        let token = $(el)
          .closest("span.d-inline-flex.flex-wrap.align-items-center")
          .find(
            "a.d-flex.align-items-center > span.text-muted > span.text-truncate"
          )
          .text();

        //Get The Sender
        let sender = $(
          "div.card.p-5.mb-3 > div:nth-child(10) > div.col-md-9 > div > span > a"
        ).text();

        //Get The Reciever
        let reciever = $(
          "div.card.p-5.mb-3 > div:nth-child(11) > div.col-md-9 > div > span > a"
        ).text();

        //LOGGING TO SCREEN The Details
        if (sender.toLowerCase() === address.toLowerCase()) {
          console.log(
            `SENT ${alt_amount} ${token} with value of ${alt_value} to ${reciever}`
          );
        } else {
          console.log(
            `Recieved ${alt_amount} ${token} with value of ${alt_value} from ${sender}`
          );
        }
      });
    }
  });
}

Get_Transactions();
//Get_Transactions_Account();
//Get_Hash_Details(hash)

//---------------------TO DO---------------------
//How to bypass the fucking cors and cloudfare
//i think cloudfare is blocking the known proxies
//Put A coin name and it Tracks it's transactions

//---------------------ADVANCED FILTER REQUIRES CLOUDFARE BYBASS---------------------
