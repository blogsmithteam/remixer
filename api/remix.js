import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    const completion = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Please remix the following text to make it more engaging and creative, while maintaining its core message: ${text}`
      }]
    });

    return res.status(200).json({ remixedText: completion.content[0].text });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error processing your request' });
  }
} 