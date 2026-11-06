// bring in the internet messenger
import axios from 'axios';

// one messenger with a base web address & a time limit
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // the practice website
  timeout: 10000, // wait up to 10 seconds
});

// ask the practice website for one sample update
export async function fetchSampleUpdate() {
  // request item number 1
  const response = await api.get('/todos/1');
  // return the title text from the answer
  return response.data.title as string;
}