import { Configuration, OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use your own API key for GPT-2 or GPT-3 model
});

export const generateScript = async (topic: string, type: string) => {
  const prompt = `Generate a ${type} about ${topic}`;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 500,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating script:', error);
    throw new Error('Failed to generate script');
  }
};
