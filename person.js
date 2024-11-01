const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log('connection open');
    })
    .catch(err => {
        console.log('oh no error!');
        console.log(err);
    });
    
    const personSchema = new mongoose.Schema({
        first: String,
        last: String
    })

    personSchema.virtual('fullName').get(function () {
        return `${this.first} ${this.last}`
    })

    personSchema.pre('save', async function (){
        console.log('about to save') 
        
    })
        // personSchema.pre('save', function (next){
    //     console.log('about to save') 
    //     next()
    // })

    // or using an async function?
    // const tammy = new Person({first: 'Tammy', last: 'Chow'})
    // tammy.fullName
    


    personSchema.post('save', async function () {
        console.log('Saved')
    })


    const Person = mongoose.model('Person', personSchema)

