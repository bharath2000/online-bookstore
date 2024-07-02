"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("./db"));
function initPassport() {
    // console.log("passport called")
    const dbConnection = new db_1.default();
    passport_1.default.use(new passport_local_1.Strategy(function verify(email, password, cb) {
        // console.log(email);
        dbConnection.getUser('SELECT * FROM users WHERE email = $1', [email], function (err, user) {
            if (err) {
                return cb(err);
            }
            if (user.length == 0) {
                return cb(null, false, { message: "Invalid Password" });
            }
            const firstUser = user[0];
            bcrypt_1.default.compare(password, firstUser.password, (err, result) => {
                if (err) {
                    // Handle error
                    console.error('Error comparing passwords:', err);
                    return cb(err);
                }
                if (result) {
                    // Passwords match, authentication successful
                    console.log('Passwords match! User authenticated.');
                    return cb(null, firstUser);
                }
                return cb(null, false, { message: "Invalid Password" });
            });
        });
    }));
    passport_1.default.serializeUser(function (user, cb) {
        process.nextTick(function () {
            // console.log("seriliaze user");
            // console.log(user);
            cb(null, {
                id: user.id,
                username: user.name
            });
        });
    });
    passport_1.default.deserializeUser(function (user, cb) {
        // console.log("deserialize")
        process.nextTick(function () {
            // console.log("deserialize")
            return cb(null, user);
        });
    });
}
exports.default = initPassport;
