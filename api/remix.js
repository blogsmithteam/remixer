import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { text } = req.body

  if (!text) {
    return res.status(400).json({ message: 'Text is required' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Please remix the following text in a creative way, maintaining the core meaning but expressing it differently: ${text}`
        }]
      })
    })

    const data = await response.json()
    const remixedText = data.content[0].text

    res.status(200).json({ remixedText })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Error processing request' })
  }
} 