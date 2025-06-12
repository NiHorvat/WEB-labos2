const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')



const app = express()
const port = 3000

//24 hours
const cookieMaxAge = 60000 * 60 * 24 


app.use(express.json())
app.use(cookieParser())
app.use(
    session({
        secret: 'secret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: cookieMaxAge,
        }
    })
)
app.set('view engine', 'ejs')
app.use(express.static('public/'));



//at once redirect the page to the /home
// "/" will not be used for anything
app.get('/',(req, res) =>{
    console.log('-----------------------------------');
    //kada modificiram session objekt necemo stvarati nove sesije
    req.session.visited = true; //dodajemo dinamicki atribut na session objekt
    console.log(req.session);
    console.log('sessionID : ', req.sessionID);
    res.redirect('/home');
    console.log('-----------------------------------');
})


const homeRouter = require('./routes/home.routes').homerouter;
app.use('/home', homeRouter);
const cartRouter = require('./routes/cart.routes');
app.use('/cart', cartRouter);



app.listen(port || 3000, () => {

    console.log(`App listening on port ${port}`)

})