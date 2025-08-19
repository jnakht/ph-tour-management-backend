/* eslint-disable no-console */

import { Server } from 'http'
import mongoose from "mongoose";
import app from "./app";
import { envVars } from './app/config/env';


let server : Server;


const startServer = async() => {
    try {
        await mongoose.connect(envVars.DB_URL);
        console.log("Connected to DB!");

        server = app.listen(5000, () => {
            console.log("Server is listening on port: 5000");
        })
    } catch (error) {
        console.log(error);
    }
}
startServer();


//  three types of error
// * unhandled rejection error 
// * uncaught exception error
// * signal termination sigterm 

process.on("unhandledRejection", (err) => {
    console.log('Unhandled Rejection Detected, Server Shutting Down', err);
    if (server) {
        server.close( () => {
            process.exit(1);
        })
    }
    process.exit(1);
})


process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception Detected, Server is shutting Down!", err);
    if (server) {
        server.close( () => {
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on("SIGTERM", () => {
    console.log("Sigterm signal detected... Server is shutting down!");
    if (server) {
        server.close( () => {
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on('SIGINT', () => {
    console.log("SigInt signal Detected... Server is shutting down!");
    if (server) {
        server.close( () => {
            process.exit(1);
        })
        process.exit(1);
    }
})

// unhandled rejection error 
// Promise.reject(new Error("I forgot to catch this promise!"));


// uncaught exception error
// throw new Error("I forgot to catch this exception");


