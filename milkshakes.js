const sql = require("./modules/db");
var {
  GraphQLString,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLInt,
} = require("graphql");

var typeDef = new GraphQLObjectType({
  name: "Milkshake",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
  },
});

var args = {
  addMilkshake: {
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
  },
  milkshakes: {
    name: { type: GraphQLString },
    minPrice: { type: GraphQLFloat },
    maxPrice: { type: GraphQLFloat },
  },
  milkshake: {
    id: { type: GraphQLInt },
  },
};

var resolver = {
  addMilkshake: (_, { name: mName, price: mPrice }) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `call insert_milkshake(
                  '${mName}',
                  ${mPrice}
              );`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          if (result) {
            resolve(result[0][0]);
          }
        }
      );
    });
  },
  //get milkshake by id
  milkshake: (_, { id: mId }) => {
    return new Promise((resolve, reject) => {
      sql.query(`call get_milkshake_by_id(${mId});`, (err, result) => {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result[0][0] || {});
        }
      });
    });
  },
  // get all milkshake in shop by name,min and max price.
  milkshakes: (
    _,
    {
      name: msName = null,
      minPrice: msMinPrice = null,
      maxPrice: msMaxPrice = null,
    }
  ) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `call get_milkshake_by_name_price(${
          msName ? `'` + msName + `'` : msName
        },${msMinPrice},${msMaxPrice})`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          if (result) {
            resolve(result[0] || []);
          }
        }
      );
    });
  },
};

module.exports = { typeDef, resolver, args };
