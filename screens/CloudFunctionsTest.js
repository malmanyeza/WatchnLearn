import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { app } from '../FirebaseConfig';
import { getAuth, signInAnonymously } from 'firebase/auth';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: ''
 
});

const CloudFunctionTest = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testButton = async () => {
    console.log('Button pressed');
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
      });
      console.log('Chat completion:', chatCompletion);
    } catch (error) {
      console.error('Error occurred during chat completion:', error);
    }
  };
  


  const handleQuery = async (message) => {
    setLoading(true);
    setError(null);
  
    try {
      const auth = getAuth(app);
      await signInAnonymously(auth);
  
      const assistantId = "asst_JpvJ2N8wsEu9rZ99EV7z2pnm";
      const threadId = "thread_TBhCZdXvB2rQyO6iKMD48IMZ";
  
      // Create user message
      const threadMessages = await openai.beta.threads.messages.create(
        threadId,
        { role: 'user', content: message },
      );
  
      console.log('Thread messages:', threadMessages);
  
      // Create the run
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
      });
  
      // Poll for the completion of the run
      let runStatus = run.status;
      while (runStatus !== 'completed' && runStatus !== 'failed') {
        await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds before checking again
        const updatedRun = await openai.beta.threads.runs.retrieve(threadId, run.id);
        runStatus = updatedRun.status;
      }
  
      if (runStatus === 'completed') {
        console.log("Here is the runStatus:",runStatus)
        // Retrieve messages from the completed run
        const messagesResponse = await openai.beta.threads.messages.list(run.thread_id);
  
        // Prepare the response data
        let responseContent = '';
        messagesResponse.data.reverse().forEach(message => {
          if (message.role === 'system' || message.role === 'assistant') {
            responseContent += `${message.role} > ${message.content[0].text.value}\n`;
          }
        });
  
        // Update state with response
        setResult(responseContent.trim());
      } else {
        console.warn('Run did not complete:', runStatus);
        setError(`Run did not complete: ${runStatus}`);
      }
    } catch (error) {
      console.error('Error during assistant interaction:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Query the AI Assistant</Text>
      <TextInput
        placeholder="Enter your query"
        value={query}
        onChangeText={setQuery}
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, color: 'black', fontSize: 18 }}
      />
      <Button title="Send Query" onPress={testButton} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {result !== null && <Text style={{ marginTop: 10, fontSize: 18 }}>Result: {result}</Text>}
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  );
};

export default CloudFunctionTest;

