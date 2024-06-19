import { AccordionChevron, Container, Collapse, Flex, TextInput, Textarea, Title, Divider, Text, Button, Group, NumberInput, Checkbox, Input } from "@mantine/core"
import { ContactInfo, SectionData } from "../types"
import { useDisclosure } from "@mantine/hooks"
import { ServicePriceList } from "./ServicePriceList";
import { useState } from "react";
import { patchTestSite } from "../util/db";

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const militaryToStandardTime = (militaryTime: number): string => !militaryTime ? '' : `${militaryTime.toString().padStart(4, '0').slice(0, 2)}:${militaryTime.toString().padStart(4, '0').slice(2, 4)}`;

interface InputSectionProps {
  sectionData: SectionData,
  contactInfo?: ContactInfo;
}

const handleClickDayBox = (e: React.ChangeEvent<HTMLInputElement>) => {
  const day = e.target.name;
  const checked = e.target.checked;
  console.log('clicked day', day)
  console.log('checked', checked)
}

export const InputSection = ({ sectionData, contactInfo }: InputSectionProps) => {

  const [editedSectionData, setEditedSectionData] = useState<SectionData>({ ...sectionData });

  const updateSectionData = (updatedSectionData: Partial<SectionData>) => {
    const nextEditedSectionData = {
      ...editedSectionData,
      ...updatedSectionData,
    } as SectionData;
    console.log('next edited section data');
    console.log(nextEditedSectionData);
    setEditedSectionData(nextEditedSectionData);
    patchTestSite(`sections/${editedSectionData.href}`, nextEditedSectionData);
  };

  let hoursArray;
  if (contactInfo) {
    hoursArray = Object.values(contactInfo.hours).map((hours, h) => {
      return {
        day: Object.keys(contactInfo.hours)[h],
        hours: {
          open: militaryToStandardTime(hours.open),
          close: militaryToStandardTime(hours.close)
        }
      }
    }).sort((a, b) => weekdays.indexOf(a.day) - weekdays.indexOf(b.day));
  }

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Container style={{ backgroundColor: '#888' }}>
      <Title
        onClick={toggle}
        order={1}
        bg='#00000088'
        style={{
          height: '4.2rem',
          flexGrow: 1,
          cursor: 'pointer',
          textAlign: 'center',
          margin: '0',
          padding: '0 20%',
          color: '#ada',
        }}
      >
        <Flex
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
          style={{
            height: '100%',
          }}
        >
          <AccordionChevron size={'24'} style={{ rotate: opened ? '180deg' : '0deg', transition: 'rotate 500ms ease' }} />
          <Flex direction={'column'}>
            <Text size='1.35rem'>{sectionData.label}</Text>
            <Text c='#ffffff99' size='xs'>{`/${sectionData.href}`}</Text>
          </Flex>
          <AccordionChevron size={'24'} style={{ rotate: opened ? '-180deg' : '0deg', transition: 'rotate 500ms ease' }} />
        </Flex>
      </Title>
      <Collapse
        in={opened}
        transitionDuration={500}
      >
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
          }}
        >
          <TextInput
            placeholder={`${sectionData.href[0].toUpperCase() + sectionData.href.slice(1)}`}
            defaultValue={sectionData.label}
            styles={{
              input: { height: 'min-content', width: '12rem', padding: '0rem 0.75rem', fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' },
              root: { alignSelf: 'center', textAlign: 'center', margin: '0.5rem 0' },
            }}
            onChange={e => updateSectionData({ label: e.currentTarget.value })}
          />
          {sectionData.note &&
            <Textarea
              autosize
              label={<Divider p={0} styles={{ label: { fontSize: '1.1rem', color: '#afa' } }} label="Note" labelPosition="center" />}
              placeholder={'Placeholder text'}
              defaultValue={sectionData.note.map(paragraph => paragraph).join('\n\n')}
              styles={{
                input: { padding: '1rem 0.75rem' },
                label: { width: '100%', height: '2rem' },
              }}
              onChange={e => updateSectionData({ note: e.currentTarget.value.split('\n\n') })}
            />
          }
          {sectionData.slides &&
            <>
              <Divider pt={12} m={0} styles={{ label: { fontSize: '1.1rem', color: '#afa' } }} label="Main Services" labelPosition="center" />
              <Flex direction="column" gap="md">
                {sectionData.slides.map((service, s) =>
                  <div key={service.headline}>
                    <TextInput
                      label={'Service name'}
                      placeholder={'Placeholder text'}
                      defaultValue={service.headline}
                      styles={{
                        input: { width: '12rem', padding: '1rem 0.75rem', fontSize: '1.25rem', fontWeight: 'bold' },
                        root: { height: '4.5rem' }
                      }}
                      onChange={(e) => {
                        const updatedSlides = [...editedSectionData.slides];
                        updatedSlides[s] = { ...updatedSlides[s], headline: e.currentTarget.value };
                        updateSectionData({ slides: updatedSlides });
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
                      onChange={(e) => {
                        const updatedSlides = [...editedSectionData.slides];
                        updatedSlides[s] = { ...updatedSlides[s], textContent: e.currentTarget.value.split('\n\n') };
                        updateSectionData({ slides: updatedSlides });
                      }}
                    />
                  </div>
                )}
              </Flex>
            </>
          }
          {sectionData.pricedServices &&
            <>
              <Divider pt={12} m={0} styles={{ label: { fontSize: '1.1rem', color: '#afa' }, root: { height: '3rem' } }} label="Priced Services" labelPosition="center" />
              <ServicePriceList pricedServices={sectionData.pricedServices} pricedServicesLabel={sectionData.pricedServicesLabel} updateSectionData={updateSectionData} />
            </>
          }
          {opened && sectionData.textContent &&
            <>
              <Divider pt={12} m={0} styles={{ label: { fontSize: '1.1rem', color: '#afa' }, root: { height: '3rem' } }} label="Main Text" labelPosition="center" />
              <Textarea
                autosize
                placeholder={'Placeholder text'}
                defaultValue={sectionData.textContent.map((paragraph) => paragraph).join('\n\n')}
                styles={{
                  input: { padding: '1.5rem 1rem' },
                }}
                onChange={e => updateSectionData({ textContent: e.currentTarget.value.split('\n\n') })}
              />
            </>
          }
          {opened && sectionData.questions &&
            <Flex m={'1.5rem 1rem'} direction="column" gap="md">
              {sectionData.questions.map(({ headline, bodyText }, q) =>
                <Flex key={q} direction="column" gap="xs">
                  <Textarea
                    autosize
                    label={`Headline ${q + 1}`}
                    defaultValue={headline}
                    onChange={(e) => {
                      const updatedQuestions = [...editedSectionData.questions];
                      updatedQuestions[q] = { ...updatedQuestions[q], headline: e.currentTarget.value };
                      updateSectionData({ questions: updatedQuestions });
                    }}
                  >
                  </Textarea>
                  <Textarea
                    autosize
                    label={`Body ${q + 1}`}
                    defaultValue={bodyText}
                    onChange={(e) => {
                      const updatedQuestions = [...editedSectionData.questions];
                      updatedQuestions[q] = { ...updatedQuestions[q], bodyText: e.currentTarget.value.split('\n\n') };
                      updateSectionData({ questions: updatedQuestions });
                    }}
                  >
                  </Textarea>
                </Flex>
              )}
              <Button>Add Question</Button>
            </Flex>
          }
          {sectionData.requirements &&
            <Flex m={'1.5rem 1rem'} direction="column" gap="md">
              {sectionData.requirements.map(({ headline, bodyText }, q) =>
                <Flex key={q} direction="column" gap="xs">
                  <Textarea
                    autosize
                    label={`Headline ${q + 1}`}
                    defaultValue={headline}
                    onChange={(e) => {
                      const updatedRequirements = [...editedSectionData.requirements];
                      updatedRequirements[q] = { ...updatedRequirements[q], headline: e.currentTarget.value };
                      updateSectionData({ requirements: updatedRequirements });
                    }}
                  >
                  </Textarea>
                  <Textarea
                    autosize
                    label={`Body ${q + 1}`}
                    defaultValue={bodyText}
                    onChange={(e) => {
                      const updatedRequirements = [...editedSectionData.requirements];
                      updatedRequirements[q] = { ...updatedRequirements[q], bodyText: e.currentTarget.value.split('\n\n') };
                      updateSectionData({ requirements: updatedRequirements });
                    }}
                  >
                  </Textarea>
                </Flex>
              )}
              <Button>Add Requirement</Button>
            </Flex>
          }
          {contactInfo && hoursArray &&
            <>
              <NumberInput
                m={6}
                size={'md'}
                label={'Phone'}
                defaultValue={contactInfo.phone}
                placeholder={contactInfo.phone}                
              />
              <TextInput
                m={6}
                size={'md'}
                label={'Email'}
                defaultValue={contactInfo.email}
                placeholder={contactInfo.email}
              />
              {contactInfo.streetAddress.map((line, l) =>
                <TextInput
                  key={l}
                  m={'2 6'}
                  size={'md'}
                  label={l === 0 && 'Address'}
                  defaultValue={line}
                  placeholder={line}
                />
              )}
              <Divider pt={12} m={0} styles={{ label: { fontSize: '1.1rem', color: '#afa' }, root: { height: '3rem' } }} label="Hours" labelPosition="center" />
              <Flex
                direction={'column'}
                gap="md"
              >
                {hoursArray.map(({ day, hours }, d) =>
                  <Flex
                    key={d}
                    direction='row'
                    align='center'
                    justify='space-between'
                  >
                    <Group gap={'0.5rem'}>
                      <Checkbox
                        name={day}
                        defaultChecked={hours.open.length > 0}
                        onChange={handleClickDayBox}
                      />
                      <Text>{day.slice(0, 3)}</Text>
                    </Group>
                    <Group>
                      <Input
                        name={'open'}
                        type='time'
                        defaultValue={hours.open}>
                      </Input>
                      <Input type='time' defaultValue={hours.close}></Input>
                    </Group>

                  </Flex>
                )}
              </Flex>
            </>
          }
        </Container>
      </Collapse>
    </Container>
  )
}