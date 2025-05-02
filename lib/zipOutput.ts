import { createWriteStream } from 'fs';
import { zip } from 'zip-a-folder';

export const createZip = async (videoUrl: string, thumbnailPath: string): Promise<string> => {
  const zipFilePath = './data/output.zip';

  await zip(videoUrl, zipFilePath);
  await zip(thumbnailPath, zipFilePath);

  return zipFilePath; // Returns the ZIP file path
};
