// bring in the test tools & the text block
import { render } from '@testing-library/react-native';
import ThemedText from '../ThemedText';

// check that the words appear on the page
test('shows the words', async () => {
  // draw the text block & keep its search tools
  const view = await render(<ThemedText>Hello there</ThemedText>);
  // look for those exact words
  expect(view.getByText('Hello there')).toBeTruthy();
});
