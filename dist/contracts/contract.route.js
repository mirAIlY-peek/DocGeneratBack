"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contracts_controller_1 = require("./contracts.controller");
const router = (0, express_1.Router)();
router.post('/generate', contracts_controller_1.generateContracts);
// router.post('/preview', previewContract);
exports.default = router;
