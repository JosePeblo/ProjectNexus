import express from 'express';
import fileUpload from 'express-fileupload';
// import jwt from 'jsonwebtoken';
// //JWT secret = PN_ACC_JWT_SECRET=random chain
// import cookieParser from 'cookie-parser';
// import session from 'express-session';

import path from 'path';
import 'dotenv/config';

import initRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'page', 'views'));

app.use(express.static(path.join(__dirname, '..', 'page', 'public')));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

initRoutes(app);

app.listen(PORT, () => { 
    console.log(`Server listening in http://localhost:${PORT}`); 
});

// app.use(cookieParser());


// app.use(errorHandler = (error, req, res, next) => {
//   if (req.url === 'http://localhost:3000/callback') {
//     res.redirect('/logout');
//   }
  
//   else {
//     // Handler for user rejecting authorization
//     if (error.error_description == 'User did not authorize the request' ||
//         error.error == 'access_denied' ){
//       res.redirect('/logout');
//     }
//     else{
//       try{
//         app.use(auth(config));
//       }

//       catch(error){
//         console.log("Should not have arrived here");
//         res.redirect('/');
//       }

//     }
//     next(error);
//   }
// });

// app.use(session({
//   secret: 'ed841c17-c1f7-4389-8b21-f3bdaa4460d8', 
//   resave: false, 
//   saveUninitialized: false, 
// }));

// app.set(cookieParser('name', 'value', { sameSite: 'none', secure: true }));
