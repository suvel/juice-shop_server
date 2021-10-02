var express = require("express");
const bodyParser = require("body-parser");
var { graphqlHTTP } = require("express-graphql");
var { GraphQLObjectType, GraphQLSchema, GraphQLList } = require("graphql");
const dotenv = require("dotenv");
dotenv.config();
var {
  typeDef: menu_typedef,
  args: menu_args,
  resolver: menu_resolver,
} = require("./menu");
var {
  typeDef: fruit_typedef,
  resolver: fruit_resolver,
  args: fruit_args,
} = require("./fruits");
var {
  resolver: milkshake_resolver,
  args: milkshake_args,
  typeDef: milkshake_typedef,
} = require("./milkshakes");

var queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    menus: {
      type: new GraphQLList(menu_typedef),
      description: "List all juices and milkshakes that are sold",
      resolve: menu_resolver.menus,
    },
    // addFruit: {
    //   type: menu_typedef,
    //   args: fruit_args.addFruit,
    //   description:
    //     "Add a fruit,on successful insertion respond with added fruit detail",
    //   resolve: fruit_resolver.addFruit,
    // },
    fruit: {
      type: fruit_typedef,
      args: fruit_args.fruit,
      description: "Search for a fruit by id",
      resolve: fruit_resolver.fruit,
    },
    fruits: {
      type: GraphQLList(fruit_typedef),
      args: fruit_args.fruits,
      description: "Search for fruits by name,min and max price",
      resolve: fruit_resolver.fruits,
    },
    // addMilkshake: {
    //   type: menu_typedef,
    //   args: milkshake_args.addMilkshake,
    //   description:
    //     "Add a milkshake, on successful insertion respond with added milkshake detail",
    //   resolve: milkshake_resolver.addMilkshake,
    // },
    milkshake: {
      type: milkshake_typedef,
      args: milkshake_args.milkshake,
      description: "Search for a milkshake by id",
      resolve: milkshake_resolver.milkshake,
    },
    milkshakes: {
      type: GraphQLList(milkshake_typedef),
      args: milkshake_args.milkshakes,
      description: "Search for milkshakes by name,min and max price",
      resolve: milkshake_resolver.milkshakes,
    },
  }),
});

var schema = new GraphQLSchema({ query: queryType });

var app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true,
  })
);
app.listen(process.env.PORT || 4000);
// console.log("Running a GraphQL API server at http://localhost:4000/graphql");
