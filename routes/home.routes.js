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

    res.render('home', {testText : req.sessionID});
    req.session.user = userID; //znaci dok modificiramo taj objekt onda se on nece promijeniti
    if(!req.session.cart)
        req.session.cart = [];
})


/*
router.get('/:categoryID', (req,res) => {
    console.log('-----------------------------------');
    console.log(req.session.id);
    console.log(req.session);
    console.log('-----------------------------------');
    res.render('category', {'sessionID' : req.session.id})
})
*/ 


//add an item to cart
router.post('/getProducts/:id',(req,res) => {

    const id = req.body.id;
    console.log(`id : ${id}`);

    const found = req.session.cart.find((element) =>{
        if(element.id === id) return element;
    })
    if(!found){
        req.session.cart.push({id : id, count : 0})

    }else{
        found.count++;
    }

    console.log(req.session.cart);
    res.redirect('/home');

})


module.exports = router