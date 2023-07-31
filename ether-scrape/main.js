"use strict";
import axios from "axios";
import cheerio from "cheerio";

let address = "0x6Ec21d1868743a44318c3C259a6d4953F9978538";

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
          if (eth_amount > 1) console.log(eth_amount);
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
          let sender = $(el)
            .closest("tr")
            .find("td:nth-child(8) > div")
            .text()
            .slice(-11)
            .toLowerCase();

          //FIX HERE
          let send = sender;
          let add = address.slice(-8).toLowerCase();
          if (send === add.slice(-8).toLowerCase()) {
            console.log(`SENT ${eth_amount}`);
          } else {
            //console.log(`Recieved ${eth_amount}`);
          }
          //TO HERE
        } else {
          let action = $(el)
            .closest("tr")
            .find("td:nth-child(3) > span")
            .text();
          if (eth_amount === 0) {
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
      const $_ = $;

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

      //----------------------------------------------------------------------Handles Second Variation of ALT_AMOUNT----------------------------------------------------------------------

      //loop over each transaction
      $(
        'div > span.d-inline-flex.flex-wrap.align-items-center > span.text-muted.me-1'
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

//Get_Transactions();
Get_Transactions_Account();
//Get_Hash_Details(hash)
//Monitor_X();

function Monitor_X() {
  let token_url = "0xD533a949740bb3306d119CC777fa900bA034cd52";

  axios
    .get(
      `https://etherscan.io/assets/js/custom/commonjs.js?v=23.7.4.0
      `
    )
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        //const $ = cheerio.load(response.data);
      }
    });
}

//https://basescan.org/
//dexscreener
//Figure out a way to put a token and keep retrieving it's transactions
//maybe etherscan maybe some configuration to avoid redirection
//maybe even another whole website like dexscreener or something
//Make a connect to coinmarketcap function to look up coin details
//Make a simple Dictionary where each coin name is connected to it's address
//Request coin name from user in terminal and then retrieve it's information from the dictionay

//---------------------TO DO---------------------
//FIX THE RECIEVED AND SENT MESSAGE FOR NORMAL ETH ACCOUN TRANSACTIONS
// Make this WORK https://etherscan.io/tx/0xa84aa065ce61dbb1eb50ab6ae67fc31a9da50dd2c74eefd561661bfce2f1620c
// THE ALT AMOUNT AND ALT VALUE HAVE 2 DIFFERENT FORMATS GET BOTH.
