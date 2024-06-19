import { Flex, Textarea } from "@mantine/core"
import { HeadLineBodySet } from "../types"

interface HeadLineBodyInputProps {
  headlineBodySet: HeadLineBodySet;
  order: number;
}

export const HeadlineBodyInput = ({ headlineBodySet, order }: HeadLineBodyInputProps) => {
  return (
    <Flex key={order} direction="column" gap="xs">
      <Textarea autosize label={`Headline ${order + 1}`} defaultValue={headlineBodySet.headline}></Textarea>
      <Textarea autosize label={`Body ${order +  1}`} defaultValue={headlineBodySet.bodyText}></Textarea>
    </Flex>
  )
}