
exports.user = function(req, res) {
  // res.send('Haloo di page Sifut');
  res.render('lapang');
}

exports.admin = function(req, res) {

  req.getConnection(function(err,connect){
    connect.query('SELECT * FROM lapang',function(err,rows) {

      if (err) { console.log('error nya : %s',err); };

      res.render('admin',{page_title:"data lapang",data:rows});
    });
  })
}

//tampil lapang
exports.lapang = function(req,res) {
  req.getConnection(function(err,connect){
    connect.query('select * from lapang',function(err,rows){

      if (err) { console.log('error : %s',err); };

      res.render('lapang',{page_title:"Data Lapang",data:rows});
    });
  });
}

//tambah
exports.tambah = function(req, res) {
  var tangkep = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err, connect){
    var post = {
      id_lapang : tangkep.id,
      nama : tangkep.nama,
      aktif : tangkep.aktif
    };

    connect.query("insert into lapang set ? ",post,
      function(err,rows){
        if(err){
          console.log("Gagal input Mang, eror di %s",err);
        };

        res.redirect('/sifut/lapang');
      })

  });
}

//form_edit

exports.form_edit = function(req, res) {
  var idnya = req.params.id;
  req.getConnection(function (err,connect) {
    connect.query("select * from lapang where id_lapang = ? ",idnya,function(err,rows){
      if(err) {
        console.log('error di : %s',err);
      };
      res.render('form_edit',{page_title:"edit lapang",data:rows});
    })
  })
};

exports.edit = function (req, res) {
    var tangkep = JSON.parse(JSON.stringify(req.body));
    var idnya = req.params.id;

    req.getConnection(function (err,connect) {
      var post = {
        id_lapang : tangkep.id_lapang,
        nama : tangkep.nama,
        aktif : tangkep.aktif
      };

      connect.query("update lapang set ? where id_lapang = ?",[post,idnya],function(err,rows){
        if(err){
          console.log("gagal Update Gan, aya eror di : %s",err);
        };

        res.redirect('/sifut/lapang');
      })
    });
}

exports.hapus = function(req, res){
  var idnya = req.params.id;
  req.getConnection(function(err,connect){
    connect.query("delete from lapang where id_lapang = ?",idnya,function(err,rows){
      if(err){
        console.log("gagal delete mang, eror di : %s",err);
      };
      res.redirect('/sifut/lapang');
    })
  })
}
