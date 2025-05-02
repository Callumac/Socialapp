import { NextApiRequest, NextApiResponse } from 'next';
import { logJob } from '../../lib/db';
import { generateScript } from '../../lib/scriptGen';
import { generateVideo } from '../../lib/videoMaker';
import { generateThumbnail } from '../../lib/thumbnail';
import { generateSeo } from '../../lib/seo';
import { generateAudio } from '../../lib/tts';
import { createZip } from '../../lib/zipOutput';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, type } = req.body; // Expect topic and type in the body

  // Generate the content
  try {
    // Generate script, audio, video, thumbnail, SEO
    const script = await generateScript(topic, type);
    const audio = await generateAudio(script);
    const videoUrl = await generateVideo(script, audio);
    const thumbnail = await generateThumbnail(script);
    const seo = await generateSeo(topic);

    // Zip the content
    const zipUrl = await createZip(videoUrl, thumbnail);

    // Log the generation job
    await logJob(topic, type, 'completed', zipUrl);

    res.status(200).json({ zipUrl });

  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Content generation failed' });
  }
}
