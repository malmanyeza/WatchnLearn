// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const OpenAI = require('openai');

admin.initializeApp();

const openai = ''

exports.mathTutor = functions.https.onCall(async (data, context) => {
  console.log('Received data:', data);

  const { message } = data;
  if (typeof message !== 'string') {
    console.log('Invalid message type');
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a message string.');
  }

  try {
    console.log('Creating Assistant...');
    const assistantId = 'asst_nTz9r07HYI71crAK3IJkjDgY';
    const threadId = 'thread_7KF77qWSz0CBMQQX8NtcMC0g'

    console.log('Thread ID:', threadId);
    console.log('Adding Message...');
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    console.log('Running Thread...');
    const run = await openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistantId,
    });

    console.log('Run Status:', run.status);
    if (run.status === 'completed') {
      console.log('Fetching Messages...');
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      console.log('Messages:', messages.data);

      const latestAssistantMessage = messages.data.reverse()
        .filter(msg => msg.role === 'assistant' && msg.content && msg.content.length > 0)
        .map(msg => msg.content[0].text.value)
        .pop();

      if (latestAssistantMessage) {
        return { response: latestAssistantMessage };
      } else {
        throw new Error('No valid assistant message found');
      }
    } else {
      throw new Error(`Run status: ${run.status}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
  
