"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const contract_route_1 = __importDefault(require("./contracts/contract.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.use("/contracts", contract_route_1.default);
exports.default = app;
