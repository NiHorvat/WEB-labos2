const cookieParser = require('cookie-parser')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const cart = require('./home.routes').cart;
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
    
    console.log(cart);

    //res.redirect('/getAll');

})

//tu cu poslati custom objekt na frontend 
//koji sadrzi listu svih itema u cartu
//ima id,quantity
router.get("/getAll",(req,res)=>{

    res.json(cart);

})

/*
/cart/add/:id 
/cart/remove/:id 
/cart/getAll 
*/

router.post("/add/:id",(req,res)=>{

    const id = req.body.id;
    
    //console.log(`sessionID : ${req.sessionID}`)
    //console.log(`id : ${id}`);

    let found = cart.find((element) =>{
        if(element.id === id) return element;
    })
    if(!found){
        cart.push({id : id, count : 0})

    }else{
        found.count++;
    }

    console.log(cart);
    
    res.json({
        success : true,
        quantity : found.count
    })


})


router.post("/remove/:id",(req,res)=>{

    const id = req.body.id;
    
    //console.log(`sessionID : ${req.sessionID}`)
    //console.log(`id : ${id}`);

    let found = cart.find((element) =>{
        if(element.id === id) return element;
    })
    if(!found){
        cart.push({id : id, count : 0})

    }else{
        found.count--
    }

    console.log(cart);
    
    res.json({
        success : true,
        quantity : found.count
    })
})




module.exports = router