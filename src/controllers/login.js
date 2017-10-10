var mongoose = require('mongoose');
var User = require('../models/users');
var Wallets = require('../models/wallets')
var promise = require('promise');
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

export class Login{

	constructor() {

    }
    //***login functionality after registration*****
    login(req,res){
            return new promise((resolve, reject)=>{
                    let username = req.body.username;
                    let password = req.body.password;
                     User.find({"username":username},(err,data)=>{
                          if(data.length>=1){

                                    bcrypt.compare(password,data[0].password, function(err, result) {
                                                if(result){
                                                    resolve(data);
                                                }
                                                else{
                                                 res.status(404).send({
                                                 message: "Invalid login details"
                                                     })
                                                 }
                                        });
                          }else if(data==null){
                            console.log("no user exists its null");
                            res.status(404).send({
                                 message: "Invalid login details"
                                     })
                          }else{
                            console.log("error in login");
                            res.status(404).send({
                                 message: "Invalid login details"
                                     })
                          }
                     })

            }).then((userdata)=>{
                        //to fetch all the subwallets of logged in user
                         Wallets.find({"username":userdata[0].username},(err,wdata)=>{
                             if(wdata.length>=1){
                                res.status(200).send({
                                        message: "welcome! "+userdata[0].username+" you are logged in",
                                        data: userdata,
                                        walletdata:wdata
                                    })
                             }else if(err){
                                res.status(404).send({
                                            message: "failed to fetch wallet details",
                                            data:userdata
                                 })
                             }else{
                                res.status(200).send({
                                    message: "welcome! "+userdata[0].username+" you are logged in",
                                    message2: "No wallets exists",
                                    data:userdata
                                })
                             }
                         })
                    })

        }

}
 