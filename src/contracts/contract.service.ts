import fs from 'fs';
import path from 'path';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export const createContractDoc = async (data: Record<string, any>): Promise<Buffer> => {
    try {
        const templatePath = path.join(__dirname, "template/example.docx");

        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template file not found at path: ${templatePath}`);
        }

        const content = fs.readFileSync(templatePath, "binary");

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        const cleanData = validateAndCleanData(data);

        doc.render(cleanData);

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
            compressionOptions: {
                level: 6
            }
        });

        return buf;

    } catch (error: any) {
        console.error('Error creating DOCX:', error);
        throw new Error(`Failed to create document: ${error.message}`);
    }
}


const validateAndCleanData = (data: Record<string, any>): Record<string, any> => {
    const cleanData: Record<string, any> = {};

    // Список ожидаемых полей
    const expectedFields = [
        'contract_number',
        'city',
        'customer_name',
        'executor_name',
        'service_description',
        'price_num',
        'price_text',
        'deadline'
    ];

    expectedFields.forEach(field => {

        if (data[field] && typeof data[field] === 'string') {
            cleanData[field] = data[field].trim();
        } else {

            cleanData[field] = `[${field}]`;
        }
    });

    return cleanData;
}
