var express = require("express");
const bodyParser = require("body-parser");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var { m_schema, m_root } = require("./menu");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

type Menu {
  name:String,
  small_serve:Float,
  regular_serve:Float,
  medium_serve:Float,
  large_serve:Float
  }

  type Query {
    hello: String,
    menu:[Menu]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
  ...m_root,
};

var app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
