import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from './db';


export default function initPassport() {
    // console.log("passport called")
    const dbConnection = new db();
    passport.use(new LocalStrategy( function verify(email, password, cb)  {
        // console.log(email);
        dbConnection.getUser('SELECT * FROM users WHERE email = $1', [ email ], function(err, user) {
          if (err) { return cb(err); }
         
          if (user.length==0) { return cb(null, false, {message: "Invalid Password"}); }
          const firstUser = user[0]
          
          bcrypt.compare(password, firstUser.password, (err, result) => {
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
            return cb(null, false, {message: "Invalid Password"});
          });
        });
      })
    );
   
 
    passport.serializeUser(function(user: any, cb : (err: any, user: any) => any ) {
      process.nextTick(function() {
        // console.log("seriliaze user");
        // console.log(user);
        cb(null, {
          id: user.id,
          username: user.name
        });
      });
    });

    passport.deserializeUser(function(user: any, cb: (err: any, user: any) => any) {
      // console.log("deserialize")
      process.nextTick(function() {
        // console.log("deserialize")
        return cb(null, user);
      });
    });
    
}
