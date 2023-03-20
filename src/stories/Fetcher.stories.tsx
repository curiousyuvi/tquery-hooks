import { Fetcher } from "./Fetcher";
import { StoryFn, Meta } from "@storybook/react";

type Args = { isLoading: boolean; hasError: boolean };

export default {
  title: "Example/Fetcher",
  component: Fetcher,
} as Meta<typeof Fetcher>;

const Template: StoryFn<typeof Fetcher> = (args) => <Fetcher />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
