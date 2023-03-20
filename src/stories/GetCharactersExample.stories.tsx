import { GetCharactersExample } from "./GetCharactersExample";
import { StoryFn, Meta } from "@storybook/react";

type Args = { isLoading: boolean; hasError: boolean };

export default {
  title: "Example/GetCharacters",
  component: GetCharactersExample,
} as Meta<typeof GetCharactersExample>;

const Template: StoryFn<typeof GetCharactersExample> = (args) => (
  <GetCharactersExample />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
