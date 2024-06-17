import { AccordionChevron, Collapse, Flex, TextInput, Textarea, Title } from "@mantine/core"
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
          height: '5rem',
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
          <AccordionChevron size={24} style={{ rotate: opened ? '180deg' : '0deg', transition: 'rotate 500ms ease'}} />
          {sectionData.label}
          <AccordionChevron size={24} style={{ rotate: opened ? '-180deg' : '0deg', transition: 'rotate 500ms ease'}} />
        </Flex>
      </Title>
      <Collapse
        in={opened}
        transitionDuration={500}
      >
        {sectionData.note &&
          <Textarea
            autosize
            label={'Note'}
            placeholder={'Placeholder text'}
            defaultValue={sectionData.note.map((paragraph) => paragraph).join('\n\n')}
            styles={{
              input: { padding: '1rem 0.75rem' }
            }}
          />
        }
        {sectionData.textContent &&
          <Textarea
            autosize
            label={sectionData.label}
            placeholder={'Placeholder text'}
            defaultValue={sectionData.textContent.map((paragraph) => paragraph).join('\n\n')}
            styles={{
              input: { padding: '1rem 0.75rem' }
            }}
          />
        }
        {sectionData.slides &&
          <div>
            <Title order={1} style={{ height: '2rem', margin: '0', padding: '0 0.5rem', fontSize: '1.1rem', color: '#afa', backgroundColor: '#00000066' }}>Main services</Title>

            {Object.values(sectionData.slides).map(service =>
              <div key={service.headline}>
                <TextInput
                  label={'Service name'}
                  placeholder={'Placeholder text'}
                  defaultValue={service.headline}
                  styles={{
                    input: { width: '12rem', padding: '1rem 0.75rem', fontSize: '1.25rem', fontWeight: 'bold' }
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
          <ServicePriceList pricedServices={sectionData.pricedServices} />
        }
      </Collapse>
    </div>
  )
}