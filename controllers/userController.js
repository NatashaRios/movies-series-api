class UserController{
  constructor(userService){
    this.userService = userService;
  };

  //Get de usuarios
  async getUsers(req, res){
    try{
      const user = await this.userService.getUsers();
      res.status(200).json(user);
    }catch(e){
      console.log(e);
      res.status(500).send('Error receiving');
    };
  };

  //Get de usuarios por id
  async getUsersId(req, res){
    const { id } = req.params;

    try{
      const user = await this.userService.getUsersId(id);
      res.status(200).json(user);
    }catch(e){
      console.log(e);
      res.status(500).send('Error receiving');
    };
  };

  //Post de usuarios
  async postUsers(req, res){
    const { body } = req;
    const name = body.name.toLowerCase();
    const { password } = body;

    if(body && name && password){
      try{
        const user = await this.userService.postUsers({...body, name});
        res.status(200).json(user);
      }catch(e){
        console.log(e);
        res.status(500).send('Creation failed');
      };
    }else{
      res.status(400).send('Information is missing');
    };
  };

  //Put de usuarios por id
  async putUsers(req, res){
    const { id } = req.params;
    const { name, password, isAdmin } = req.body;

    if(name && password && req.user){
      const user = {
        name: name,
        password: password,
        isAdmin: isAdmin
      };

      try{
        await this.userService.putUsers(id, user);
        res.status(200).send('The user was modified successfully');
      }catch(e){
        console.log(e);
        res.status(500).send('Modification error');
      };
    }else{
      !req.user
      ? res.status(401).send('Unauthorized')
      : res.status(400).send('Information is missing');
    };
  };

  //Delete de usuarios por id
  async deleteUsers(req, res){
    const { id } = req.params;

    if(req.user){
      try{
        await this.userService.deleteUsers(id);
        res.status(200).send('The user was deleted successfully');
      }catch(e){
        console.log(e);
        res.status(500).send('Deleting error')
      };
    }else{
      res.status(401).send('Unauthorized');
    };
  };
};

module.exports = UserController;