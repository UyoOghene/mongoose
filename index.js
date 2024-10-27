

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

// const Harrypotter = new Movie({ title: 'Harrypotter', year: 2045, score: 8.4, rating: 'fourty' });

// Movie.insertMany([
//   {title: 'Harrypotter', year: 2045, score: 8.4, rating: 'fourty'},
//   {title: 'GOT', year: 1945, score: 8.4, rating: 'fourty'},
//  { title: 'Princenme', year: 2025, score: 8.4, rating: 'fourty'},
//  { title: 'Cinderella', year: 2345, score: 8.4, rating: 'fourty'},
//  { title: 'swan princss', year: 1935, score: 8.4, rating: 'fourty'},
// ])
// .then(data =>{
//   console.log('it worked')
//   console.log(data)
// })

// in node
Movie.find({title : 'Princenme'}).then(data => console.log(data))
Movie.find({year : {$gte: 2000 }}).then (data => console.log(data))
Movie.find({year : {$lt: 2000 }}).then (data => console.log(data))
Movie.updateOne({title : 'Princenme'},{year : 1900}).then(res => console.log(res))
Movie.updateMany({title: {$in: ['swan princss', 'GOT']}}, {score: 33}).then(res => console.log(res))
Movie.findOneAndUpdate({title: 'GOT'}, {score: 400}, {new:true}).then(m =>console.log(m) )
Movie.deleteOne({ title: 'swan princss' }).then(msg => console.log(msg));
Movie.deleteMany({year : {$gt :2025}}).then(data => console.log(data))

// in mongosh
db.movies.find({title: {$in: ['Cinderella','GOT']}})
db.movies.find({})