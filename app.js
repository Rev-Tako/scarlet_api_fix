const express = require('express')
const app = express()
const fetcher = require('./fetcher')
const React = require('react')
const axios = require("axios")
const cors = require('cors')
const fs = require('fs');


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
                updated: 21062023_1418,
                API: 'ONLINE',
                SCARLET: returned.body.scarlet,
                USER: 'This domain only accepts posts from netlify front end',
                ERRORS: returned.body.ermsg,
            })
        } catch (err){
            res.json({
                updated: 21062023_1418,
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
          appendToStorage('Conversation', req.body + ': ' + returned.body.scarlet + ',')
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
              user_input: req.body,
              SCARLET_output: 'no message to return',
              msg: '',
              ermsg: err.message//'Error: disconnect between API and fetcher'
          })
      }
})
app.get(
    '/save',
    cors(),
    function (req, res) {
        const content = localStorage.getItem('Conversation')
        const fileDate = Date.now()
        fs.writeFile('conversation'+fileDate+'.txt', content, err => {
            if (err) {
                res.json({
                    headers: {
                        'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
                    },
                    data: err.message,
                });
            } else {
                localStorage.clear()
                res.json({
                    headers: {
                        'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
                    },
                    data: 'Conversation saved',
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