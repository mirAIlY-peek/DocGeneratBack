import {Router} from "express";
import {generateContracts} from "./contracts.controller";

const router = Router();

router.post('/generate', generateContracts);
// router.post('/preview', previewContract);

export default router;
