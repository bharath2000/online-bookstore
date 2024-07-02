
import express, { Request, Response} from 'express'
import passport, { authorize } from 'passport';
import db from '../db';
import bcrypt from 'bcrypt'

const authRouter = express.Router()

console.log("authRouter called");
const dbConnection = new db();

const saltRounds = 10;

authRouter.get('/login', (req, res) => {
    console.log(req.user);
    res.send('login');
})

authRouter.get('/refresh', (req, res)=> {
    if(req.user) {
        res.json(req.user);
    }else{
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
})

authRouter.post('/signUp', async (req, res) => {
    // console.log(req.body);
    const { email, password, username} = req.body;
    try {
        bcrypt.genSalt(saltRounds, async (err, salt) => {
            if (err) {
                console.log('error while generating salt');
                return res.status(500).json({message: "Internal Error"}); 
            }
            // console.log(salt);
            // console.log(password);
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    console.log(err);
                    console.log('error while hashing');
                    return res.status(500).json({message: "Internal Error"});
                }
                // console.log('Hashed password:', hash);
                await dbConnection.createUser(email, hash, username);
                return res.status(200).json({message: "Successfully created User"});
            });   
        });
    } catch (error) {
        console.error(error);
        return res.status(403).json({message: "Operation Forbidden"})
    }
});
authRouter.get('/loginfailed', (req, res) => {
    // console.log(req);
    res.json({message: "invalid credentials"})
})

authRouter.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/auth/loginfailed', failureMessage: true}), (req, res) => {
        // console.log(req.user)
        res.json({message: "Login Successful", location: "/v1/home"});   
    }
);
authRouter.post('/logout', (req, res) => {
	res.clearCookie('connect.sid'); 
	req.logout(function(err: any) {
        if(err) {
            console.log(err);
            res.status(500).json({message: "Error while logging out"});
        }else{
            req.session.destroy(function (err: any) { // destroys the session
                res.json({message: "Logged Out"});
            });
        }
		
		
	});
});

export default authRouter

