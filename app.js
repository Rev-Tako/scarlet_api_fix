const express = require('express')
const app = express()
const fetcher = require('./fetcher')
const React = require('react')
const axios = require("axios")
const cors = require('cors')

app.use(cors({
    origin: 'https://scarletwebdevtest.netlify.app'
}));
app.get(
    '/',
    async function (req, res) {
        try {
            const fetched = fetcher.Doget()
            let returned = await fetched;
            res.json({
                API: 'ONLINE',
                SCARLET: returned.body.scarlet,
                USER: 'This domain only accepts posts from netlify front end',
                ERRORS: returned.body.ermsg,
            })
        } catch (err){
            res.json({
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
    async function (req,res){
      try {
          const fetched = fetcher.Handler(req.body)
          let returned = await fetched
            res.json({
                user_input: req.body,
                SCARLET_output: returned.body.scarlet,
                msg: '',
                ermsg: fetched.ermsg
            })
      } catch (err){
          res.json({
              user_input: req.body,
              msg: '',
              ermsg: err.message//'Error: disconnect between API and fetcher'
          })
      }
})


app.listen(3000, function () {
  console.log('SCARLET API listening on port 3000')
})

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