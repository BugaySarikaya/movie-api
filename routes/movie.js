var express = require('express');
var router = express.Router();

//Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
  const promise = Movie.find({});
  promise.then( (data)=> {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise.then((data) => {
    if(!data)
      next({message: 'The Movie was not found.', code: 99});
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/between/:start_year/:end_year', (req, res) => {
  const{ start_year, end_year } = req.params;
  const promise = Movie.find(
    {
      year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
    }
  );
  promise.then( (data)=> {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.post('/', function(req, res, next) {
  /*const {title, imdb_score, category, country, year} = req.body;
 
  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  }); */

  //üst kısmın alternatifi

  const movie = new Movie(req.body);

  /* movie.save((err,data) => {
    if(err)
      res.json(err);

    res.json(data)  
  }) */

  // Üst kısmın promiseli hali, amac daha temiz kod yazmak

  const promise = movie.save();
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    })
});

router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, 
    {new: true}); // new truenun mantığı responseda güncellenmiş datanın gelmesi
  promise.then((data) => {
    if(!data)
      next({message: 'The Movie was not found.', code: 99});
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((data) => {
    if(!data)
      next({message: 'The Movie was not found.', code: 99});
    res.json({ status: 1 });
  }).catch((err) => {
    res.json(err);
  })
});


module.exports = router;
