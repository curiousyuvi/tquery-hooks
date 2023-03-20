import { StoryFn, Meta } from "@storybook/react";
import { CreateCharacterExample } from "./CreateCharacterExample";

type Args = { isLoading: boolean; hasError: boolean };

export default {
  title: "Example/CreateCharacter",
  component: CreateCharacterExample,
} as Meta<typeof CreateCharacterExample>;

const Template: StoryFn<typeof CreateCharacterExample> = (args) => (
  <CreateCharacterExample {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
