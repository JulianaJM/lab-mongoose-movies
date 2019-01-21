const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");
const Movie = require('../models/movie');

const dbtitle = "celebrity";
mongoose.connect(
  `mongodb://localhost/${dbtitle}`,
  { useNewUrlParser: true }
);

Celebrity.collection.drop();
Movie.collection.drop();

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


const movies = [
  {
    title: "The Book Club",
    plot: "A group of recent college graduates form a book club in an effort to add some variety to their mundane lives.  However, a lethal turn of events forces them to reconsider their love for literature when the events of one particular book begin to unfold in their actual lives as they are reading the book. The kicker? The book is awesome, they can't bring themselves to stop reading... until there are no survivors left...",
    genre: "Psychological Thriller"
  },
  {
    title: "Best Frenemies",
    plot: "Marie and Deanna have been best friends since elementary school.  Marie has always been the lucky one.  Grades, popularity, extra-curriculars, and beauty have always fallen into place for her, whereas life has always been a bit more of a struggle for Deanna.  However, one day, Deanna makes a shocking discovery that suggests none of this may be an accident.  Could Marie be stealing her luck?",
    genre: "Coming of age/ Drama"
  },
  {
    title: "The Fork",
    plot: "Rob Schneider is an ordinary Wall-Street executive.  He's got the car, the girlfriend, the money; he's got the life!  But he's about to find what it's like to be... a fork! Rob Scheider is... The Fork!",
    genre: "Comedy"
  },
]

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

  Movie.create(movies, (err, savedMovies) => {
    if (err) { throw err; }
    savedMovies.forEach(theMovie => {
      console.log(`${theMovie.title} - ${theMovie._id}`);
    });
    mongoose.disconnect();
  });
