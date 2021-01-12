function checkAdmin (req, res, next){
  if(req.user){
    if(req.user.isAdmin){
      console.log('The user is admin');
      next();
    }else{
      console.log('The user is not admin');
      res.status(403).send('You are not admin!!');
    };
  }else{
    res.status(401).send('Unauthorized');
  };
};

module.exports = checkAdmin;