const mongoose = require('mongoose');
const express = require('express');
var router = express.Router();

//Models
const Director = require('../models/Director');

router.get('/', (req,res) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true //eşleşmeyenleri de getir
      }
    },
    {
      $group: {
        _id: {
          _id: '$id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }

  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
})

router.get('/:director_id', (req,res) => {
  const promise = Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true //eşleşmeyenleri de getir
      }
    },
    {
      $group: {
        _id: {
          _id: '$id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }

  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
})

router.post('/', (req, res) => {
  const director = new Director(req.body);
  const promise = director.save();
  promise.then( (data)=> {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

module.exports = router;
