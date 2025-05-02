import gTTS from 'gtts';

export const generateAudio = async (script: string): Promise<string> => {
  const tts = new gTTS(script);
  const audioFilePath = './data/generated_audio.mp3'; // Path to store the audio temporarily

  return new Promise((resolve, reject) => {
    tts.save(audioFilePath, (err) => {
      if (err) reject('Error generating audio');
      else resolve(audioFilePath);
    });
  });
};
