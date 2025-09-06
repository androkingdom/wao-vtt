import fs from "fs/promises";
import path from "path";

export class FileService {
  static uploadDir = path.join(process.cwd(), "public/uploads");
  static maxSize = 5 * 1024 * 1024; // 5MB default

  static configure({ uploadDir, maxSizeMB } = {}) {
    if (uploadDir) this.uploadDir = path.join(process.cwd(), uploadDir);
    if (maxSizeMB) this.maxSize = maxSizeMB * 1024 * 1024;
  }

  static async ensureUploadDir() {
    await fs.mkdir(this.uploadDir, { recursive: true });
  }

  static async saveFiles(files) {
    await this.ensureUploadDir();
    const savedPaths = [];

    for (const file of files) {
      if (file.size > this.maxSize) {
        throw new Error(
          `File ${file.name} exceeds ${this.maxSize / 1024 / 1024}MB`
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(
        this.uploadDir,
        `${file.name}-${Date.now()}.${file.type.split("/")[1]}`
      );

      await fs.writeFile(filePath, buffer);
      savedPaths.push(filePath);
    }

    return savedPaths;
  }

  static async deleteFiles(filePaths) {
    for (const filePath of filePaths) {
      try {
        await fs.unlink(filePath);
      } catch {
        console.warn(`Failed to delete ${filePath}`);
      }
    }
  }

  static async clearAll() {
    await fs.rm(this.uploadDir, { recursive: true, force: true });
    await this.ensureUploadDir();
  }
}
