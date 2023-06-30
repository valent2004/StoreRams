const mongoose = require('mongoose');
require('dotenv/config');
require('./RAM_products');

mongoose.connect(
    'mongodb+srv://valentyn2004pro:Valik2OO4@cluster0.ubpqdy9.mongodb.net/',
    {useNewUrlParser: true},).then(() => console.log("MongoDB connection succeeded..."))
    .catch((err) => {console.log("Error in DB connection: ", err )});




//     (err) => {
//         if (!err) {console.log("MongoDB connection succeeded...")}
//         else {console.log("Error in DB connection: ", err )}
// }