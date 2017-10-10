const express = require('express');
const router = express.Router();

class Router {

    constructor() {
        this.router = router;
        this.getRoutes();
    }

    getRoutes() {
        router.get('/', (req, res) => {
            res.send('<h1>Hello this  is test route</h1>');
        })

        function ensureauth(req, res, next) {
            console.log("in the ensure auth method");
            next();
        }

        router.get('/wallet', ensureauth, (req, res) => {

        })

        router.get('/register', (req, res) => {

        })


        router.get('/login', (req, res) => {

        })

        router.get('/dashboard', ensureauth, (req, res) => {

        })

        router.get('/contact', ensureauth, (req, res) => {

        })
    }
}

module.exports = new Router().router;
