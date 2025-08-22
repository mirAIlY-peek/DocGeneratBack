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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContracts = void 0;
const contract_service_1 = require("./contract.service");
const generateContracts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                error: "No data provided for template rendering"
            });
        }
        const docBuffer = yield (0, contract_service_1.createContractDoc)(data);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        res.setHeader("Content-Disposition", `attachment; filename=contract_${data.contract_number || "document"}.docx`);
        res.setHeader("Content-Length", docBuffer.length.toString());
        res.send(docBuffer);
    }
    catch (err) {
        console.error("Error generating contract:", {
            message: err.message,
            stack: err.stack,
            data: req.body
        });
        res.status(500).json({
            error: "Failed to generate contract document.",
            details: err.message
        });
    }
});
exports.generateContracts = generateContracts;
