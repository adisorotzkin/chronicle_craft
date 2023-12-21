const indexR = require("./index");
const usersR = require("./users");
const storiesR = require("./stories");
const paragraphsR = require("./paragraphs");
const commentsR = require("./comments");
const charactersR = require("./characters");


exports.routesInit = (app) => 
{
    app.use("/",indexR);
    app.use("/users",usersR);
    app.use("/stories",storiesR);
    app.use("/paragraphs",paragraphsR);
    app.use("/comments",commentsR);
    app.use("/characters",charactersR);

}