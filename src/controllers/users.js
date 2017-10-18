var User = require('../models/users');
var mongoose = require('mongoose');
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

    signup(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let mobilenumber = req.body.mobilenumber;
        let walletname = req.body.walletname;

        //to save
        var newuser = new User({
            username: username,
            walletname: walletname,
            password: password,
            email: email,
            mobilenumber: mobilenumber
        });
        client.createNewWallet(walletname, password, (err, wallet, backupInfo) => {
            if (wallet) {
                newuser.save((err, userdata) => {
                    if (userdata) {
                        res.status(200).send({
                            message: "wallet created & save"
                        })
                    } else {
                        res.status(404).send({
                            message: "error! in userdata saving to db! " + err
                        })
                    }
                })
            } else {
                res.status(404).send({
                    message: "error! in wallet creation! " + err
                })
            }
        });

    }


}
