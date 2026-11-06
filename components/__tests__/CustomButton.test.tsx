// bring in the test tools & the button
import { fireEvent, render } from '@testing-library/react-native';
import CustomButton from '../CustomButton';

// check that a press runs the button action
test('runs the press action', async () => {
  // a pretend action we can count
  const onPress = jest.fn();
  // draw the button & keep its search tools
  const view = await render(<CustomButton title="Press me" onPress={onPress} />);
  // press the words on the button
  fireEvent.press(view.getByText('Press me'));
  // the action should have run once
  expect(onPress).toHaveBeenCalledTimes(1);
});
