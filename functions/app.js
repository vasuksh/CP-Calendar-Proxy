const express = require('express');
const request = require('request');
const serverless = require('serverless-http')

const app = express();
const router = express.Router()

var today = new Date();
date =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1 < 10
    ? "0" + (today.getMonth() + 1)
    : today.getMonth() + 1) +
  "-" +
  (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
  "T" 

var key=process.env.NODE_APP_CLIST

const link1="https://clist.by/api/v2/contest/?username=vasuKsh&api_key="+key+"&limit=150&end__gt="+date+"00:00:00&order_by=start"
const link2="https://clist.by/api/v2/resource/?username=vasuKsh&api_key=" +key ;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/contestData', (req, res) => {
  request(
    { url: link1 },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error});
      }

      res.json(JSON.parse(body));
    }
  )
});

router.get('/resources', (req, res) => {
    request(
      { url: link2 },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error});
        }
        
        res.json(JSON.parse(body));
      }
    )
  });

  app.use('/.netlify/functions/app',router)

module.exports.handler = serverless(app)