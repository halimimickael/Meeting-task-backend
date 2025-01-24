const reservationsR = require("./reservations");
const usersR = require("./users");


exports.routesInit = (app) => {
  app.use("/reservations",reservationsR)
  app.use("/users",usersR)
}