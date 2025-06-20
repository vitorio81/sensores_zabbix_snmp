import fs from "fs";
import path from "path";

export class FileService {
  static baseDir = path.resolve("sensores");

  static ensureDirExists() {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  static writeFile(fileName: string, content: string) {
    this.ensureDirExists();
    const filePath = path.join(this.baseDir, fileName);
    fs.writeFileSync(filePath, content);
  }
}
