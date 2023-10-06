import { Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class FileService {
  checkFileExists(filePath: string) {
    return existsSync(filePath);
  }

  removeByPath(filePath: string) {
    if (existsSync(filePath)) unlinkSync(filePath);
  }
}
