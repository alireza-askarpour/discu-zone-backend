import { Injectable } from '@nestjs/common';
import { promises as fs, constants, Stats } from 'fs';

@Injectable()
export class FileService {
  async checkFileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath, constants.F_OK);
      return true;
    } catch (e) {
      return false;
    }
  }

  async removeByPath(pathFile: string): Promise<void> {
    try {
      await fs.unlink(pathFile);
    } catch (error) {}
  }

  async getStat(targetPath: string): Promise<Stats> {
    return fs.stat(targetPath);
  }
}
