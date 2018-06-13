console.log('server.js is running');

const express =require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
});

app.use((req,res,next)=>{
    var now  = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log',log+'\n',(err)=>{
       if (err){
           console.log('Unable to append to server log');
       }
    });
   next();
});


// app.use((req,res,next)=>{
//     return res.render('maintenance.hbs');
//
// });


app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
   //res.send('Hello from express!');
    res.send({
        name:'ali',
        likes:['soccer',
                'coding']
    });
    //res.render('index.html');
});

app.get('/about',(req,res)=>{
   res.render('about.hbs',
       {pageTitle:'AliFattahi',
        currentYear:new Date().getFullYear()
       });
});
// app.get('/about',(req,res)=>{
//
//      res.send('About page');
// });

app.listen(port,()=>{
    console.log(`server is going up on port ${port}`);
});