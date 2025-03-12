import { OpenAI } from 'openai';
import { streamText } from 'ai';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Get the user session to ensure they're authenticated
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    // If no session, user is not authenticated
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get the prompt from the request body
    const { messages } = await req.json();

    // Use streamText from the AI SDK to handle streaming
    const { textStream, data } = streamText({
      model: openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: messages,
      }),
    });

    // Return a streaming response
    return data.toDataStreamResponse(textStream);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return new Response('Error processing your request', { status: 500 });
  }
}
