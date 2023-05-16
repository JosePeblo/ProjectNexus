import express from 'express';
import fileUpload from 'express-fileupload';
import jwt from 'jsonwebtoken';
//JWT secret = PN_ACC_JWT_SECRET=random chain
import cookieParser from 'cookie-parser';
import session from 'express-session';

import path from 'path';
import 'dotenv/config';




const { initRoutes } = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;
const config = {
  authRequired: false,
  idpLogout: true,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  secret: process.env.SECRET,
  routes: {
    login: false,
  },
};
app.use(auth(config));

app.set('view engine', 'ejs');
app.set('views', 'views/partials');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler = (error, req, res, next) => {
  if (req.url === 'http://localhost:3000/callback') {
    res.redirect('/logout');
  }
  
  else {
    // Handler for user rejecting authorization
    if (error.error_description == 'User did not authorize the request' ||
        error.error == 'access_denied' ){
      res.redirect('/logout');
    }
    else{
      try{
        app.use(auth(config));
      }

      catch(error){
        console.log("Should not have arrived here");
        res.redirect('/');
      }

    }
    next(error);
  }

});

app.use(session({
  secret: 'ed841c17-c1f7-4389-8b21-f3bdaa4460d8', 
  resave: false, 
  saveUninitialized: false, 
}));

app.set(cookieParser('name', 'value', { sameSite: 'none', secure: true }));

initRoutes(app);

app.listen(PORT, () => { 
  console.log(`Server listening in http://localhost:${PORT}`); 
});
