const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const UsersController = require("./controllers/users.controller");

const usersRoutes = require("./routes/users.routes");
const pagesRoutes = require("./routes/pages.routes");

const PORT = 3000;

const usersController = new UsersController();
const app = express();

const uri = "mongodb://root:root@localhost:27017";
mongoose.set("useUnifiedTopology", true );
mongoose.set("useNewUrlParser", true);
mongoose.connect(uri, (error) => {
  if (error) throw error;
  console.log("connexion base de donnée ok");
});

app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.json());

app.use("/api/users", usersRoutes(usersController));
app.use("/", pagesRoutes(usersController));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
