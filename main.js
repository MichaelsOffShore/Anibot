require("dotenv").config();
const CoinmarketcapAPI = process.env.CMC;
const DiscordApi = process.env.DISCORD;
const CurrencyApi = process.env.CURRENCY;
const discord = require("discord.js");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const imagesDir = 'Images';
let cwd = process.cwd();
const OS = process.platform;

if(OS.indexOf("linux") != -1){
cwd+="/Images/";
}else{
cwd+="\\Images\\";
}

const schedule = require('node-schedule');
const client = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]});

client.on("ready", () => {
    console.log("Anibot is here, LETS GO!!");
  
const job = schedule.scheduleJob('*/5 * * * *', function(){
  
  let name = "";
   fs.readdir(
    path.resolve(__dirname, imagesDir),
    (err, files) => {
  
      if (err) throw err;
      name = files[getRandomInt(files.length)];
      console.log("Attachment: " + cwd+name);
      console.log("Name: " + name);
      client.channels.cache.get('1011601421285724220').
      send({
        files: [{
          attachment: cwd+name,
          name: name,
          description: 'None'
        }]
      })
        .then()
        .catch(console.error);
    }
  );
});
  })
  
  // Cryptocurrency Prices Functionality
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
      }
    }
  })
   
   client.on("messageCreate", msg => {
    if (msg.content.toLowerCase() === "!randomphoto") {

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
        }
      );
    }
})
    
    
  client.on("messageCreate", msg => {
    if (msg.content === "!go") {
    client.off;
    }
  })

  client.on("messageCreate", msg => {
    if (msg.content === "botd") {
    
      axios.get("https://bobsburgers-api.herokuapp.com/burgerOfTheDay/")
      .then(allBOTD => {
        let numOfBOTD = allBOTD.data.length;

        axios.get("https://bobsburgers-api.herokuapp.com/burgerOfTheDay/" + getRandomInt(numOfBOTD))
        .then(oneBOTD => {
          let botd = oneBOTD.data;
          let name = botd.name;
          let price = botd.price;
          msg.reply("-Burger of The Day-\n"+name+"\n"+price);
  
           })
        .catch((error) => {
            console.log('error ' + error);
         });
         })
      .catch((error) => {
          console.log('error ' + error);
       });
  }
  })
  // Get a random number
function getRandomInt(max) {
  let randNum = Math.floor(Math.random() * max);
  
  return randNum;
}

//Cryptocurrency Helper Function
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
