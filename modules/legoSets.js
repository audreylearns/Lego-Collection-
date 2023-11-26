/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name:AUDREY DUZON Student ID: 019153147 Date: OCT 23, 2023
*
********************************************************************************/
require('dotenv').config();
const Sequelize = require('sequelize');

//connection
let sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: 
      {
        require: true, 
        rejectUnauthorized: false 
      },
    },
  });

//define Theme model:
const Theme = sequelize.define(
    'Theme',
    {
      id: {
        type: Sequelize.INTEGER, //as per instructions
        primaryKey: true, // as per instructions
        autoIncrement: true, // as per instructions
      },
      name: Sequelize.STRING //as per instructions
      
    },
    {
      createdAt: false, // disable createdAt as per instructions
      updatedAt: false, // disable updatedAt as per instructions
    }
  );



//define set model:
const Set = sequelize.define(
    'Set',
    {
      set_num: {
        type: Sequelize.STRING, //as per instructions
        primaryKey: true, // as per instructions
      },
      name: Sequelize.STRING, //as per instructions,
      year: Sequelize.INTEGER,
      num_parts: Sequelize.INTEGER,
      theme_id: Sequelize.INTEGER,
      img_url: Sequelize.STRING
      
    },
    {
      createdAt: false, // disable createdAt as per instructions
      updatedAt: false, // disable updatedAt as per instructions
    }
  );

  //Create association between above:
  //Set has a foreign key called 'theme_id' which references the id of Theme
  Set.belongsTo(Theme, {foreignKey: 'theme_id'});

  // const setData = require("../data/setData");
  // const themeData = require("../data/themeData");
  // let sets = [];

  //connect to my DBS
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established with NEON TECH successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

//function to createa a 1 new obj from data at specific location
function newObj(data_set, data_theme, idx){
    var obj = {};
    var theme_len = data_theme.length;

    //initalize individual obj members
    obj.set_num = data_set[idx].set_num;
    obj.name = data_set[idx].name;
    obj.year = data_set[idx].year;
    obj.theme_id = data_set[idx].theme_id;
    obj.num_parts = data_set[idx].num_parts;
    obj.img_url = data_set[idx].img_url;

    //find theme data withim data_theme
    for (j=0; j < theme_len; j++){
        if (data_theme[j].id == obj.theme_id){
            obj.theme = data_theme[j].name; ////assign obj.theme 
            j = theme_len; //exit :)
        }
    }


    return obj;

}

<<<<<<< HEAD
=======

//Initialize(); //test pass resolves with no arg


//2)    getAllSets()
//      returns the complete "sets" array
// function getAllSets(){
//     return sets;
// }

//console.log(getAllSets()); //pass no arg


//3)    getSetByNum(setNum)
//      return a specific "set" object from the "sets" array, whose "set_num" value matches the value of the "setNum" parameter
// function getSetByNum(setNum){
//     var elemRtn;
//     var found = false;

//     for (i=0; i < sets.length; i++){
//         if (sets[i].set_num === setNum){
//            elemRtn = sets[i];
//            found = true;
//         }
//     }

//     return found === true? elemRtn : "Object not found"



// }

//console.log(getSetByNum("10055-1")); //pass
//console.log(getSetByNum("0")) //cool pass



//4)    getSetsByTheme(theme)
//      return an array of objects from the "sets" array whose "theme" value matches the "theme" parameter
//"theme" parameter may contain only part of
// the "theme" string, and case is ignored

// function getSetsByTheme(theme){
//     var rtnArr = [];
//     var found = false;

//     for (i=0; i < sets.length; i++){
//         if (sets[i].theme.toLowerCase().includes(theme.toLowerCase())){
//            elemRtn = sets[i];
//            found = true;
//            rtnArr.push(elemRtn);
//         }
//     }
//     return found === true? rtnArr : "Object not found"

// }


//console.log(getSetsByTheme("Bulk Br")); pass
//console.log(getSetsByTheme("cas")); pass
//console.log(getSetsByTheme("manga"));

//test run before promise
// Initialize();
// getAllSets();
// console.log(getSetByNum("932-1"));
// console.log(getSetsByTheme("tle"));


//PART 3 PROMISE version
>>>>>>> c5b9ea83d37d5845ba4536510a738bff4618c85b
function Initialize(){

  return new Promise((resolve, reject) => {
      sequelize.sync().then(() => {
          resolve();
      })
  });
}

//Initialize(); //correct

/*
4.	Change your code in the "getAllSets()" function to instead use the "Set" model (defined above) 
to resolve the returned Promise with all returned sets 
*/
function getAllSets(){
  return new Promise((resolve, reject) => {
    Set.findAll({
        include: [{ model: Theme, attributes: ["id", "name"] }],
        raw: true //no preprocessing
      })
      .then((data) => {
        return resolve(data);
      })
      

  })

}

//getAllSets() //correct
/*
5.	Change your code in the "getSetByNum(setNum)" function to instead use the "Set" model (defined above) to resolve the returned
 Promise with a single set whose set_num value matches the "setNum" parameter.  
As before, if no set was found, reject the Promise with an error, ie: "Unable to find requested set"
*/
function getSetByNum(setNum){
  return new Promise((resolve, reject) => {
    Set.findOne(
     {
      where: {set_num: setNum},
      include: [{ model: Theme, attributes: ["name"] }],
      raw: true //no preprocessing
     }) 
    .then((data) => {
      return resolve(data);
    })
  })
}

/*
instead use the "Set" model (defined above) to resolve the returned Promise with all the returned sets whose "Theme.name"
 property contains the string in the "theme" parameter.  
*/
function getSetsByTheme(theme){
  return new Promise((resolve, reject) => {
    Set.findAll({
      include: [{ model: Theme, attributes: ["name"] }],
      where: { 
        '$Theme.name$': {[Sequelize.Op.iLike]: `%${theme}%`}},
        raw: true //no preprocessing
      }).then((data) => {
      return resolve(data);
    })

  })

}

//p5 new
/*return a Promise that resolves once a set has been created, or rejects if there was an error.  
It uses the "Set" model to create a new Set with the data from the "setData" parameter.
 Once this function has resolved successfully, 
 resolve the Promise returned by the addSet(setData) function without any data.  
However, if the function did not resolve successfully, reject the Promise returned by the addSet(setData) 
function with the message from the first error, ie: err.errors[0].message (this will provide a more human-readable error message)
*/
function addSet(setData){
  return new Promise((resolve, reject) => {
    Set.create(setData)
    .then(()=>{
      return resolve()
    })
    .catch((err) => {
      return reject(err.errors[0].message )
    })
  })
}
/*
This function must return a Promise that resolves with all the themes in the database.  
This can be accomplished using the "Theme" model to return all of the themes in the database
*/
function getAllThemes(){
  return new Promise((resolve, reject) => {
    Theme.findAll({raw: true})
    .then((data) => {
    return resolve(data) //no preprocessing
    })
  })
}

//getAllThemes();

function editSet(setnum, setData){
  return new Promise((resolve, reject) => {
    Set.update(setData,
      {where:{set_num:setnum} })
    .then((data) => {
      console.log("Success! Lego is updated!")
    return resolve(data) //no preprocessing
    })
    .catch((err) => {
      return reject(err.errors[0].message )
    })
  })

}

function deleteSet(setnum){
  return new Promise((resolve, reject) => {
    Set.destroy(
      {where:{set_num:setnum} })
    .then(() => {
      console.log("Success! Lego is removed!")
    return resolve() //no preprocessing
    })
    .catch((err) => {
      return reject(err.errors[0].message )
    })
  })

}



//export the functions in this module
module.exports = { Initialize, getAllSets, getSetByNum, getSetsByTheme, newObj, addSet, getAllThemes, editSet, deleteSet}

// //bulk insert at the end, after module.exports
// //Code Snippet to insert existing data from Set / Themes
// sequelize
//   .sync()
//   .then( async () => {
//     try{
//       await Theme.bulkCreate(themeData);
//       await Set.bulkCreate(setData); 
//       console.log("-----");
//       console.log("data inserted successfully");
//     }catch(err){
//       console.log("-----");
//       console.log(err.message);

//       // NOTE: If you receive the error:

//       // insert or update on table "Sets" violates foreign key constraint "Sets_theme_id_fkey"

//       // it is because you have a "set" in your collection that has a "theme_id" that does not exist in the "themeData".   

//       // To fix this, use PgAdmin to delete the newly created "Themes" and "Sets" tables, fix the error in your .json files and re-run this code
//     }

//     process.exit();
//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });

