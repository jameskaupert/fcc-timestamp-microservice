// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/timestamp", function(req, res) {
  const dateString = new Date()
  res.json({
    unix: +(dateString),
    utc: dateString.toUTCString()
  })
})

app.get("/api/timestamp/:date_string", function (req, res) {
  const date = req.params.date_string
  
  let dateString
  if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    dateString = new Date(date)
  }
  else if (date.match(/^\d+$/)) {
    const ts = Number(date)
    dateString = new Date(ts)
  }
  
  if (dateString) {
    res.json({
      unix: +(dateString),
      utc: dateString.toUTCString(),
    })
  }  
  else {
    res.json({
      unix: null,
      utc: 'Invalid Date'
    })
  }
  

  
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});