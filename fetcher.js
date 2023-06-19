const axios = require("axios")
import React, { useState, useEffect } from 'react';

module.exports = {
    async handler(request) {
        let rasa_format = {
            "sender": "user",  // sender ID of the user sending the message
            "message": request
        }
        try {
            const response = axios({
                method: 'POST',
                url: 'http://tehr10.cis.strath.ac.uk:5055/', //webhooks/rest/webhook', //"http://localhost:5002/webhooks/rest/webhook",
                body: rasa_format,
            });
            return {
                statusCode: 200,
                body: {
                    scarlet: response.text,
                    ermsg: 'Success'
                }
            }
        } catch (err) {
            console.log(err) // output to netlify function log
            return {
                statusCode: 200,
                body: {
                    scarlet: 'Response failed',
                    ermsg: 'Error: disconnect between fetcher and SCARLET'
                },
            }
        }
    },

    get() {
        useEffect(() => {
            axios
                .get("http://tehr10.cis.strath.ac.uk:5055/")
                .then((response) => {
                    if (response.status === 200) {
                        console.log('connection success')
                        return {
                            statusCode: response.status,
                            body: {
                                scarlet: 'ONLINE',
                                ermsg: 'http request succeeded'
                            }
                        }
                    } else {
                        console.log('connection failure')
                        return {
                            statusCode: response.status,
                            body: {
                                scarlet: 'ONLINE',
                                ermsg: 'http request succeeded'
                            }
                        }

                    }
                });
        }, [])
    },
}

            //
            // const response = axios({
            //     method: 'GET',
            //     url: "http://tehr10.cis.strath.ac.uk:5055/",
            // });


