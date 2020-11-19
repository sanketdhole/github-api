const express = require("express");
const axios = require("axios");

const sequelize = require("./utils/db");
const middlewares = require("./utils/middlewares");

const Repository = require("./models/repository");
const Owner = require("./models/owner");

Repository.Owner = Repository.belongsTo(Owner);

const app = express();

app.use(express.json());

app.post("/github", (req, res, next) => {
  const findOrCreateUserWithRepository = (repo) => {
    repo.ownerId = repo.owner.id;
    Owner.findOrCreate({
      where: {
        id: repo.owner.id,
      },
      defaults: repo.owner,
    })
      .then(() => {
        return Repository.findOrCreate({
          where: {
            id: repo.id,
          },
          defaults: repo,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  axios
    .get(req.body.url)
    .then((result) => {
      result.data.forEach(findOrCreateUserWithRepository);
      res.json("Processing your request");
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      throw new Error("Error processing request");
    });
});

app.get("/github/:id", (req, res, next) => {
  Repository.findOne({
    where: { id: req.params.id },
    include: Repository.Owner,
  })
    .then((repo) => {
      res.json(repo);
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Repository Not Found");
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// force fully sync is not ment for production
// but to execute sql smoothly it's added
sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
