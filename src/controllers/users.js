var User = require('../models/users');
var Wallets = require('../models/wallets');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var blocktrail = require("blocktrail-sdk");
var key = "9c60cbc64f97096eb2d4ec709aedd4afe2a39e7a";
var secret = "dc4dd1256e3f6b399c2eb83fc40d11bca5ef27c5";
var client = blocktrail.BlocktrailSDK({
    apiKey: key,
    apiSecret: secret,
    network: "BTC",
    testnet: true
});

export class Users {
    constructor() {

    }

    //<**********main registrations*******>
    registrations(req,res){
        let username = req.body.username;
        let password = req.body.password;
            password = bcrypt.hashSync(password, 8);
        let email = req.body.email;
        let mobilenumber = req.body.mobilenumber;
        //to save
        var newuser = new User({
            username: username,
            password: password,
            email: email,
            mobilenumber: mobilenumber
        });
        //to check if user already exists or not
        User.find({"username":username},(err,data)=>{
                        if(data.length>=1){
                            console.log(data.length);
                            res.status(404).send({
                                 message: "User name already exists create something new!",
                                 })
                        } else{
                            console.log("no users data exists can create user!");
                                    newuser.save((err, userdata) => {
                                                if (userdata) {
                                                    res.status(200).send({
                                                        message: "user created & save",
                                                        data:userdata
                                                    })
                                                } else {
                                                    res.status(404).send({
                                                        message: "error! in userdata saving to db! " + err
                                                    })
                                                }
                                              })  

                           } 
                })


    } //end of registrations



    //<***********Subwallet creations************>
    wallets(req,res){
                
        let username = req.body.username;
        let wpassword = req.body.wpassword;
        let walletname = req.body.walletname;// wallet name is the unique key
        //to save
        var newwallet = new Wallets({
            username: username,
            walletname: walletname,
            wpassword: wpassword
        });

        //to check if wallet already exists or not
        Wallets.find({"walletname":walletname},(err,data)=>{
                        if(data.length>=1){
                            console.log(data.length);
                            res.status(404).send({
                                 message: "wallet name already exists create something new!",
                                 })
                        } else{
                            console.log("no data exists can create wallet!");
                                client.createNewWallet(walletname, wpassword, (err, wallet, backupInfo) => {
                                if (wallet) { //to save in db 
                                            newwallet.save((err, userdata) => {
                                                if (userdata) {
                                                    res.status(200).send({
                                                        message: "wallet created & save",
                                                        data:userdata
                                                    })
                                                } else {
                                                    res.status(404).send({
                                                        message: "error! in userdata saving to db! " + err
                                                    })
                                                }
                                              })  
                                } else {
                                    res.status(404).send({
                                        message: "error! in wallet creation! ",
                                        error:err
                                    })
                                }
                                });

                        } 
                })



     } //end of subwallets of creation**




}
