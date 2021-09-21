const sql = require("./modules/db");

const schema = `
menu:[]
`;
/*
{
name:String,
small_serve:Float,
regular_serve:Float,
medium_serve:Float,
large_serve:Float
}
*/

const root = {
  menu: () => {
    return new Promise((resolve, reject) => {
      sql.query(`call generate_menu_with_serve_price('fruits');`, (err,result) => {
        if(err) {
          // console.log(err)
          reject(err)
        };
        if(result) {
          resolve(result[0]);
        }
      });
    });
  },
};

const mockData = [
  {
    name: "lemon",
    small_serve: 7.5,
    regular_serve: 15.0,
    medium_serve: 30.0,
    large_serve: 60.0,
  },
  {
    name: "pineapple",
    small_serve: 7.5,
    regular_serve: 15.0,
    medium_serve: 30.0,
    large_serve: 60.0,
  },
  {
    name: "grapes",
    small_serve: 7.5,
    regular_serve: 15.0,
    medium_serve: 30.0,
    large_serve: 60.0,
  },
  {
    name: "mosambi",
    small_serve: 12.5,
    regular_serve: 25.0,
    medium_serve: 50.0,
    large_serve: 100.0,
  },
  {
    name: "orange",
    small_serve: 12.5,
    regular_serve: 25.0,
    medium_serve: 50.0,
    large_serve: 100.0,
  },
  {
    name: "water melon",
    small_serve: 9.0,
    regular_serve: 18.0,
    medium_serve: 36.0,
    large_serve: 72.0,
  },
  {
    name: "carrot",
    small_serve: 17.5,
    regular_serve: 35.0,
    medium_serve: 70.0,
    large_serve: 140.0,
  },
  {
    name: "papaya",
    small_serve: 9.0,
    regular_serve: 18.0,
    medium_serve: 36.0,
    large_serve: 72.0,
  },
  {
    name: "banana",
    small_serve: 9.0,
    regular_serve: 18.0,
    medium_serve: 36.0,
    large_serve: 72.0,
  },
  {
    name: "custard apple",
    small_serve: 7.5,
    regular_serve: 15.0,
    medium_serve: 30.0,
    large_serve: 60.0,
  },
  {
    name: "musk melon",
    small_serve: 9.0,
    regular_serve: 18.0,
    medium_serve: 36.0,
    large_serve: 72.0,
  },
  {
    name: "mango",
    small_serve: 12.5,
    regular_serve: 25.0,
    medium_serve: 50.0,
    large_serve: 100.0,
  },
  {
    name: "butter fruit",
    small_serve: 10.0,
    regular_serve: 20.0,
    medium_serve: 40.0,
    large_serve: 80.0,
  },
  {
    name: "apple",
    small_serve: 12.5,
    regular_serve: 25.0,
    medium_serve: 50.0,
    large_serve: 100.0,
  },
];

module.exports = {
  m_schema: schema,
  m_root: root,
};
