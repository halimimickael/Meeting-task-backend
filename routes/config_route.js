const reservationsR = require("./reservations");
const usersR = require("./users");
const hoursWorkR = require("./hoursWork");


exports.routesInit = (app) => {
  app.use("/reservations",reservationsR)
  app.use("/users",usersR)
  app.use("/hoursWork",hoursWorkR)
}