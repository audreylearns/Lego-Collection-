/********************************************************************************

* WEB322 – Assignment 04

* 

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

* 

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

* 

* Name: AUDREY DUZON Student ID: 019153147 Date: NOVEMBER 5, 2023

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

// app.get('/', (req,res) => {
//     res.send("Assignment 2: Audrey Duzon - 019153147");
    
// });


// app.get('/lego/sets', (req,res) => {

//     legoData.getAllSets().then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
    
// });

//         var legoSet = JSON.stringify(data) //convert to JSON the arr obj
//legoSet = JSON.parse(legoSet); //copy above
//res.render("set", {set: legoSet}) //send this object details onto set.ejs


// // //p3 addition
// app.get('/lego/sets?', (req,res) => {
//     //default data to send 
    
//     if (req.query.theme == 'Modular_Buildings') {
//         legoData.getSetsByTheme("Modular Buildings")
//         .then((data)=>{
//             // var rtn = JSON.stringify(data) //convert to JSON the arr obj
//             // res.send(rtn); //send to server :P
//             var legoSets = JSON.stringify(data) //transform to json the promise obj
//             legoSets = JSON.parse(legoSets); //return to js object
//             res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//         })
//         .catch((msg) => {
//             console.log(msg);
//             res.status(404).render("404", {message: "No Sets found for a matching theme"});
//             //res.render("404");
//             //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         })
//     }else if(req.query.theme == 'Ultimate_Collector_Series' ){
//         legoData.getSetsByTheme("Ultimate Collector Series")
//         .then((data)=>{
//             var legoSets = JSON.stringify(data) //transform to json the promise obj
//             legoSets = JSON.parse(legoSets); //return to js object
//             res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//         })
//         .catch((msg) => {
//             console.log(msg);
//             res.status(404).render("404", {message: "No Sets found for a matching theme"});
//             //res.render("404");
//             //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         })
    
//     }else if(req.query.theme == 'town' ){
//         legoData.getSetsByTheme("town")
//         .then((data)=>{
//             var legoSets = JSON.stringify(data) //transform to json the promise obj
//             legoSets = JSON.parse(legoSets); //return to js object
//             res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//         })
//         .catch((msg) => {
//             console.log(msg);
//             res.status(404).render("404", {message: "No Sets found for a matching theme"});
//             //res.render("404");
//             //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         })
//     }else if(req.query.theme == 'Bulk_Bricks' ){
//         legoData.getSetsByTheme("Bulk Bricks")
//         .then((data)=>{
//             var legoSets = JSON.stringify(data) //transform to json the promise obj
//             legoSets = JSON.parse(legoSets); //return to js object
//             res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//         })
//         .catch((msg) => {
//             console.log(msg);
//             res.status(404).render("404", {message: "No Sets found for a matching theme"});
//             //res.render("404");
//             //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         })
//     }else if(req.query.theme == 'Christmas' ){
//         legoData.getSetsByTheme("Christmas")
//         .then((data)=>{
//             var legoSets = JSON.stringify(data) //transform to json the promise obj
//             legoSets = JSON.parse(legoSets); //return to js object
//             res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//         })
//         .catch((msg) => {
//             console.log(msg);
//             res.status(404).render("404", {message: "No Sets found for a matching theme"});
//             //res.render("404");
//             //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         })
//     }else if(req.query.theme == 'Easter' ){
//         legoData.getSetsByTheme("Easter")
//         .then((data)=>{
//             var legoSets = JSON.stringify(data) //transform to json the promise obj
//             legoSets = JSON.parse(legoSets); //return to js object
//             res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//         })
//         .catch((msg) => {
//             console.log(msg);
//             res.status(404).render("404", {message: "No Sets found for a matching theme"});
//             //res.render("404");
//             //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         })
//     }
//     else if(req.query.theme == 'Technic' ){
//         legoData.getSetsByTheme("Technic")
//         .then((data)=>{
//             var legoSets = JSON.stringify(data) //transform to json the promise obj
//             legoSets = JSON.parse(legoSets); //return to js object
//             res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//         })
//         .catch((msg) => {
//             console.log(msg);
//             res.status(404).render("404", {message: "No Sets found for a matching theme"});
//             //res.render("404");
//             //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         })
//     }else if(req.query.theme == 'Creator_Expert' ){
//         legoData.getSetsByTheme("Creator Expert")
//         .then((data)=>{
//             var legoSets = JSON.stringify(data) //transform to json the promise obj
//             legoSets = JSON.parse(legoSets); //return to js object
//             res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//         })
//         .catch((msg) => {
//             console.log(msg);
//             res.status(404).render("404", {message: "No Sets found for a matching theme"});
//             //res.render("404");
//             //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         })
//     }
//     else{
//         legoData.getAllSets().then((data)=>{
//             var legoSets = JSON.stringify(data) //transform to json the promise obj
//             legoSets = JSON.parse(legoSets); //return to js object
//             res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//         }).catch((msg) => {
//             console.log(msg);
//             //var error = "No view matched for a specific route ";
//             res.status(404).render("404", {message: "No view matched for a specific route "});
//             //res.render("404");
//             //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         })
//     }

// });


//pass scenario
// app.get('/lego/sets/num-demo', (req,res) => {
//     //res.send(legoData.getSetByNum("10188-1"));
//     legoData.getSetByNum("10188-1")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         res.send(msg)
//     })

// });

//fail scenario         -       uncomment to test   !!!!!!!!
// app.get('/lego/sets/num-demo', (req,res) => {
//     //res.send(legoData.getSetByNum("10188-1"));
//     legoData.getSetByNum("0")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         res.send(msg)
//     })

// });

//pass , no longer needed for here
// app.get('/lego/sets/theme-demo', (req,res) => {
//     //res.send(legoData.getSetsByTheme("educat"));
//     legoData.getSetsByTheme("educat")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         res.send(msg)
//     })

// });

//fail scenario         -               uncomment to test!!!!!!!!
// app.get('/lego/sets/theme-demo', (req,res) => {
//     //res.send(legoData.getSetsByTheme("manga"));
//     legoData.getSetsByTheme("manga")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         res.send(msg)
//     })


// });


//ADD new A3 here
//identify a static folder
const path = require('path'); //similar to #include
app.use(express.static('public')); //for static obj = css + img etc


//include the html file

app.get('/', (req,res) => {
    //res.sendFile(path.join(__dirname, '/views/home.html')) //returns absolute path to join and send HTML onto my server :D
    //res.write('<p>Greetings</p>');
    //res.end();
    res.render("home"); //A4 ADDITION
});


app.get('/about', (req,res) => {
    //res.sendFile(path.join(__dirname, '/views/about.html')) //returns absolute path to join and send HTML onto my server :D
    //res.write('<p>Greetings</p>');
    //res.end();
    res.render("about");
});


//3 themes set up 
// app.get('/lego/sets/theme=Modular_Buildings', (req,res) => {
//     //res.send(legoData.getSetsByTheme("educat"));
//     legoData.getSetsByTheme("Modular Buildings")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         res.send(msg)
//     })

// });

// app.get('/lego/sets/theme=Ultimate_Collector_Series', (req,res) => {
//     //res.send(legoData.getSetsByTheme("educat"));
//     legoData.getSetsByTheme("Ultimate Collector Series")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         res.send(msg)
//     })

// });

// app.get('/lego/sets/theme=town', (req,res) => {
//     //res.send(legoData.getSetsByTheme("educat"));
//     legoData.getSetsByTheme("town")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         res.send(msg)
//     })

// });



//card 1 
// app.get('/lego/sets/10169-1', (req,res) => {
//     //res.send(legoData.getSetByNum("10188-1"));
//     legoData.getSetByNum("10169-1")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         res.render("404");
//     })

// });

// //card 2
// app.get('/lego/sets/10166-1', (req,res) => {
//     legoData.getSetByNum("10166-1")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         res.render("404");
//     })

// });

// //card 3
// app.get('/lego/sets/10165-1', (req,res) => {
//     legoData.getSetByNum("10165-1")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         res.render("404");
//     })

// });


// //card 4
// app.get('/lego/sets/10182-1', (req,res) => {
//     legoData.getSetByNum("10182-1")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         res.render("404");
//     })

// });

// //card 5
// app.get('/lego/sets/10184-1', (req,res) => {
//     legoData.getSetByNum("10184-1")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         res.render("404");
//     })

// });


// //card 6
// app.get('/lego/sets/9349-1', (req,res) => {
//     legoData.getSetByNum("9349-1")
//     .then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
//     .catch((msg) => {
//         console.log(msg);
//         //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
//         res.render("404");
//     })

// });

// //error html

// //part4!!!

// app.get('/lego/sets', (req,res) => {

//     legoData.getAllSets().then((data)=>{
//         var legoSets = JSON.stringify(data) //transform to json the promise obj
//         legoSets = JSON.parse(legoSets); //return to js object
//         res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
//     })
    
// });


// p4, lego sets and theme
app.get('/lego/sets?', (req,res) => {
    //default data to send 
    let item_theme = req.query.theme; //query returns the property from string
    if (item_theme) { //on the ?theme=item_theme
        legoData.getSetsByTheme(item_theme) //not hardcoded, calls the function when button selected ^
        .then((data)=>{
            // var rtn = JSON.stringify(data) //convert to JSON the arr obj
            // res.send(rtn); //send to server :P
            var legoSets = JSON.stringify(data) //transform to json the promise obj
            legoSets = JSON.parse(legoSets); //return to js object
            res.render("sets", {sets: legoSets});  //send the sets object to this ejs file
        })
        .catch((msg) => {
            console.log(msg);
            res.status(404).render("404", {message: "No Sets found for a the selected theme"});
            //res.render("404");
            //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
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
            //res.render("404");
            //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
        })
    }

});


//legosets by num
app.get('/lego/sets/:num', (req,res) => { //hardcoded
    legoData.getSetByNum(req.params.num) //match the :variable
    //legoData.getSetByNum("10055-1") //hardcoded
    .then((data)=>{
        var legoSet = JSON.stringify(data) //convert to JSON the arr obj
        legoSet = JSON.parse(legoSet); //copy above
        res.render("set", {set: legoSet}) //send this object details onto set.ejs
        //res.send(rtn); //send to server :P
    })
    .catch((msg) => {
        console.log(msg);
        //res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
        res.status(404).render("404", {message: "No Sets found for the selected item number"}); //sends the message to the 404 ejs
        //res.render("404");
    })

});

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
    //var error = "ERROR: No view matched for a specific route"
    res.status(404).render("404",{message:"ERROR: No view matched for a specific route"});
    //res.status(404);
  });

