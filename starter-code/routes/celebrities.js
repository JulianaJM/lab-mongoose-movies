const router = require("./index");
const Celebrity = require("../models/celebrity");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find(
    {},
    function(err, celebrities) {
      if (!err) {
        console.log(celebrities);
        res.render("celebrities", { celebrities });
      } else {
        next();
      }
    },
    function(req, res) {
      throw err;
    }
  );
});

router.post("/celebrities", (req, res, next) => {
  const { name, occupation, phrase } = req.body;
  const newCelebrity = new Celebrity({
    name,
    occupation,
    catchPhrase: phrase
  });
  newCelebrity
    .save()
    .then(celebrity => {
      console.log("add a celebrity => ", celebrity);
      res.redirect("/celebrities");
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.post("/celebrities/edit", (req, res, next) => {
  const { name, occupation, phrase } = req.body;
  console.log("req boooooooooody => ", req.body);

  Celebrity.update(
    { _id: req.body._id },
    { $set: { name, occupation, catchPrase: phrase } }
  )
    .then(celebrity => {
      console.log("update celebrity => ", celebrity);
      res.redirect("/celebrities");
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id, function(err, celebrity) {
    console.log("id: ", req.params.id);
    if (!err) {
      console.log("one celebrity : ", celebrity);
      res.render("celebrities/show", celebrity);
    } else {
      throw err;
    }
  });
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  console.log("id ", req.params.id);
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      console.log("edit celebrity : ", celebrity);
      res.render("celebrities/edit", celebrity);
    })
    .catch(err => {
      next(err); //You can use next to execute the next handler that matches the request, in this case it's the error handler
    });
});

router.get("/celebrities/:id/remove", (req, res, next) => {
  Celebrity.findByIdAndRemove({ _id: req.params.id })
    .then(celebrity => {
      console.log("delete celebrity : ", celebrity);
      res.redirect("/celebrities");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
