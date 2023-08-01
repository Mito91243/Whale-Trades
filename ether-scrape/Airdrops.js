"use strict";
import axios from "axios";
import cheerio from "cheerio";

function Get_Hot() {
  axios.get("https://airdrops.io/hot/").then((response) => {
    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      $("a > h3").each((i, el) => {
        let name = $(el).text();
      });
    }
  });
}

function Get_Details (name) {
    axios.get(`https://airdrops.io/${name}/`).then((response) => {
    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      $("div.airdrop-guide > ol > li").each((i, el) => {
        let detail = $(el).text();
        console.log(detail)
      });
    }
  });
}

//Get_Details('script-network')
//Get_Hot()