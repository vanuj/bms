const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const BMS_GET_SEATS_URL = process.env.BMS_GET_SEATS_URL || 'https://jsonplaceholder.typicode.com/posts/1';

//Mock  data
const seatInfoMock = require('../mock/seatInfoMock');

/* GET seat info. 
  @params : tID, mID, showID
  returns list of seats
*/
router.get('/', async (req, res, next) => {
  const {
    tID,
    mID,
    showID,
  } = req.query;

  if(!tID || !mID || !showID){
    return res.status(400).send('Invalid Input.');
  }
  try {
    const { data } = await axios.get(BMS_GET_SEATS_URL, {
      params : {
        tID,
        mID,
        showID
      }
    });
    console.log('LOCAL_MOCK :',process.env.LOCAL_MOCK);
    if(process.env.LOCAL_MOCK == 'true') {
      res.send(seatInfoMock.seatInfoMock)
    }else {
      res.send(data)
    }
    
  }catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router;
