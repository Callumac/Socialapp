export const generateSeo = (topic: string) => {
  const hashtags = ['#AI', `#${topic.replace(' ', '')}`, '#ContentCreation', '#Viral'];
  const caption = `Check out this amazing video on ${topic}. #AIContent #GeneratedContent`;

  return { hashtags, caption };
};
