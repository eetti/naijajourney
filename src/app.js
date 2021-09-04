const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const routes = require("./routes");
const port = process.env.PORT || "3000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '3mb' }));

// routes.routesConfig(app);
// adding routes
app.use(routes);

const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/api/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./models/**/*.js', './routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

app.listen(port, () => console.log(` backend API listening on port ${port}!`))