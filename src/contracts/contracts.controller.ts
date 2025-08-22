import {Request, Response} from "express";
import {createContractDoc} from "./contract.service";

export const generateContracts = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                error: "No data provided for template rendering"
            });
        }

        const docBuffer = await createContractDoc(data);

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        res.setHeader("Content-Disposition", `attachment; filename=contract_${data.contract_number || "document"}.docx`);
        res.setHeader("Content-Length", docBuffer.length.toString());

        res.send(docBuffer);


    } catch (err: any) {
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
}
