const sql = require("./modules/db");
var {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} = require("graphql");

var typeDef = new GraphQLObjectType({
  name: "Fruit",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    milkshakeable: { type: GraphQLInt },
  },
});

var args = {
  addFruit: {
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    isMilkshakeable: { type: GraphQLInt },
  },
  fruits: {
    name: { type: GraphQLString },
    minPrice: { type: GraphQLFloat },
    maxPrice: { type: GraphQLFloat },
  },
  fruit: {
    id: { type: GraphQLInt },
  },
};

var resolver = {
  // add a fruit to list
  addFruit: (
    _,
    {
      name: fruit_name,
      price: fruit_price,
      isMilkshake: isFruitMilkShakeable = 0,
    }
  ) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `call insert_fruits(
                  '${fruit_name}',
                  ${fruit_price},
                  ${isFruitMilkShakeable}
              );`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          if (result) {
            resolve(result[0][0]||{});
          }
        }
      );
    });
  },
  //get fruit by id
  fruit: (_, { id: fId }) => {
    return new Promise((resolve, reject) => {
      sql.query(`call get_fruits_by_id(${fId});`, (err, result) => {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result[0][0] || {});
        }
      });
    });
  },
  // get all fruits in shop by name,min and max price.
  fruits: (
    _,
    {
      name: fName = null,
      minPrice: fMinPrice = null,
      maxPrice: fMaxPrice = null,
    }
  ) => {
    return new Promise((resolve, reject) => {
      sql.query(
        `call juice_shop.get_fruits_by_name_price(${
          fName ? `'` + fName + `'` : fName
        },${fMinPrice},${fMaxPrice})`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          if (result) {
            resolve(result[0]||[]);
          }
        }
      );
    });
  },
};

module.exports = { typeDef, resolver, args };
