const express = require('express')
const app = express()
const fetcher = require('./fetcher')
const React = require('react')
const axios = require("axios")
app.get(
    '/',
    function (req, res) {
        try {
            const fetched = Doget()
            console.log(fetched)
            res.json({
                API: 'ONLINE',
                SCARLET: fetched.scarlet,
                USER: 'This domain only accepts posts from netlify front end',
                ERRORS: fetched.ermsg,
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
    function (req,res){
      try {
          const fetched = Doget(req.body)
          if (fetched.scarlet && !(fetched.scarlet.length === 0)) {
              const out = {
                  user_input: req.body,
                  SCARLET_output: fetched.body.scarlet,
                  msg: '',
                  ermsg: fetched.ermsg
              }
              res.json(out)
          } else {
              const out = {
                  user_input: req.body,
                  msg: '',
                  ermsg: fetched.ermsg
              }
              res.json(out)
          }
      } catch (err){
          const out = {
              user_input: req.body,
              msg: '',
              ermsg: err.message//'Error: disconnect between API and fetcher'
          }
          res.json(out)
      }
})


app.listen(3000, function () {
  console.log('SCARLET API listening on port 3000')
})


async function Doget() {
    let URL = "http://tehr10.cis.strath.ac.uk:5055/"
    try {
        let response = await axios.get(URL);
        let to_return = await response.data;
        console.log(to_return);
        return {
            statusCode: 200,
            body: {
                scarlet: to_return,
                ermsg: 'http request succeeded'
            }
        }
    } catch (err) {
        console.log(err.message)
        return{
            statusCode: 200,
            body: {
                scarlet: 'OFFLINE',
                ermsg: 'http request failed'
            }
        }
    }
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