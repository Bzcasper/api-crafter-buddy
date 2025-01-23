export const processWithAI = async (content: string, instruction: string): Promise<string> => {
  console.log('Processing content with AI');
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that helps process and organize web content. Format the content according to the given template and instructions.'
          },
          {
            role: 'user',
            content: `Please process this content and organize it according to these instructions: ${instruction}\n\nContent: ${content}`
          }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to process content with AI');
    }

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error('Error in AI processing:', error);
    throw new Error('Failed to process content with AI: ' + error.message);
  }
};