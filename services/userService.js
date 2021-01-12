const User = require('./../models/userModel');
const bcrypt = require('bcrypt');

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

  async postUsers(user){
    try{
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;

      const newUser = new User(user);
      return newUser.save();
    }catch(e){
      console.log(e);
    };
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

  //Get para el passport
  getByName(name){
    const query = User.findOne({ name }).exec();
    return query;
  };
};

module.exports = UserService;