import { Flex, NumberInput, TextInput } from "@mantine/core"
import { SectionData } from "../types";

interface ServicePriceListProps {
  pricedServices: {
    name: string,
    price: number
  }[],
  pricedServicesLabel?: string;
  updateSectionData: (updatedSectionData: Partial<SectionData>) => void;
}

export const ServicePriceList = ({ pricedServices, pricedServicesLabel, updateSectionData }: ServicePriceListProps) => {
  return (
    <Flex
      display={'flex'}
      direction={'column'}
      gap={'1rem'}
    >
      <TextInput
        label={'Priced Services label'}
        placeholder={pricedServicesLabel}
        defaultValue={pricedServicesLabel}
        styles={{
          input: { width: '80%', padding: '1rem 0.5rem', fontSize: '1.1rem', fontWeight: 'bold' }
        }}
        onChange={(e) => updateSectionData({ pricedServicesLabel: e.currentTarget.value })}
      />
      {pricedServices.map((pricedService, p) =>
        <Flex
          key={pricedService.name}
          display='flex'
          direction='row'
          align='center'
          justify='center'
          gap={'1rem'}
        >
          <TextInput
            size='lg'
            label={!p && 'Service'}
            placeholder={'Placeholder text'}
            defaultValue={pricedService.name}
            styles={{
              label: { textAlign: 'center', width: '100%' },
              root: { flexGrow: '2' },
              input: { textAlign: 'center', padding: '0.25rem 0.5rem', fontSize: '1rem', fontWeight: 'bold' }
            }}
            onChange={(e) => {
              console.log('e', e)
              const updatedPricedServices = [...pricedServices]
              updatedPricedServices[p].name = e.currentTarget.value
              updateSectionData({ pricedServices: updatedPricedServices })
            }}
          />
          <NumberInput
            placeholder={'$' + pricedService.price}
            defaultValue={pricedService.price}
            label={!p && 'Price'}
            prefix={'$'}
            min={0}
            size='lg'
            styles={{
              label: { textAlign: 'center', width: '100%' },
              root: { flexGrow: '0' },
              input: { textAlign: 'center', padding: '0', margin: '0', fontSize: '1.2rem', fontWeight: 'bold' },
              section: { display: 'none' }
            }}
            onChange={value => {
              const updatedPricedServices = [...pricedServices];
              updatedPricedServices[p].price = value as number;
              updateSectionData({ pricedServices: updatedPricedServices })
            }}
          />
        </Flex>
      )}
    </Flex>
  )
}