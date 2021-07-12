var bodyParser = require('body-parser')
var path = require('path');
const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const hamlet = require('helmet')
const hpp = require('hpp')
const mongoSanitize = require('express-mongo-sanitize')
const morgan = require('morgan');
const xss = require('xss-clean')
const productsRoutes =require(path.join(__dirname,'./routes/products'))
const authRoutes = require(path.join(__dirname,'./routes/auth'))
const adminRoutes = require(path.join(__dirname,'./routes/admin'))

const cardRoutes = require(path.join(__dirname,'./routes/card'))
const categoryRoutes = require(path.join(__dirname,'./routes/category'))
const userRoutes = require(path.join(__dirname,'./routes/user'))
const ordersRoutes = require(path.join(__dirname,'./routes/orders'))
var MongoDBStore = require('connect-mongodb-session')(session)
const cookieParser = require('cookie-parser')
const User = require(path.join(__dirname,'./models/user'))
const MONGODB_URI ='mongodb+srv://ammarlee:tonightwewilldoit@cluster0.j47ye.mongodb.net/vueproject'; 
const stripe = require('stripe')('sk_test_51HW8XsFcp3bB6NpnSJmsJgGkxC9zyhQxphOeKnPZMvBFrxmhrjsdCTTkY3JY3PPxgkhX3ybehnzPUJMyeJFo4tOX00YXDpMXdU');
var app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json(({ type: 'application/*+json', inflate: false })));
// app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin' , '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Auzhorization')
    next()
})
let cors = require('cors')
app.use(hamlet())
app.use(morgan('dev'))
const currentUrl = "http://localhost:8080"

app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cors({
  //  origin:['https://full-meven-stack.herokuapp.com/'],
  origin:[currentUrl],
    methods:['GET','POST'],
    credentials: true ,// enable set cookie
    exposedHeaders: ['set-cookie']
    
}))
// SAVE THE SESSION IN THE DATABASE 
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'mySessions'
});
    app.use(session({
       secret: 'This is a secret',
       name:'my test',
    cookie: {
      secure:false,
        maxAge: 30000  *60 * 60 * 24 * 7 // 1 week
      },
      store: store,
      resave: false,
      saveUninitialized: false
    }))
app.use(require('connect-livereload')())
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use((req,res,next)=>{
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
})

app.post('/checkPayment',async(req, res, next)=>{
  try {
    const session =await stripe.checkout.sessions.retrieve(req.body.id)
    res.status(200).json(session)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error})
  }
})
// work with strip
app.post('/create-session', async (req, res) => {
  const total = req.body
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'testing checkout with stripe',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: total.total,
          },
          quantity: req.body.quantity,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:8080/{CHECKOUT_SESSION_ID}',
      // success_url: `${currentUrl}/success?id=${CHECKOUT_SESSION_ID}`,
      cancel_url: `${currentUrl}`,
    });
    console.log(session);
    
    res.json({ id: session.id });
    
  } catch (error) {
    console.log(error);
    res.status(400).json(error)
  }
});
//  finished work with strip
app.use(categoryRoutes)
app.use(productsRoutes)
app.use(adminRoutes)
app.use(authRoutes)
app.use(cardRoutes)
app.use(userRoutes)
app.use(ordersRoutes)

const socket = require('./socket')
const port =process.env.PORT || 3000

// if(process.env.NODE_ENV ==="production"){
//   app.use(express.static(__dirname +"/dist/"))
//   app.get(/.*/,(req,res)=>{
//     res.sendFile(__dirname + '/dist/index.html' )
//   })
// }
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const server = app.listen(port);
    const io = require('./socket').init(server)
   io.on('connection',socket=>{
     console.log('connected to ios' ,socket.id);
   })
})
  .catch(err => {
    console.log(err);
  });
 