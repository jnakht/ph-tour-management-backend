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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const something = "lfdfd";
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://mongodb:jrjisan523296@cluster0.gtqywnt.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to DB!");
        server = app_1.default.listen(5000, () => {
            console.log("Server is listening on port: 5000");
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
//  three types of error
// * unhandled rejection error 
// * uncaught exception error
// * signal termination sigterm 
process.on("unhandledRejection", (err) => {
    console.log('Unhandled Rejection Detected, Server Shutting Down', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception Detected, Server is shutting Down!", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("SIGTERM", () => {
    console.log("Sigterm signal detected... Server is shutting down!");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('SIGINT', () => {
    console.log("SigInt signal Detected... Server is shutting down!");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
        process.exit(1);
    }
});
// unhandled rejection error 
// Promise.reject(new Error("I forgot to catch this promise!"));
// uncaught exception error
// throw new Error("I forgot to catch this exception");
