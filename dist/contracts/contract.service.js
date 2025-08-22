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
exports.createContractDoc = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pizzip_1 = __importDefault(require("pizzip"));
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const createContractDoc = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templatePath = path_1.default.join(__dirname, "../../template/example.docx");
        if (!fs_1.default.existsSync(templatePath)) {
            throw new Error(`Template file not found at path: ${templatePath}`);
        }
        const content = fs_1.default.readFileSync(templatePath, "binary");
        const zip = new pizzip_1.default(content);
        const doc = new docxtemplater_1.default(zip, {
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
    }
    catch (error) {
        console.error('Error creating DOCX:', error);
        throw new Error(`Failed to create document: ${error.message}`);
    }
});
exports.createContractDoc = createContractDoc;
const validateAndCleanData = (data) => {
    const cleanData = {};
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
        }
        else {
            cleanData[field] = `[${field}]`;
        }
    });
    return cleanData;
};
