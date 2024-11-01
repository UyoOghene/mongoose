// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/shopApp')
//     .then(() => {
//         console.log('connection open');
//     })
//     .catch(err => {
//         console.log('oh no error!');
//         console.log(err);
//     });
//     const productschema = new mongoose.Schema({
//         name: {
//             type: String,

//         },
//         price: {
//             type: Number
//         }
//     })

//     const product = mongoose.model('Product', productschema);
// const bike = new product({name: "mountain bike", price: 390})
// bike.save()
// .then(data => {
//     console.log('it worked')
//     console.log(data)
// })
// .catch(err => {
//     console.log(err)
// })

// db.products.find({})

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log('connection open');
    })
    .catch(err => {
        console.log('oh no error!');
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 20
    } ,
    price:{
        type: Number,
        required: false,
        min:[0, 'price must be positive']    
    },
    onSale :{
       type: Boolean,
       default: true

    },
    
    size: {
        type : String,
        enum: ['S', 'M', 'L']
    
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
});

productSchema.statics.fireSale = function (){
    return this.updateMany({}, {onSale: true, price: 0})
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save()
}

productSchema.methods.toggleOnsale = function (){
    this.onSale = !this.onSale;
   return this.save();
}

productSchema.methods.greet = function(){
    console.log('hellllooooooo')
    console.log(this.name)
}
// const p = new Product({ name: "glasses", price: 20, categories:['cycling','safety', 123]});



const Product = mongoose.model('Product', productSchema);

const findproduct = async () => {
    const foundProduct = await Product.findOne({name: 'Jersey'});
    console.log(foundProduct)
    await foundProduct.toggleOnsale();
    console.log(foundProduct)

    await foundProduct.addCategory('outdoors');

    console.log(foundProduct)


}
findproduct()

Product.fireSale().then(res => console.log(res))
// const bike = new Product({ name: "bike shoes", price: 10, categories:['cycling','safety', 123]});


// const bike = new Product({ name: "bike shoes", price: 10, categories:['cycling','safety', 123]});
// bike.save()
//     .then(data => {
//         console.log('it worked');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// const bike = new Product({ name: "Jersey", price: 20, size:'XS', categories:['cycling','safety', 123]});
// bike.save()
//     .then(data => {
//         console.log('it worked');
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// Product.findOneAndUpdate(
//     { name: "bike shoes" },
//     { price: -3333},
//     { new: true, runValidators: true }    
// )
// .then(data => {
//     console.log('Update successful');
//     console.log(data);
// })
// .catch(err => {
//     console.log('Error:', err);
// });

//     mongosh
// use shopApp               # Switch to the database where data is saved
// show collections           # Check that 'products' is listed
// db.products.find({})       # View all documents in the products collection
// Product.deleteOne({ name: "mountain bike" }).then(msg => console.log(msg));
