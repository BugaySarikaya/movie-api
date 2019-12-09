const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://movie_user:Ortak123456@bgycluster-si4yp.mongodb.net/movie-api', {useMongoClient: true})
    mongoose.connection.on('open', () => {
        console.log('mongoDB: Connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('mongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
}