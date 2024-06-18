import { Divider, Flex, NumberInput, TextInput, Title } from "@mantine/core"

interface ServicePriceListProps {
  pricedServices: {
    name: string,
    price: number
  }[],
  pricedServicesLabel?: string;
}

export const ServicePriceList = ({ pricedServices, pricedServicesLabel }: ServicePriceListProps) => {
  return (
    <>
      <Divider p={3} m={0} styles={{
        label: {
          fontSize: '1.5rem',
          color: '#afa',
        },
        root: {
          height: '2rem'
        }
      }} my="xs" label="Priced Services" labelPosition="center" />
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
            />
          </Flex>
        )}
      </Flex>
    </>
  )
}