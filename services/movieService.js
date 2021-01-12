const Movie = require('./../models/movieModel');

class MovieService{
  
  //Get de las series y películas
  getMovies(page, limit){
    const query = Movie.find().skip(page).limit(limit).exec();
    return query;
  };

  //Get de series y películas por id
  getMoviesId(id){
    const query = Movie.findOne({_id: id}).exec();
    return query;
  };

  //Post de series y películas
  postMovies(movie){
    const newMovie = new Movie(movie);
    return newMovie.save();
  };

  //Put de series y películas por id
  putMovies(id, movie){
    const query = Movie.findOneAndUpdate({_id: id}, movie).exec();
    return query;
  };

  //Delete de series y películas por id
  deleteMovies(id){
    const query = Movie.deleteOne({_id: id}).exec();
    return query;
  }
};

module.exports = MovieService;
