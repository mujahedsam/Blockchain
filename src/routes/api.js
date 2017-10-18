const express = require('express');
const router = express.Router();
import {
    Users
} from "../controllers/users.js";
import {
    Login
} from "../controllers/login.js";
import {
     Managewallet
} from "../controllers/Managewallet.js";
import {
      Settings
} from "../controllers/settings.js";


class Api {

    constructor() {
        this.router = router;
        this.postRoutes();
        this.usersobj = new Users();
        this.loginobj=new Login();
        this.mwobj=new Managewallet();
        this.setobj=new Settings();
    }

    postRoutes() {
        //this routes can be tested in POSTMAN!!
        router.post('/test', (req, res) => {
            console.log(req.body.role + req.body.userName + req.body.password + "bodydata");
            res.status(200).send({
                message: "holaaaa!! test successfull!"
            })
        })

        router.post('/login',(req,res)=>{
            this.loginobj.login(req,res);
        })

        router.post('/signup', (req, res) => {
            this.usersobj.registrations(req,res);
        })

        router.post('/walletcreation', (req, res) => {
            this.usersobj.wallets(req,res);
        })

        router.post('/managewallet', (req, res) => {
            this.mwobj.managewallet(req,res);
        })

        router.post('/generateaddress', (req, res) => {
            this.mwobj.generateaddress(req,res);
        })

        router.post('/send', (req, res) => {
            this.mwobj.send(req,res);
        })

         router.post('/history', (req, res) => {
            this.mwobj.history(req,res);
        })

        router.post('/settings', (req, res) => {
            this.setobj.settings(req,res);
        })
    }
}

module.exports = new Api().router;
