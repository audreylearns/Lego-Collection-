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


// app.get('/', (req,res) => {
//     res.send("Assignment 2: Audrey Duzon - 019153147");
    
// });


// app.get('/lego/sets', (req,res) => {

//     legoData.getAllSets().then((data)=>{
//         var rtn = JSON.stringify(data) //convert to JSON the arr obj
//         res.send(rtn); //send to server :P
//     })
    
// });

//p3 addition
app.get('/lego/sets?', (req,res) => {
    //default data to send 
    
    if (req.query.theme == 'Modular_Buildings') {
        legoData.getSetsByTheme("Modular Buildings")
        .then((data)=>{
            var rtn = JSON.stringify(data) //convert to JSON the arr obj
            res.send(rtn); //send to server :P
        })
        .catch((msg) => {
            console.log(msg);
            res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
        })
    }else if(req.query.theme == 'Ultimate_Collector_Series' ){
        legoData.getSetsByTheme("Ultimate Collector Series")
        .then((data)=>{
            var rtn = JSON.stringify(data) //convert to JSON the arr obj
            res.send(rtn); //send to server :P
        })
        .catch((msg) => {
            console.log(msg);
            res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
        })
    
    }else if(req.query.theme == 'town' ){
        legoData.getSetsByTheme("town")
        .then((data)=>{
            var rtn = JSON.stringify(data) //convert to JSON the arr obj
            res.send(rtn); //send to server :P
        })
        .catch((msg) => {
            console.log(msg);
            res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
        })
    }
    else{
        legoData.getAllSets().then((data)=>{
            var rtn = JSON.stringify(data) //convert to JSON the arr obj
            res.send(rtn); //send to server :P
        })
        .catch((msg) => {
            console.log(msg);
            res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
        })

    }


});

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
    res.sendFile(path.join(__dirname, '/views/home.html')) //returns absolute path to join and send HTML onto my server :D
    //res.write('<p>Greetings</p>');
    //res.end();
    
});


app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname, '/views/about.html')) //returns absolute path to join and send HTML onto my server :D
    //res.write('<p>Greetings</p>');
    //res.end();
    
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
app.get('/lego/sets/10169-1', (req,res) => {
    //res.send(legoData.getSetByNum("10188-1"));
    legoData.getSetByNum("10169-1")
    .then((data)=>{
        var rtn = JSON.stringify(data) //convert to JSON the arr obj
        res.send(rtn); //send to server :P
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
    })

});

//card 2
app.get('/lego/sets/10166-1', (req,res) => {
    legoData.getSetByNum("10166-1")
    .then((data)=>{
        var rtn = JSON.stringify(data) //convert to JSON the arr obj
        res.send(rtn); //send to server :P
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
    })

});

//card 3
app.get('/lego/sets/10165-1', (req,res) => {
    legoData.getSetByNum("10165-1")
    .then((data)=>{
        var rtn = JSON.stringify(data) //convert to JSON the arr obj
        res.send(rtn); //send to server :P
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
    })

});


//card 4
app.get('/lego/sets/10182-1', (req,res) => {
    legoData.getSetByNum("10182-1")
    .then((data)=>{
        var rtn = JSON.stringify(data) //convert to JSON the arr obj
        res.send(rtn); //send to server :P
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
    })

});

//card 5
app.get('/lego/sets/10184-1', (req,res) => {
    legoData.getSetByNum("10184-1")
    .then((data)=>{
        var rtn = JSON.stringify(data) //convert to JSON the arr obj
        res.send(rtn); //send to server :P
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
    })

});


//card 6
app.get('/lego/sets/9349-1', (req,res) => {
    legoData.getSetByNum("9349-1")
    .then((data)=>{
        var rtn = JSON.stringify(data) //convert to JSON the arr obj
        res.send(rtn); //send to server :P
    })
    .catch((msg) => {
        console.log(msg);
        res.status(404).sendFile(path.join(__dirname, '/views/404.html')); //error html
    })

});

//error html

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
  });