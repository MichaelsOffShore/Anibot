const discord = require("discord.js");
const axios = require('axios');
require("dotenv").config();
const CoinmarketcapAPI = process.env.CMC;
const DiscordApi = process.env.DISCORD;
const CurrencyApi = process.env.CURRENCY;

/*
const express = require("express");
const app = express();
const port = 3000;
app.get('/', (req, res)=> res.send(""));
app.listen(port, ()=> console.log('Listening'));
*/
const client = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]});

client.on("ready", () => {
    console.log("Anibot is here, LETS GO!!");
  })
  
  client.on("messageCreate", msg => {

    let msgArray = msg.content.toLowerCase().split(" ");
    if(msgArray.length > 1){
      if (msgArray[0] === "!price") {
        let ticker = msgArray[1].toUpperCase();
      
        //Get the Cryptocurrencies price in USD
      getCryptocurrencyPrice(ticker).then(usd =>{ 
    
        // Get the price to EUR
        axios.get("https://api.apilayer.com/exchangerates_data/convert?to=eur&from=usd&amount=" + usd, { headers: { apikey: CurrencyApi } })
       .then(response => {
           
           const eurDecimals = response.data.result
           let eurPrice = Math.round(eurDecimals * 100) / 100;
           console.log("EUR Price: €" + eurPrice);
           msg.reply("€" + eurPrice);
        
          })
       .catch((error) => {
           console.log('error ' + error);
        });
      
      }).catch((error)=>{
        console.log("Error processing cryptocurrency request");
        console.log(error)
    });
        // End of discord crypto Function 
      }
    }
  })
  client.on("messageCreate", msg => {
    if (msg.content.toLowerCase() === "!randomphoto") {

      const fs = require('fs');
      const path = require('path');
      const imagesDir = 'Images';
      const cwd = process.cwd()+"/Images/";
      /* For Windows use cwd below
      const cwd = process.cwd()+"\\Images\\";
      */
      let name = "";
       fs.readdir(
        path.resolve(__dirname, imagesDir),
        (err, files) => {
      
          if (err) throw err;
          name = files[getRandomInt(files.length)];
          console.log("Attachment: " + cwd+name);
          console.log("Name: " + name);
          msg.channel.send({
            files: [{
              attachment: cwd+name,
              name: name,
              description: 'None'
            }]
          })
            .then()
            .catch(console.error);
            // Handle Error
        }
      );
    }

})
    
  client.on("messageCreate", msg => {
    if (msg.content.toLowerCase() === "best girl") {
      msg.reply('https://cdn.myanimelist.net/images/characters/15/437486.jpg');
    }
  })
    

  client.on("messageCreate", msg => {
    if (msg.content.toLowerCase() === "!bored") {
    // Bored api has no ssl certificate
    msg.reply("Under Maintainance...");
    }
  })
 
  client.on("messageCreate", msg => {
    if (msg.content === "!go") {
    client.off;
    }
  })
    

function getRandomInt(max) {
  let randNum = Math.floor(Math.random() * max);
  
  return randNum;
}

async function getCryptocurrencyPrice(ticker){
  
  // Coin Market Cap Call
  let cmcResponse = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=' + ticker, {
    headers: {
      'X-CMC_PRO_API_KEY': CoinmarketcapAPI,
    }
  });
  console.log("Price of Cryptocurrency " + ticker + " retrieved succesfully: " + "Status code 200");
  const USDprice = cmcResponse["data"]["data"][ticker]["quote"]["USD"]["price"] * 100 / 100;
  console.log("USD Price = $" + Math.floor((USDprice) * 100) / 100);

  return Math.floor((USDprice) * 100) / 100;

}


client.login(DiscordApi);

