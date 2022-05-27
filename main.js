require("dotenv").config();
const Discord = require("discord.js");


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




const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});


client.on("ready", () => {
    console.log("Anibot is here, LETS GO!!");
  })
  

  client.on("message", msg => {
    if (msg.content.toLowerCase() === "ping") {
      msg.reply("pong");
    }
  })
  
  client.on("message", msg => {




    let msgArray = msg.content.split(" ");
    if(msgArray.length > 1){
      
      if (msgArray[0].toLowerCase() === "!price") {
      let ticker = msgArray[1].toUpperCase();
        const request = require('request-promise');
      request('https://freecurrencyapi.net/api/v2/latest?apikey='+CurrencyApi+'&base_currency=USD')
      .then(response => {
       
        let usd = (JSON.parse(response).data.EUR);
    
        //let ticker = "VRA";
        const axios = require('axios');
        
        let response2 = null;
        new Promise(async (resolve, reject) => {
          try {
            response2 = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=' + ticker, {
              headers: {
                'X-CMC_PRO_API_KEY': CoinmarketcapAPI,
              },
            });
          } catch(ex) {
            response2 = null;
            console.log(ex);
            reject(ex);
          }
          if (response2) {
            const json = response2.data;
            
            
            let price = (usd * (json.data[ticker].quote.USD.price)).toString();
            console.log(price);
            msg.reply("€" + price);
          
          }
        });
        
    })
      .catch(error => {
      console.log(error)
      })
    


        // End of discord crypto Function //////////////////
      }
  
    }
  
  })
  



  client.on("message", msg => {
    if (msg.content.toLowerCase() === "best girl") {
      msg.reply('https://cdn.myanimelist.net/images/characters/15/437486.jpg');
    }
  })
    

  client.on("message", msg => {
    if (msg.content.toLowerCase() === "!bored") {
     

      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

      var Http = new XMLHttpRequest();
      const url='https://www.boredapi.com/api/activity';
      Http.open("GET", url);
      Http.send();
      
      Http.onreadystatechange = function(){
          
          if(this.readyState == 4 && this.status == 200){
              let activity = Http.responseText.split("\"");
              console.log(activity[3]);
              var channel = client.channels.cache.get('939465174224621591');
              channel.send(String(activity[3]));

          }
      }
    }
  })
 
  client.on("message", msg => {
    if (msg.content === "!go") {
      
    client.off;

    }
  })
    

client.login(DiscordApi);

