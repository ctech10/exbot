var express = require('express');
var bodyParser = require('body-parser');
 
var app = express();
var port = process.env.PORT || 1337;
 
// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
 
// test route
app.get('/', function (req, res) { res.status(200).send('server is up and rinning'); });
 
app.listen(port, function () {
  console.log('Listening on port ' + port);
});

app.post('/smart', function (req, res, next) {
    var userName = req.body.user_name;
    var userText = req.body.text;
    var output;

    if (userText.includes("why slack")) {
        output = "1. knowledge management: uploading and searching of files (+ connection to external sources), code snippets, videos and more \n" +
      "2. communication management: multiple channeles / workspaces, external messengers integration";
    } else {

      if(userText.includes(":")) {
           output = userText.replace("@smart:", "");
        } else {
            output = userText.replace("@smart", "");
        }
         
      }

      var botPayload = {
        text: output
      };

  // Loop otherwise..
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});

