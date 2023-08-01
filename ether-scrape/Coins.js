"use strict";
import axios from "axios";
import cheerio from "cheerio";

function Get_Gainers() {
  axios
    .get(`https://coinmarketcap.com/gainers-losers/`)
    .then((response) => {
      if (response.status === 200) {
        const $ = cheerio.load(response.data);
        let counter = 0;
        console.log("TOP GAINERS");
        $(
          "div:nth-child(1) > div > table > tbody > tr > td:nth-child(2) > a > div > div > p"
        ).each((i, el) => {
          if (counter === 10) return false;
          let name = $(el).text();

          let percent = $(el)
            .closest("tr")
            .find("tr > td:nth-child(4) > span")
            .text();
          console.log(`${name} increased +${percent} `);
          counter++;
        });

        //-------------------------------------GET LOSERS-------------------------------------
        console.log(`


TOP LOSERS`);
        counter = 0;
        $(
          "div:nth-child(2) > div > table > tbody > tr > td:nth-child(2) > a > div > div > p"
        ).each((i, el) => {
          if (counter === 10) return false;
          let name = $(el).text();

          let percent = $(el)
            .closest("tr")
            .find("tr > td:nth-child(4) > span")
            .text();
          console.log(`${name} dropped -${percent} `);
          counter++;
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}


Get_Gainers();
//Get_NFT_Gainers();


 //-------------------------------------TO DO------------------------------------
 //GET NFT 
 //GET AI_COINS
 //COIN LOOKUP

