//nodemon untuk rerun otomatis server : npm install -g nodemon
// Module
var express     = require('express');
var app         = express();
var mysql       = require('mysql');
var connection  = require('express-myconnection');
var sifut       = require('./routes/sifut');
var engine      = require('ejs-locals');
var bodyParser  = require('body-parser');
var morgan      = require('morgan')

app.use(morgan('dev'));

//koneksi ke database mysql
app.use( connection(mysql, {
          host: 'localhost',
          user: 'root',
          password: '',
          port: 3306,
          database: 'prog_sifut'
        },'request') // request : membuat koneksi baru setiap permintaan, otomatis menutup ketika selesai
      );             // single : membuat koneksi tunggal, koneksi tidak pernah ditutup

// view engine setup
app.engine('ejs', engine); // untuk menjalankan ejs-locals
app.set('views',(__dirname + '/tampilan'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//router
app.get('/',sifut.user);
app.get('/admin',sifut.admin);
app.get('/sifut/lapang',sifut.lapang);
app.post('/sifut/lapang/tambah',sifut.tambah);

app.get('/sifut/lapang/edit/:id',sifut.form_edit);
app.post('/sifut/lapang/edit/:id',sifut.edit);

app.get('/sifut/lapang/hapus/:id',sifut.hapus);

//untuk asset
app.use(express.static(__dirname + '/assets'));

//server
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;


app.listen(port,ip function(){
  console.log('Server Run on  : ' + port);
});

//eror 404 page not found
app.use(function(req,res,fn){
  res.render('error_page', {
    status:404,
    url:req.url,
    error: 'Ops... Halaman Tidak Di Temukan. Maaf !'
  });
});

//error 500 internal server error
app.use(function(err, req, res, next){
  res.render('error_page', {
    status: err.status || 500,
    error: err
  });
});
