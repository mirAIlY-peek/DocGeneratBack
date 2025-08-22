import express from "express";
import bodyParser from "body-parser";
import contractRouter from "./contracts/contract.route";
import cors from 'cors'

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

// routes
app.use("/contracts", contractRouter);

export default app;
