import * as path from 'path';
import { promises } from 'fs';
import { diskStorage } from 'multer';

import {
  nanoid,
  alphabetNumber,
  alphabetLowerCaseLetters,
} from './nanoid.util';

const createRoute = (dirName: string) => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const directory = path.join('uploads', dirName, year, month, day);
  return directory;
};

async function ensureDirectoryExists(directory: string) {
  try {
    await promises.access(directory);
  } catch (error) {
    try {
      await promises.mkdir(directory, { recursive: true });
    } catch (mkdirError) {
      throw mkdirError;
    }
  }
}

export function fileStorage(dirName: string, directoryFormat?: 'date') {
  return diskStorage({
    destination: async function (req, file, cb) {
      const uploadDir = directoryFormat
        ? createRoute(dirName)
        : path.join('uploads', dirName);
      try {
        await ensureDirectoryExists(uploadDir);
      } catch (error) {
        return cb(error, null);
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const filename = nanoid(alphabetNumber + alphabetLowerCaseLetters, 16);
      const extname = path.extname(file.originalname);
      cb(null, filename + extname);
    },
  });
}
