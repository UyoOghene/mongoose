

const mongoose = require('mongoose');

main().catch(err => console.log(err,'errorrrrrr'));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/moviesApp');
  console.log('connected')
}

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model('Movie',movieSchema)

const Harrypotter = new Movie({ title: 'Harrypotter', year: 2045, score: 8.4, rating: 'fourty' });
