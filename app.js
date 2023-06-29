const express = require('express')
const app = express()
const fetcher = require('./fetcher')
const React = require('react')
const axios = require("axios")
const cors = require('cors')
const fs = require('fs');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

app.use(express.json())

app.use(cors({
    origin: 'https://scarletwebdevtest.netlify.app',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    'access-control-allow-credentials': true,
    'access-control-allow-methods': 'GET, POST',
    'access-control-allow-origin': '*',
}))

app.get(
    '/',
    cors(),
    async function (req, res) {
        try {
            const fetched = fetcher.Doget()
            let returned = await fetched;
            res.json({
                updated: 29062023_1633,
                API: 'ONLINE',
                SCARLET: returned.body.scarlet,
                USER: 'This domain only accepts posts from netlify front end',
                ERRORS: returned.body.ermsg,
            })
        } catch (err){
            res.json({
                updated: 29062023_1633,
                API: 'ONLINE',
                SCARLET: 'CHECK FAILED',
                USER: 'This domain only accepts posts from netlify front end',
                ERRORS: err.message,
            })
        }
    }
    )

app.post(
    '/',
    cors(),
    async function (req,res){
      try {
          const fetched = fetcher.Handler(req.body);
          let returned = await fetched;
          processForSaving(req.body, returned.body.scarlet)
          res.json({
                headers: {
                    'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
                },
                body: {
                    user_input: req.body,
                    SCARLET_output: returned.body.scarlet,//returned.body.scarlet,//returned.body.scarlet,
                    msg: '',
                    ermsg: returned.ermsg
                }
            })
      } catch (err){
          res.json({
              headers: {
                  'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
              },
              body: {
                  user_input: req.body,
                  SCARLET_output: [{recipient_id: "user", text: 'no message to return: ' + err.message}],
                  msg: '',
                  ermsg: err.message//'Error: disconnect between API and fetcher'
              },
          })
      }
})
app.get(
    '/save',
    cors(),
    function (req, res) {
        const content = localStorage.getItem('Conversation')
        const fileDate = Date.now()
        fs.writeFile('outputs/conversation'+fileDate+'.txt', content, err => {
            if (err) {
                res.json({
                    headers: {
                        'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
                    },
                    body: {
                        SCARLET_output: [{recipient_id: "user", text: err.message,}]
                    }
                });
            } else {
                localStorage.clear()
                res.json({
                    headers: {
                        'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
                    },
                    body: {
                        SCARLET_output: [{recipient_id: "user", text: 'Conversation saved'}],
                    }
                });
            }

        });
    }
)
app.post(
    '/rating',
    cors(),
    function (req, res) {

    }
)


app.listen(3000, function () {
  console.log('SCARLET API listening on port 3000')
})

function appendToStorage(name, data){
    var old = localStorage.getItem(name);
    if(old === null) old = "";
    localStorage.setItem(name, old + data);
}

function processForSaving(user_input, scarlet_outputs) {
    let scarlet_array = []
    let user_utterance = user_input.body
    for (const inner of scarlet_outputs)
    {
        scarlet_array.push(inner.text);
    }

    appendToStorage('Conversation', user_utterance + ': ' + scarlet_array + ',')
}

/*




fetch("http://tehr10.cis.strath.ac.uk:5055/")
            .then(function(response){
                console.log(response.status);
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then((response) => {
                return {
                    statusCode: response.status,
                    body: {
                        scarlet: 'OFFLINE',
                        ermsg: 'http request failed'
                    }
                }
                //setOutput(response);
            })
            .catch(err => {
                console.log(err.message)
                return {
                    statusCode: 200,
                    body: {
                        scarlet: 'OFFLINE',
                        ermsg: 'http request failed'
                    }
                }
            });


*/


// http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook       const [output, setOutput] = React.useState({})     React.useEffect(() => {  }, []);