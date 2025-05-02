import { createCanvas, loadImage } from 'canvas';

export const generateThumbnail = async (script: string): Promise<string> => {
  const canvas = createCanvas(1280, 720); // Set dimensions for the thumbnail
  const ctx = canvas.getContext('2d');

  // Draw background and text
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = 'bold 50px Arial';
  ctx.fillText(script.slice(0, 40), 50, 350);

  const thumbnailPath = './data/generated_thumbnail.png';
  const buffer = canvas.toBuffer('image/png');

  // Save image
  await require('fs').promises.writeFile(thumbnailPath, buffer);

  return thumbnailPath;
};
