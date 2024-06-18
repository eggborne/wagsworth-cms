import { AccordionChevron, Container, Collapse, Flex, TextInput, Textarea, Title, Divider } from "@mantine/core"
import { SectionData } from "../types"
import { useDisclosure } from "@mantine/hooks"
import { ServicePriceList } from "./ServicePriceList";

interface InputSectionProps {
  sectionData: SectionData,
}

export const InputSection = ({ sectionData }: InputSectionProps) => {

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div style={{ backgroundColor: '#333' }}>
      <Title
        onClick={toggle}
        order={1}
        bg='#ffffff22'
        style={{
          height: '4.2rem',
          cursor: 'pointer',
          textAlign: 'center',
          margin: '0',
          padding: '0',
          fontSize: '1.35rem',
          color: '#afa',
        }}
      >
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          style={{
            height: '100%',
          }}
        >
          <AccordionChevron size={24} style={{ rotate: opened ? '180deg' : '0deg', transition: 'rotate 500ms ease' }} />
          {sectionData.label}
          <AccordionChevron size={24} style={{ rotate: opened ? '-180deg' : '0deg', transition: 'rotate 500ms ease' }} />
        </Flex>
      </Title>
      <Collapse
        in={opened}
        transitionDuration={500}
        style={{ marginBottom: '1.5rem' }}
      >
        <Container
          style={{
            display: 'Flex',
            flexDirection: 'column',
            padding: '0 1rem',
          }}
        >
          <TextInput
            // label={'Section name'}
            description={`/${sectionData.href}`}
            placeholder={`${sectionData.href[0].toUpperCase() + sectionData.href.slice(1)}`}
            defaultValue={sectionData.label}
            styles={{
              input: { height: 'min-content', width: '12rem', padding: '0rem 0.75rem', fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' },
              root: { alignSelf: 'center', textAlign: 'center', margin: '0.5rem' },
            }}
          />
          {sectionData.note &&
            <Textarea
              autosize
              label={<Divider m={0} p={0} styles={{ label: { fontSize: '1.1rem', color: '#afa' }, root: { height: '3rem' } }} label="Note" labelPosition="center" />}
              placeholder={'Placeholder text'}
              defaultValue={sectionData.note.map((paragraph) => paragraph).join('\n\n')}
              styles={{
                input: { padding: '1rem 0.75rem' },
                label: { width: '100%', height: '2rem' },
              }}
            />
          }
          {sectionData.slides &&
            <div>
              <Divider p={6} m={0} styles={{ label: { fontSize: '1.5rem', color: '#afa' }, root: { height: '3rem' } }} label="Main Services" labelPosition="center" />

              {Object.values(sectionData.slides).map(service =>
                <div key={service.headline}>
                  <TextInput
                    label={'Service name'}
                    placeholder={'Placeholder text'}
                    defaultValue={service.headline}
                    styles={{
                      input: { width: '12rem', padding: '1rem 0.75rem', fontSize: '1.25rem', fontWeight: 'bold' },
                      root: { height: '4.5rem' }
                    }}
                  />
                  <Textarea
                    autosize
                    label={'Service description'}
                    placeholder={'Placeholder text'}
                    defaultValue={service.textContent.map((paragraph) => paragraph).join('\n\n')}
                    styles={{
                      input: { padding: '1rem 0.75rem' }
                    }}
                  />
                </div>
              )}
            </div>
          }
          {sectionData.pricedServices &&
            <ServicePriceList pricedServices={sectionData.pricedServices} pricedServicesLabel={sectionData.pricedServicesLabel} />
          }
          {sectionData.textContent &&
            <Textarea
              autosize
              placeholder={'Placeholder text'}
              defaultValue={sectionData.textContent.map((paragraph) => paragraph).join('\n\n')}
              styles={{
                input: { padding: '1rem 0.75rem' }
              }}
            />
          }

        </Container>
      </Collapse>
    </div>
  )
}