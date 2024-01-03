const indexR = require("./index");
const usersR = require("./users");
const storiesR = require("./stories");
const paragraphsR = require("./paragraphs");
const commentsR = require("./comments");
const charactersR = require("./characters");
const ratingsR = require("./rating");
const forgotPasswordR = require("./forgot_password");
const resetPasswordR = require("./reset_password");
const reportsR = require("./reports");


exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/stories", storiesR);
    app.use("/paragraphs", paragraphsR);
    app.use("/comments", commentsR);
    app.use("/characters", charactersR);
    app.use("/ratings", ratingsR);
    app.use("/forgot-password", forgotPasswordR);
    app.use("/reset-password", resetPasswordR);
    app.use("/reports", reportsR);
    app.get('/reset-password/:token', (req, res) => {
        const token = req.params.token;
        console.log(token);
        res.redirect(`http://localhost:3000/reset-password?token=${token}`);
      });
      

}