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

//setData" and "themeData".
const setData = require("../data/setData");     //global obj
const themeData = require("../data/themeData");     //global obj

//completed array of Lego "set" objects, after processing the above "setData" and "themeData" arrays.
let sets = [];

//functions to create: NO PROMISE

//1)    Initialize()
//      The purpose of this function is to *fill* the "sets" array (declared above), by adding copies of *ALL* the setData objects
//          include a new "theme" property == theme name from the themeData.json file
//                      whose "id" value matches the "theme_id" for the "setData" object.
//  ie theme_id: "1" += theme: "technic"
//parse method :)


// function Initialize(){
//     // var obj = {};
//     var set_len = setData.length;
//     // var theme_len = data_theme.length;

//     // for (i=0; i < set_len; i++){
//     //     //initalize individual obj members
//     //     obj.setNum = data_set[i].set_num;
//     //     obj.name = data_set[i].name;
//     //     obj.year = data_set[i].year;
//     //     obj.theme_id = data_set[i].theme_id;
//     //     obj.num_parts = data_set[i].num_parts;
//     //     obj.img_url = data_set[i].img_url;

//     //     //find theme data withim data_theme
//     //     for (j=0; j < theme_len; j++){
//     //         if (data_theme[j].id == obj.theme_id){
//     //             obj.theme = data_theme[j].name; ////assign obj.theme 
//     //             j = theme_len; //exit :)
//     //         }
//     //     }
//     //     //add complete obj to sets array
//     //     //sets.push(obj);

//     // }
//     for (i=0; i < set_len; i++){
//         sets.push(newObj(setData,themeData,i));
//     }


// }

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

function getSetsByTheme(theme){
    var rtnArr = [];
    var found = false;

    for (i=0; i < sets.length; i++){
        if (sets[i].theme.toLowerCase().includes(theme.toLowerCase())){
           elemRtn = sets[i];
           found = true;
           rtnArr.push(elemRtn);
        }
    }
    return found === true? rtnArr : "Object not found"

}


//console.log(getSetsByTheme("Bulk Br")); pass
//console.log(getSetsByTheme("cas")); pass
//console.log(getSetsByTheme("manga"));

//test run before promise
// Initialize();
// getAllSets();
// console.log(getSetByNum("932-1"));
// console.log(getSetsByTheme("tle"));


//PART 3 PROMISE version
function Initialize(){

    var set_len = setData.length;
    for (i=0; i < set_len; i++){
        sets.push(newObj(setData,themeData,i));
    }
    return new Promise((resolve,reject)=>{
        sets.length > 0? resolve() : reject('Initialize function failed');
    })
}

// Initialize(); //correct

function getAllSets(){
    return new Promise((resolve,reject) => {
        resolve(sets);
    })
}

// getAllSets() //correct

function getSetByNum(setNum){
    var elemRtn;
    var found = false;

    for (i=0; i < sets.length; i++){
        if (sets[i].set_num === setNum){
           elemRtn = sets[i];
           found = true;
        }
    }

    //return found === true? elemRtn : "Object not found"
    return new Promise((resolve,reject)=>{
        found === true?  resolve(elemRtn) : reject('Object/s of '+ setNum + ' not found!');
    })


}

// getSetByNum("9321-1"); //pass
// getSetByNum("0"); //fail check 

function getSetsByTheme(theme){
    var rtnArr = [];
    var found = false;

    for (i=0; i < sets.length; i++){
        if (sets[i].theme.toLowerCase().includes(theme.toLowerCase())){
           elemRtn = sets[i];
           found = true;
           rtnArr.push(elemRtn);
        }
    }
    //return found === true? rtnArr : "Object not found"
    return new Promise((resolve,reject)=>{
        found === true?  resolve(rtnArr) : reject('Object/s of ' + theme + ' not found!');
    })

}

// getSetsByTheme("Bulk Br") //pass
// getSetsByTheme("cas")  //pass
// getSetsByTheme("manga") //fail check


//export the functions in this module
module.exports = { Initialize, getAllSets, getSetByNum, getSetsByTheme, newObj}