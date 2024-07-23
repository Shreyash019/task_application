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
class Database {
    constructor() { }
    mongodbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let databaseURL = process.env.DATABASE_URL;
                if (!databaseURL) {
                    throw new Error('Database URL not found in environment variables');
                }
                yield mongoose_1.default.connect(databaseURL, {
                    socketTimeoutMS: 20000,
                });
                console.log("MongoDB connected successfully!...");
                return true;
            }
            catch (error) {
                console.error("Error connecting to MongoDB:", error);
            }
            mongoose_1.default.connection.on('error', (err) => {
                console.error("MongoDB connection error:", err);
            });
            mongoose_1.default.connection.on('disconnected', () => {
                console.error("MongoDB disconnected");
            });
            process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
                yield mongoose_1.default.connection.close();
                console.log("MongoDB connection closed due to app termination");
                return false;
            }));
        });
    }
}
exports.default = Database;
