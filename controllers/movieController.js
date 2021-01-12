class MovieController{
  constructor(movieService){
    this.movieService = movieService;
  };

  //Get de las series y películas
  async getMovies(req, res){
    const { page } = req.query;
    let offset = 0;
    let limit = 10;

    if(page){
      try{
        offset = 3 * (page - 1);
        const movie = await this.movieService.getMovies(offset, limit);
        res.status(200).json(movie);
      }catch(e){
        console.log(e);
        res.status(500).send('Error receiving');
      };
    }else{
      try{
        const movie = await this.movieService.getMovies();
        res.status(200).json(movie);
      }catch(e){
        console.log(e);
        res.status(500).send('Error receiving');
      };
    };
  };

  //Get de series y películas por id
  async getMoviesId(req, res){
    const { id } = req.params;

    try{
      const movie = await this.movieService.getMoviesId(id);
      res.status(200).json(movie);
    }catch(e){
      console.log(e);
      res.status(500).send('Error receiving');
    };
  };

  //Post de series y películas
  async postMovies(req, res){
    const { name, category, type} = req.body;
    const { filename } = req.file;

    if(name && category && filename && type){
      const movie = {
        name: name,
        category: category,
        image: filename,
        type: type,
        error: false
      };

      try{
        await this.movieService.postMovies(movie);
        res.status(200).send(`The movie or serie ${name} was added successfully`);
      }catch(e){
        console.log(e);
        res.status(500).send('Creation failed');
      };
    }else{
      res.status(400).send('Information is missing');
    };
  };

  //Put de series y películas por id
  async putMovies(req, res){
    const { id } = req.params;
    const { name, category, type } = req.body;
    const { filename } = req.file;

    if(name && category && filename && type){
      const movie = {
        name: name,
        category: category,
        image: filename,
        type: type,
        error: false
      };

      try{
        await this.movieService.putMovies(id, movie);
        res.status(200).send(`The serie or movie ${name} was successfully modified`);
      }catch(e){
        console.log(e);
        res.status(500).send('Modification error');
      };
    }else{
      res.status(400).send('Information is missing');
    };
  };

  //Delete de series y películas por id
  async deleteMovies(req, res){
    const { id } = req.params;
   
    try{
      await this.movieService.deleteMovies(id);
      res.status(200).send('The serie o movie was deleted succesfully');
    }catch(e){
      console.log(e);
      res.status(500).send('Deleting error');
    };
  };
};

module.exports = MovieController;