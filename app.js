var express=require('express');
var bodyParser=require('body-parser');
var app=express();
var mysql=require('mysql');

var port=process.env.PORT||3003;

var urlencodedParser=bodyParser.urlencoded({extended:false});

var jsonParser=bodyParser.json();

app.use('/css',express.static(__dirname+'/PublicOrStaticFiles'));//middle ware

app.set('view engine','ejs');//template engine


app.get('/view',function(req,res){
   res.render('index');
});


app.get('/person/:id',function(req,res)
{
    res.render('person',{ID: req.params.id});
});

app.get('/patient/:token',function(req,res){
     res.render('patient',{Token: req.params.token, QueryParam: req.query.qstr});
});

app.get('/style',function(req,res){
    res.send('<html><head><link href=css/style.css type=text/css rel=stylesheet/></head><body><h1>Hello Boss!!!</h1></body></html>');
});


app.get('/json',function(req,res){
    res.json('{firtsname:"Jayakar", lastname:"Victor"}');
});

app.post('/patient',urlencodedParser, function(req,res){
     res.send('Thank you!!!'+req.body.firstname);
     console.log(req.body.firstname);
     console.log(req.body.lastname);
});

app.post('/employeejson',jsonParser, function(req,res){

    res.send("Thank you for the json Data");
    console.log(req.body.firstname);
    console.log(req.body.lastname);

})

/*app.get('/person/:id',function(req,res){
        res.send('<html><head></head><body><h1>Person Id: '+req.params.id+'</h1></body></html>');
});*/


//database
app.use('/',function(req,res,next){
    console.log('Request url:'+req.url);

    var con=mysql.createConnection({
         host:"localhost",
         user:"root",
         password:"Bala@100",
         database:"nodejsdemo"
    });

    con.query('select * from nodejsdemotable', function(err,rows)
    {
        if(err) throw err;
        console.log(rows);
    });
    next();
});




app.listen(port);