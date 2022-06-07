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

      getCryptocurrencyPrice(ticker).then(usd =>{ 
    
      axios.get('https://freecurrencyapi.net/api/v2/latest?apikey='+CurrencyApi+'&base_currency=USD')
      .then(response => {
      let usdConversion = JSON.parse(response["data"]["data"]["EUR"]);
      let eurPrice = (usdConversion * usd);     

      if(usd < 0.10){
      eurPrice = Math.floor((eurPrice) * 10000) / 10000

      }else{
        eurPrice = Math.floor((eurPrice) * 100) / 100
      }
      
      console.log("EUR Price = €" + eurPrice);

      msg.reply("€" + eurPrice);

      })
      .catch(error => {
        console.log("Error getting conversion rates");
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
    if (msg.content.toLowerCase() === "best girl") {
      msg.reply('https://cdn.myanimelist.net/images/characters/15/437486.jpg');
    }
  })
    

  client.on("messageCreate", msg => {
    if (msg.content.toLowerCase() === "!bored") {
     
    // Bored api has no ssl certificate
  
    }
  })
 
  client.on("messageCreate", msg => {
    if (msg.content === "!go") {
      
    client.off;

    }
  })
    

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

  return USDprice;

}

client.login(DiscordApi);

