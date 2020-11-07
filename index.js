const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');

//const logger = require('./middleware/logger')
const PORT = process.env.PORT||8080;

const logger = require('./middleware/logger')
///const members = require('./middleware/members')
//Handle Bar MiddleWare
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>res.render('index'))
app.use(express.static(path.join(__dirname,'tempPub')))

app.use(logger);

//Body Parser for MIddleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/saymembers',require('./routes/api/members'));



app.listen (PORT ,() => console.log(`Server Started on the port ${PORT}`))


