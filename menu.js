const sql = require("./modules/db");
var { GraphQLObjectType, GraphQLString, GraphQLFloat } = require("graphql");

var typeDef = new GraphQLObjectType({
  name: "Menu",
  fields: {
    name: { type: GraphQLString },
    small_serve: { type: GraphQLFloat },
    regular_serve: { type: GraphQLFloat },
    medium_serve: { type: GraphQLFloat },
    large_serve: { type: GraphQLFloat },
  },
});

var args = {};

var resolver = {
  menus: (_, {}) => {
    return new Promise((resolve, reject) => {
      sql.query(`call get_juice_menu_with_season_discount();`, (err, result) => {
        if (err) {
          // console.log(err)
          reject(err);
        }
        if (result) {
          resolve(result[0]);
        }
      });
    });
  },
};

module.exports = {
  typeDef,
  resolver,
  args,
};
