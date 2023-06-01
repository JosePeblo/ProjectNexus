import nodemailer from 'nodemailer';
// import 'dotenv/config';
let transporter = nodemailer.createTransport({
    host: process.env.PN_MAIL_HOST,
    port: 587,
    secure: false,
    tls: {
        ciphers: 'SSLv3',
    },
    auth: {
        user: process.env.PN_MAIL_ACC,
        pass: process.env.PN_MAIL_PSW,
    },
});

// const foo = async () => {
//     let info = await transporter.sendMail({
//         from: process.env.PN_MAIL_ACC,
//         to: "josepabloxddd@gmail.com",
//         subject: "Testing conf",
//         text: "Hi",
//         html: "<b>Testing</b>"
//     });
//     console.log(`Message sent: ${info.messageId}`);
// }


import type { RequestHandler } from 'express';
import bycrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import 'dotenv/config';


import EmailValidation from '../models/emailValidation.model';
import User from '../models/user.model';


export const loginPage: RequestHandler = (req, res) => {
    res.render('emailValidation');
    // res.render('login');
}

export const signupPage: RequestHandler = (req, res) => {
    res.render('signup');
}

export const login: RequestHandler = (req, res) => {
    res.send('welcome')
}

export const signup: RequestHandler = async (req, res) => {
    const { email, password, confirmation } = req.body;
    
    if(!(email && password && confirmation && (password === confirmation))){
        res.render('signup');
        return
    }

    const user = await User.exists( { email: email } );

    if(user){
        // TODO user already exists
        res.render('signup');
        return
        
    } else {
        const vc = Math.random().toString(32).substring(2, 7);
        const hashed = await bycrypt.hash(password, 12);

        const validation = await EmailValidation.create({
            email: email,
            password: hashed,
            code: vc,
        });

        // const validationToken = jwt.sign({
        //     valId: validation.id

        // },
        // process.env.PN_ACC_JWT_SECRET,
        // { expiresIn: "300s"});

        res.cookie('validation', validation.id);

        let info = await transporter.sendMail({
            from: process.env.PN_MAIL_ACC,
            to: email,
            subject: `Project Nexus`,
            text: `Hi`,
            html: `Your confirmation code is <b>${vc}</b>`,
        });
        console.log(`Message sent: ${info.messageId}`);
        res.render('emailValidation');

    }
}

export const verification: RequestHandler = async (req, res) => {
    const { vc } = req.body;
    const { validation } = req.cookies

    console.log(validation);
    try {
        const emailVal = await EmailValidation.findById(validation);
        if(emailVal && vc){
            if(emailVal.code === req.body.vc){
                return res.json({a: 'user created'});
            } else {
                return res.json({a: 'Invalid code'});
            }
        }
    } catch (err) {
        
    }
    

    res.cookie('lol', 'mimi')
    return res.json({m:'no val or verification'})
    
    
}




// require('dotenv').config();

// /** @type {import("express").RequestHandler} */
// exports.login =  (req, res) => {
//     try {
//         res.oidc.login({
//             returnTo : '/user',
//             authorizationParams: {
//                 response_type: 'code id_token',
//                 redirect_uri: process.env.REDIRECT_URI || 'http://localhost:3000/callback',
//                 scope: 'openid profile email name picture middle_name',
//                 nonce: '',
//                 prompt: 'login',
//             },
//         })
//     } catch (error) {
//         console.log(error);
//         res.redirect('/');
//         // res.sendStatus(502);
//     }
// }

// /** @type {import("express").RequestHandler} */
// exports.postCallback = (req, res) =>{
//     try{
//         res.oidc.callback({
//             redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/callback',
//         });
//     } catch(error){
//         console.log(error);
//         res.status(error.status || 500).end(error.message);
//     }
// }

// /** @type {import("express").RequestHandler} */
// exports.getCallback = (req, res) => {
//     try{
//         res.oidc.callback({
//             redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/callback'
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(error.status || 500).end(error.message);
//     }
// }

// /** @type {import("express").RequestHandler} */
// exports.callbackState = async (req, res) => {
//     let { token_type, access_token, isExpired, refresh } = req.oidc.accessToken;
//     if (isExpired()) {
//         ({ access_token } = await refresh());
//     } else{
//         res.redirect('/');
//     }
// }