var express = require('express'),
  router = express.Router(),
  User = require('../../models/user'),
  bodyParser = require('body-parser');

router.get('/', function(req, res){

  User.find({}, function(err,users){
    if(err){
      return res.json({'success':false, 'error': err});
    }
    return res.json({'success':true, 'users': users});
  });

});
//5a564a7cbc823514c7973bb6

router.get('/view/:userId', function(req, res){
  var userId = req.params.userId;
  User.find({'_id':userId}, function(err, user){
    if(err){
      return res.json({'success':false, 'error': err});
    }
    return res.json({'success':true, 'user': user});
  });
});

router.post('/create', function(req, res) {

  console.log(req.body);

  User.create(new User({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }), function(err, user){
    if(err){
      return res.json({success: false, user: req.body, errors: err});
    }

    return res.json({success: true, user: user});
  });

});

router.post('/edit', function(req, res){
  User.findOne({}, function(err, user){

    if(err){
      return res.json({success: false, error: err});
    }

    if(user) {
      let data = req.body;
      user.username = data.username;
      user.email = data.email;
      user.first_name = data.first_name;
      user.last_name = data.last_name;

      user.save(function(err){

        if(err){
          return res.json({success: false, error: err});
        }else{
          return res.json({success: true, user:user});
        }

      });
    }

  });
});

router.get('/delete/:userId', function(req, res){

  var userId = req.params.userId;
  User.remove({'_id':userId}, function(err, removed){
    if(err){
      return res.json({success: false, error: err});
    }

    return res.json({success: true, status: removed});

  });
});

module.exports = router;
