import { StoryFn, Meta } from "@storybook/react";
import { GetCharacterExample } from "./GetCharacterExample";

type Args = { isLoading: boolean; hasError: boolean };

export default {
  title: "Example/GetCharacter",
  component: GetCharacterExample,
} as Meta<typeof GetCharacterExample>;

const Template: StoryFn<typeof GetCharacterExample> = (args) => (
  <GetCharacterExample {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
