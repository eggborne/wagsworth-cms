import { Paper, TextInput } from "@mantine/core"

interface InputSectionProps {
  sectionData: any,
}

export const InputSection = ({ sectionData }: InputSectionProps) => {

  return (
    <Paper
      withBorder
      shadow="md"
      p="sm"
      styles={theme => ({
        root: {
          backgroundColor: theme.colors.dark[1],
          color: theme.black,
          justifyContent: 'flex-start'
        }
      })}
    >
      <TextInput
        label="Input label"
        description="Input description"
        placeholder={'Placeholder text'}
        defaultValue={'Default value'}
      />
    </Paper>
  )
}