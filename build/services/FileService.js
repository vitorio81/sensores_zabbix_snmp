"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileService {
    static ensureDirExists() {
        if (!fs_1.default.existsSync(this.baseDir)) {
            fs_1.default.mkdirSync(this.baseDir, { recursive: true });
        }
    }
    static writeFile(fileName, content) {
        this.ensureDirExists();
        const filePath = path_1.default.join(this.baseDir, fileName);
        fs_1.default.writeFileSync(filePath, content);
    }
}
exports.FileService = FileService;
FileService.baseDir = path_1.default.resolve("sensores");
