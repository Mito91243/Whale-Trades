"use strict";
import axios from "axios";
import cheerio from "cheerio";


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
          eth_amount = parseFloat(eth_amount.slice(0, -3));
          //Print only eth Transactions
          console.log(eth_amount);
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
  let acc = "0x48e3E4F95CE13fe5427D1c45DC40202c1F614F67";
  let url = `https://etherscan.io/txs?a=${acc}`;

  axios.get(url).then((response) => {
    if (response.status === 200) {
      //extract html of the response
      const $ = cheerio.load(response.data);
      console.log("SS")
      //loop over each transaction
      $("tr td:nth-child(11)").each((i, el) => {
        //get the eth amount
        let eth_amount = $(el).text();
        //remove the eth part and dynamic cast into float
        eth_amount = parseFloat(eth_amount.slice(0, -3));
        //Print only eth Transactions
        if (eth_amount > 0) {
          console.log(`${eth_amount} moved`);
        } else {
          //GET THE HASH OF THE TRANSACTION
          //CLOSEST ROW WHICH IS THE SAME ROW FIND THE HASH THEN IT'S TEXT
          let transaction_hash = $(el)
            .closest("tr")
            .find("tr > td:nth-child(2) > div > span > a")
            .text();

            let action = $(el).closest('tr').find('td:nth-child(3) > span').text()
            if(action === 'Transfer' || action === 'Atomic Match_') console.log(action)
        }
      });
    }
  });
}

//Get_Transactions();
Get_Transactions_Account();


//---------------------TO DO---------------------
//Get_Hash_Details(hash)
//How to bypass the fucking cors and cloudfare
//i think cloudfare is blocking the known proxies

//---------------------ADVANCED FILTER REQUIRES CLOUDFARE BYBASS---------------------
