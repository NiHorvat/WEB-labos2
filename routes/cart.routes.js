const cookieParser = require('cookie-parser')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const { 
    v4: uuidv4,
} = require('uuid');
router.use(express.json())
router.use(cookieParser())
router.use(bodyParser.urlencoded({ extended: true }));

const userID = uuidv4();

router.get('/', (req,res) => {

    res.render('cart', {sessionID : req.sessionID});
    if(!req.session.user)
        req.session.user = userID; //znaci dok modificiramo taj objekt onda se on nece promijeniti
    if(!req.session.cart)
        req.session.cart = [];
    
})

module.exports = router