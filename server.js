/********************************************************************************

* WEB322 – Assignment 06

* 

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

* 

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

* 

* Name: AUDREY DUZON Student ID: 019153147 Date: NOVEMBER 29, 2023

*

* Published URL: https://magenta-rose-goose-kilt.cyclic.app/

*

********************************************************************************/


//ensure that the functions that we wrote in parts 2 & 3 will be available on the legoData object
const legoData = require("./modules/legoSets");
const authData = require("./modules/auth-service")
const clientSessions = require('client-sessions');



const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 3000;

app.listen(HTTP_PORT, () => console.log('Connection established at PORT '  + HTTP_PORT));
app.set('view engine', 'ejs'); //new addition A4
app.use(express.urlencoded({ extended: true })); //for json form handling

//ensure resolve
// legoData.Initialize().then(()=>{
//     console.log("Connected to Neon");
// });

// authData.Initialize().then(()=>{
//     console.log("Connectted to mongoDb");
// });


legoData.Initialize()
.then(authData.Initialize)
//.then(() => authData.Initialize())
.then(function(){
    app.listen(HTTP_PORT, function(){
        console.log('Connection established at PORT '  + HTTP_PORT);
    });
}).catch(function(err){
    console.log('Unable to start server: ' +err);
});

//a6 reseneca website
//to ensure that all of your templates will have access to a "session" object 
app.use(
    clientSessions({
      cookieName: 'session', // this is the object name that will be added to 'req'
      secret: 'o6LjQ5EVNC28ZgK64hDELM18ScpFQr', // this should be a long un-guessable string.
      duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
      activeDuration: 1000 * 60, // the session will be extended by this many ms each request (1 minute)
    })
  );

  //a6
  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });
  
  //seneca website
  function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect('/login');
    } else {
      next();
    }
  }


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
app.get('/lego/addSet',ensureLogin, (req,res)=>{
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
app.post('/lego/addSet',ensureLogin, (req, res) => {    
    legoData.addSet(req.body)
    .then(() =>{
        res.redirect('/lego/sets');
    })
    .catch((msg) => {
        console.log(msg);
        res.status(500).render("500", {message: "Error encountered: " + msg}); //sends the message to the 500 ejs
    })
    
  });

  app.get('/lego/editSet/:num', ensureLogin, (req,res)=>{
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

app.post('/lego/editSet', ensureLogin, (req, res) => {
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

  app.get('/lego/deleteSet/:num',ensureLogin, (req,res)=>{
    legoData.deleteSet(req.params.num)
    .then(()=>{
        res.redirect('/lego/sets');
    })
    .catch((msg) => {
        console.log(msg);
        res.status(500).render("500", {message: "Set cannot be deleted"}); //sends the message to the 404 ejs
       
    })

});

//a6 routes
app.get('/login', (req,res)=>{
    res.render("login",{error:'false'});
})//pass

app.post('/login', (req, res)=>{
    req.body.userAgent = req.headers['user-agent']
    //req.body.userAgent = req.get('User-Agent'); //doesnt work, accoridng to npm do abpve instead
    const user = {userName:req.body.userName, password: req.body.password,  userAgent:req.body.userAgent}
    authData.checkUser(user)
    .then((user) => {
        req.session.user = {
            userName: user.userName,// authenticated user's userName
            email: user.email,// authenticated user's email
            loginHistory: user.loginHistory// authenticated user's loginHistory
        }
        res.redirect('/lego/sets');
    }).catch((msg) => {
        console.log(msg);
        res.render("login",{errorMessage: msg, userName: req.body.userName, error:'true'}  )
        //returning the user back to the page, so the user does not forget the user value that was used to attempt to log into the system
    })
    
})//pass


app.get('/register', (req, res)=>{
    res.render("register", {reg: 'empty'});
})//pass

app.post('/register', (req, res)=>{
    var userData = { //as per instructions
        userName: req.body.userName, //from the form
        password: req.body.password, //from the form
        password2: req.body.password2, //from the form
        email: req.body.email, //from the form
      };
    authData.registerUser(userData) //as per instructions
    .then(()=>{
        res.render("register", {successMessage: "User created" , reg:'pos'})
    })
    .catch((errorMessage) => {
        console.log(errorMessage);
        res.render("register", {errorMessage: errorMessage, userName: req.body.userName, reg:'neg'} )
        //returning the user back to the page, so the user does not forget the user value that was used to attempt to register with the system
    })
})//pass

app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect("/");
  });

  app.get("/userHistory", ensureLogin,(req, res) => {
    res.render("userHistory");
  });



//maybe delete
app.use((req, res, next) => {
    res.status(500).render("500",{message:"ERROR: Contact the creator! https://github.com/audreylearns "});

  });
  
app.use((req, res, next) => {
    res.status(404).render("404",{message:"ERROR: No view matched for a specific route"});

  });

