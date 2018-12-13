const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");
const dbtitle = "celebrity";
mongoose.connect(
  `mongodb://localhost/${dbtitle}`,
  { useNewUrlParser: true }
);

Celebrity.collection.drop();

const celebrities = [
  {
    name: "Bradley Cooper",
    occupation: "actor",
    catchPhrase: "i'm the best"
  },
  {
    name: "Leonardo Dicaprio",
    occupation: "actor",
    catchPhrase: "i'm the best ever"
  },
  {
    name: "Chris Hemsworth",
    occupation: "actor",
    catchPhrase: "i'm the best and i'm sexy"
  },
  {
    name: "Beyonce",
    occupation: "singer",
    catchPhrase: "i'm the best and i'm sexy"
  }
];

Celebrity.insertMany(celebrities)
  .then(celebrities => {
    celebrities.forEach(celebrity => {
      console.log(`${celebrity.name} added!`);
    });
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(error);
  });
