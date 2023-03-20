import { StoryFn, Meta } from "@storybook/react";
import { UpdateCharacterExample } from "./UpdateCharacterExample";

type Args = { isLoading: boolean; hasError: boolean };

export default {
  title: "Example/UpdateCharacter",
  component: UpdateCharacterExample,
} as Meta<typeof UpdateCharacterExample>;

const Template: StoryFn<typeof UpdateCharacterExample> = (args) => (
  <UpdateCharacterExample {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
