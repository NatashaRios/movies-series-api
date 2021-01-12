const User = require('./../models/userModel');

class UserService{

  //Get de usuarios
  getUsers(){
    const query = User.find();
    return query;
  };

  //Get de usuarios por id
  getUsersId(id){
    const query = User.findOne({_id: id}).exec();
    return query;
  };

  //Post de usuarios
  postUsers(user){
    const newUser = new User(user);
    return newUser.save();
  };

  //Put de usuarios por id
  putUsers(id, user){
    const query = User.findOneAndUpdate({_id: id}, user).exec();
    return query;
  };

  //Delete de usuarios por id
  deleteUsers(id){
    const query = User.findByIdAndDelete({_id: id}).exec();
    return query;
  };
};

module.exports = UserService;