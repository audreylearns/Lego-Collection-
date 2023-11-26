/********************************************************************************

* WEB322 – Assignment 05

* 

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

* 

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

* 

* Name: AUDREY DUZON Student ID: 019153147 Date: NOVEMBER 26, 2023

*

* Published URL: https://magenta-rose-goose-kilt.cyclic.app/

*

********************************************************************************/


//ensure that the functions that we wrote in parts 2 & 3 will be available on the legoData object
const legoData = require("./modules/legoSets");

//ensure resolve
legoData.Initialize().then(()=>{
    console.log("Lego data initialized");
});

const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 3000;

app.listen(HTTP_PORT, () => console.log('Connection established at PORT '  + HTTP_PORT));
app.set('view engine', 'ejs'); //new addition A4
app.use(express.urlencoded({ extended: true })); //for json form handling

//ADD new A3 here
//identify a static folder
const path = require('path'); //similar to #include
app.use(express.static('public')); //for static obj = css + img etc


//include the html file

app.get('/', (req,res) => {
    res.render("home"); //A4 ADDITION
});


app.get('/about', (req,res) => {
    res.render("about");
});

// p4, lego sets and theme
app.get('/lego/sets?', (req,res) => {
    //default data to send 
    let item_theme = req.query.theme; //query returns the property from string
    if (item_theme) { //on the ?theme=item_theme
        legoData.getSetsByTheme(item_theme) //not hardcoded, calls the function when button selected ^
        .then((data)=>{
            var legoSets = JSON.stringify(data) //transform to json the promise obj
            legoSets = JSON.parse(legoSets); //return to js object
            res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
        })
        .catch((msg) => {
            console.log(msg);
            res.status(404).render("404", {message: "No Sets found for a the selected theme"});

        })
    }
    else{
        legoData.getAllSets().then((data)=>{
            var legoSets = JSON.stringify(data) //transform to json the promise obj
            legoSets = JSON.parse(legoSets); //return to js object
            res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
        }).catch((msg) => {
            console.log(msg);
            //var error = "No view matched for a specific route ";
            res.status(404).render("404", {message: "No view matched for a specific route "});

        })
    }

});


//legosets by num
app.get('/lego/sets/:num', (req,res) => { //hardcoded
    legoData.getSetByNum(req.params.num) //match the :variabl
    .then((data)=>{
        var legoSet = JSON.stringify(data) //convert to JSON the arr obj
        legoSet = JSON.parse(legoSet); //copy above
        res.render("set", {set: legoSet}) //send this object details onto set.ejs
        //res.send(rtn); //send to server :P
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).render("404", {message: "No Sets found for the selected item number"}); //sends the message to the 404 ejs
        //res.render("404");
    })

});


//form
app.get('/lego/addSet', (req,res)=>{
    legoData.getAllThemes()
    .then((data)=>{
        var themeData = JSON.stringify(data)
        themeData  = JSON.parse(themeData)
        res.render("addSet", {themes: themeData})
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).render("404", {message: "Set cannot be added"}); //sends the message to the 404 ejs
        //res.render("404");
    })

});


//form return
app.post('/lego/addSet', (req, res) => {    
    legoData.addSet(req.body)
    .then(() =>{
        res.redirect('/lego/sets');
    })
    .catch((msg) => {
        console.log(msg);
        res.status(500).render("500", {message: "Error encountered: " + msg}); //sends the message to the 500 ejs
    })
    
  });

  app.get('/lego/editSet/:num', (req,res)=>{
    const p = Promise.all([legoData.getSetByNum(req.params.num),legoData.getAllThemes()])
    p
    .then((values)=>{
    //.then((data,theme)=>{
        var setData = JSON.stringify(values[0]) //convert to JSON the arr obj
        setData = JSON.parse(setData); //copy above

        var themeData = JSON.stringify(values[1])
        themeData  = JSON.parse(themeData)
        res.render("editSet", { themes: themeData, set: setData });
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).render("404", {message: "Set cannot be added"}); //sends the message to the 404 ejs
       
    })

});

app.post('/lego/editSet', (req, res) => {
    const setData = req.body
    legoData.editSet(setData.set_num,setData) //?
    .then(() =>{
        res.redirect('/lego/sets');
    })
    .catch((msg) => {
        console.log(msg);
        res.status(500).render("500", {message: "Error encountered: " + msg}); //sends the message to the 500 ejs
    })
    
  });

  app.get('/lego/deleteSet/:num', (req,res)=>{
    legoData.deleteSet(req.params.num)
    .then(()=>{
        res.redirect('/lego/sets');
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).render("500", {message: "Set cannot be deleted"}); //sends the message to the 404 ejs
       
    })

});

  
app.use((req, res, next) => {
    res.status(404).render("404",{message:"ERROR: No view matched for a specific route"});

  });

