require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //partB

let Schema = mongoose.Schema;

//database name is called test

let userSchema = new Schema({
    userName : {type: String,  unique: true},
    password: String,
    email: String,
    loginHistory: [ { dateTime: Date, userAgent: String  } ]
  });

  mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('Connection has been established with MONGODB successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });
  
  let User = mongoose.model("User", userSchema); //use schema above to create a table/collection of User


  //connects to dbs and instantiate model User from schema above as per instructions
  function Initialize(){
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(process.env.MONGODB);
        //const db = mongoose.connect(process.env.MONGODB);
        db.on('error', (err)=>{
            reject(err); // reject the promise with the provided error
        });
        db.once('open', ()=>{
           User = db.model("users", userSchema);
           console.log('Connected to mongoDB database')
           resolve();
        });
    });
  }

  //Initialize(); //pass connecting


  function registerUser(userData){
    var pass = userData.password2;
    
    return new Promise(function (resolve, reject) {
        if (pass !== userData.password){
            reject('Passwords do not match. Please try again');
        }else{
            //part B hashing
            bcrypt.hash(pass, 10)
            .then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
                userData.password = hash;
                userData.password2 = hash;
                console.log("Password successfully hashed!")
                //save after hashing, line 49-65 is the old way
                let newUser = new User(userData)
                newUser.save()  
                .then(() => {
                    console.log('Success! New User created');
                    console.log(newUser.userName);
                    console.log(newUser.emai);
                    console.log(newUser.password);
                    console.log(newUser.loginHistory);
                    resolve();
                })
                .catch((err) => {
                    if (err.code === 11000){
                        reject("There was an error creating the user: " + err);
                    }
                    console.log('Unable to create a user');
                    reject();
                });
            })
            .catch(err=>{
                console.log(err); // Show any errors that occurred during the process
                reject("There was an error encrypting the password");
            });

        }
    });
  }

  
  function checkUser(userData){
    return new Promise(function (resolve, reject) {
        User.find({ userName: userData.userName })
        .then((data) => {
            //partB
            bcrypt.compare(userData.password, data[0].password)
            .then((result) => {
                // result === true if it matches and result === false if it does not match
                if (result){
                    if (data.length === 0){
                        console.log('error: empty array');
                        reject("Unable to find user: " + userData.userName);
                        
                    }else{
                        console.log('Success! User found');
                            if(data[0].loginHistory.length == 8){ //max login hx
                                data[0].loginHistory.pop() //rm the last elem from arr
                            }
                            //add a new entry to the front of the array 
                            data[0].loginHistory.unshift({dateTime: (new Date()).toString(), userAgent: userData.userAgent});
                            User.updateOne({userName: userData.userName},
                            {$set: {loginHistory: data[0].loginHistory}})
                            .exec().then(()=>{
                                console.log('Updating history');
                                console.log(data[0].loginHistory);
                                resolve(data[0]); //??
                            })
                            .catch((err) => {
                                console.log('Unable to save login hx');
                                reject("There was an error verifying the user: " + err);
                            });
                        }
                }else{ //password not matched
                    console.log('Password incorrect');
                    reject("Incorrect Password for user: " + userData.userName);
                }
            })

        //partA non hashed
            //check if empty array, rej
            // if (data.length === 0){
            //     console.log('error: empty array');
            //     reject("Unable to find user: " + userData.userName);

            // //check if password match, rej
            // }else if(data[0].password !== userData.password){
            //     console.log('Password incorrect');
            //     reject("Incorrect Password for user: " + userData.userName);

            //    //else" record in login hx, res 
            // }else{
            //     console.log('Success! User found');
            //     if(data[0].loginHistory.length == 8){ //max login hx
            //         data[0].loginHistory.pop() //rm the last elem from arr
            //     }
            //         //add a new entry to the front of the array 
            //         data[0].loginHistory.unshift({dateTime: (new Date()).toString(), userAgent: userData.userAgent});
            //         User.updateOne({userName: userData.userName},
            //         {$set: {loginHistory: data[0].loginHistory}})
            //         .exec().then(()=>{
            //             console.log('Updating history');
            //             console.log(data[0].loginHistory);
            //             resolve(data[0]); //??
            //         })
            //         .catch((err) => {
            //             console.log('Unable to save login hx');
            //             reject("There was an error verifying the user: " + err);
            //         });
                
                
            // }
            
        })
        .catch((err) => { //find promise catch
            console.log('User not found');
            reject("Unable to find user: " + userData.userName);
        });

    })
  }

  module.exports = { Initialize, registerUser, checkUser};