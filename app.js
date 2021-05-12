
const express = require('express');

// for creating server
const app = express();

// for intract with endpoint 
const https = require('https');


// use it to parse body  cerliar we sre using body-parser package (depricated now)
app.use(express.urlencoded());


//  Get request to send index file
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html");

 })

//  Post request
 app.post('/',(req,res)=>{
     const city = req.body.city;
      const unit ='metric';
      const apiKey='0a038f3379b27d092ca99cf3fc3e9845';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    https.get(url, (response) => {
        response.on('data', (data) => {
            //we need to parse data because we get hexcode in response
            const responseData = JSON.parse(data);
            const temp = responseData.main.temp;
            const weather=responseData.weather[0].description;
            const icon = responseData.weather[0].icon;
            const imageUrl="https://api.openweathermap.org/img/wn/"+ icon + "@2x.png";
            res.write(`<p>The weather is ${weather}</p>`)
            res.write(`<h1>The temperature of London is  ${temp} degrees celcius</h1>`);
            res.write("<img src="+ imageUrl + ">")
            res.send();
        })
    })
 })
 //server will listen on port 3000 when request is fired from browswser
app.listen(3000, () => {
    console.log('listening from 3000')
})