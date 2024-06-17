import { Flex, NumberInput, TextInput, Title } from "@mantine/core"

interface ServicePriceListProps {
  pricedServices: {
    name: string,
    price: number
  }[]
}

export const ServicePriceList = ({ pricedServices }: ServicePriceListProps) => {
  return (
    <div>
      <Title order={1} style={{ margin: '0', padding: '0.5rem', fontSize: '1.1rem', color: '#afa', backgroundColor: '#00000066' }}>Priced services</Title>
      <Flex
        display={'flex'}
        direction={'column'}
        gap={'1rem'}
      >
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
                label: { textAlign: 'center', width: '100%', fontSize: '1rem' },
                root: { maxWidth: '40%' },
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
                label: { textAlign: 'center', width: '100%', fontSize: '1rem' },
                root: { maxWidth: '40%' },
                input: { textAlign: 'center', padding: '0', margin: '0', fontSize: '1.2rem', fontWeight: 'bold' },
                section: { display: 'none' }
              }}
            />
          </Flex>
        )}
      </Flex>
    </div>
  )
}