"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authRouter = express_1.default.Router();
console.log("authRouter called");
const dbConnection = new db_1.default();
const saltRounds = 10;
authRouter.get('/login', (req, res) => {
    console.log(req.user);
    res.send('login');
});
authRouter.get('/refresh', (req, res) => {
    if (req.user) {
        res.json(req.user);
    }
    else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});
authRouter.post('/signUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { email, password, username } = req.body;
    try {
        bcrypt_1.default.genSalt(saltRounds, (err, salt) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log('error while generating salt');
                return res.status(500).json({ message: "Internal Error" });
            }
            // console.log(salt);
            // console.log(password);
            bcrypt_1.default.hash(password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                    console.log('error while hashing');
                    return res.status(500).json({ message: "Internal Error" });
                }
                // console.log('Hashed password:', hash);
                yield dbConnection.createUser(email, hash, username);
                return res.status(200).json({ message: "Successfully created User" });
            }));
        }));
    }
    catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Operation Forbidden" });
    }
}));
authRouter.get('/loginfailed', (req, res) => {
    // console.log(req);
    res.json({ message: "invalid credentials" });
});
authRouter.post('/login/password', passport_1.default.authenticate('local', { failureRedirect: '/auth/loginfailed', failureMessage: true }), (req, res) => {
    // console.log(req.user)
    res.json({ message: "Login Successful", location: "/v1/home" });
});
authRouter.post('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    req.logout(function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Error while logging out" });
        }
        else {
            req.session.destroy(function (err) {
                res.json({ message: "Logged Out" });
            });
        }
    });
});
exports.default = authRouter;
