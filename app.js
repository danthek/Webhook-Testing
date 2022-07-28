const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 80;                  //Save the port number where your server will be listening

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/users', function(req, res){ // this is only to see how to send an html file as response
  return res.sendFile('users.html',{root: __dirname});
});



/////////////////////////// WEBHOOK TESTING ////////////////////////////////

app.post('/incident',jsonParser, function(req, res){
  try {
/*     console.log(req); // if we put req it shows  the whole post info */
    console.log(req.body); // if we put req.body it shows only the data in the  body and not the whole post info
    console.log(req.headers); // if we put req.headers it shows only the data in the  headers and not the whole post info
    console.log(req.text); // if we put req.text it shows only the data in the  textand not the whole post info
    return res.status(200).send('ok');
  } catch (error) {
    return res.status(400).send('Error')
  }
 
});

////////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`); 
});


//Remember to use a tunnel to make the local host public in order to test the webhook , ngrok can be used
//https://ngrok.com/
//ngrok.exe
//ngrok http 80
//http://ipadress/inspect/http . use this to inspect the posts and gets, just change the ip address