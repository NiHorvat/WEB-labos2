const cookieParser = require('cookie-parser')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const { 
    v4: uuidv4,
} = require('uuid');
const getCategoryItems = require('../data/data-handler').getCategoryItems

router.use(express.json())
router.use(cookieParser())
router.use(bodyParser.urlencoded({ extended: true }));

const userID = uuidv4();
//cart neznam je li ovo session specific???????
//o well... if it works hehe
let cart = [];


router.get('/', (req,res) => {

    res.render('home', {sessionID : req.sessionID});
    if(!req.session.user)
        req.session.user = userID; //znaci dok modificiramo taj objekt onda se on nece promijeniti


})

//add an item to cart
//POST REQUEST
router.post('/getProducts/:id',(req,res) => {

    const id = req.body.id;
    
    //console.log(`sessionID : ${req.sessionID}`)
    //console.log(`id : ${id}`);

    const found = cart.find((element) =>{
        if(element.id === id) return element;
    })
    if(!found){
        cart.push({id : id, count : 0})

    }else{
        found.count++;
    }

    console.log(cart);
    
    res.json({
        success : true
    })
    
})


router.get('/categories/:categoryName', (req,res) => {
    console.log('-----------------------------------');
    console.log(req.session.id);
    console.log(req.session);
    console.log('-----------------------------------');

    const products = getCategoryItems(req.params.categoryName);


    res.json({products : products,cart : cart})
})


module.exports = {homerouter : router, cart : cart}