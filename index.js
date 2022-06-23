const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then((res) => {
    console.log(data)
   return Recipe.create({
    title: "Pasta with pesto",
    level: "Amateur Chef",
    ingredients: [
      "50 g of your favorite pasta",
      "5 tablespoons olive oil",
      "10 almonds",
      "60 g basil",
      "15 g cheese",
      "salt to taste",
    ],
    cuisine: "Italian",
    dishType: "main_course",
    image: "descarga.jpg",
    duration: 45,
    creator: "Belén Álvarez",
    created: Date.now(),
      
    })
  })
  .then((res) => {
    
    return Recipe.insertMany(data);

  })
  .then((response) => {
    console.log(response);

    // actualizar
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" }, // query
      { duration: 100 }, //valores nuevos
      { new: true },
    );
  })
  .then((response) => {
  
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((response) => {
   console.log("Elemento borrado")
    return mongoose.connection.close(() => {
      console.log("conexión cerrada");
    });
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

