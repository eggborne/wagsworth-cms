import '@mantine/core/styles/global.css';

import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Flex.css';

import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Modal.css';
import '@mantine/core/styles/AppShell.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Input.css';

import { AppShell, Button, CheckIcon, CloseIcon, Flex, MantineProvider, Paper, Title } from "@mantine/core";
import { theme } from "./theme";
import { InputSection } from './components/InputSection';
import { useEffect, useLayoutEffect, useState } from 'react';
import { initApp, resetUI, signUserOut, startUI } from '../firebase';

import fakeSiteData from '../fakesitedata.json';
import { User } from 'firebase/auth';
import { SectionData, SiteContentData } from './types';
import { LoginWindow } from './components/LoginWindow';

const FAKE_SITE_DATA = fakeSiteData.sites['WagsworthSiteID'].liveData as SiteContentData;
const FAKE_SITE_DATA_SECTIONS = Object.values(FAKE_SITE_DATA.sections).filter(x => typeof x === 'object').sort((a, b) => a.order - b.order) as SectionData[];

console.warn('FAKE_SITE_DATA_SECTIONS', FAKE_SITE_DATA_SECTIONS);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [siteData, setSiteData] = useState<SiteContentData | null>(null);

  const checkForLoggedInUser = async () => {
    try {
      console.log('calling initApp');
      const signedInUser = await initApp() as User;
      console.log('found signed in user', signedInUser);

      if (signedInUser) {
        console.log('setting user to', signedInUser);
        setUserData(signedInUser);
        console.log('setting data to', fakeSiteData);
        setSiteData(FAKE_SITE_DATA)
      } else {
        startUI();
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('load', () => {
      console.warn('setting loading false');
      setLoading(false);
    })
  }, []);

  useEffect(() => {    
    checkForLoggedInUser();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppShell
        layout='alt'
        header={{ height: '4rem', }}
        footer={{ height: '6rem' }}
        styles={theme => ({
          root: {
            backgroundColor: theme.black,
            color: theme.white,
          }
        })}
      >
        <AppShell.Header
          styles={theme => ({
            header: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1rem',
              backgroundColor: theme.black
            }
          })}
        >
          <Title order={2}>
            Header Title
          </Title>
          <Button
            autoContrast
            color='#90000077'
            size={'compact-xs'}
            onClick={() => { signUserOut(); setUserData(null); setSiteData(null); resetUI() }}
          >
            Sign out
          </Button>
        </AppShell.Header>
        <AppShell.Main>
          {siteData ?
            <Flex
              display={'flex'}
              direction={'column'}
              gap={'0.2rem'}
            >
              {Object.values(FAKE_SITE_DATA_SECTIONS).map(section => (
                <InputSection
                  key={section.href}
                  sectionData={section}
                />
              ))}
            </Flex>
            :
            userData ?
              <Paper
                withBorder
                shadow="md"
                p="sm"
                styles={theme => ({
                  root: {
                    backgroundColor: theme.colors.dark[8],
                    color: theme.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                })}
              >
                <h2>{userData.displayName} is logged in!</h2>
              </Paper>
              : !loading ?
                <LoginWindow opened={(!userData && !siteData)} />
                :
                <h2 style={{ textAlign: 'center', marginTop: '4rem', width: '100%' }}>
                  loading...
                </h2>
          }

        </AppShell.Main>
        <AppShell.Footer
          styles={theme => ({
            footer: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              backgroundColor: theme.colors.headerBackgroundColor[0],
            }
          })}
        >
          <Button
            autoContrast
            leftSection={<CloseIcon size={'14'} />}
            variant='gradient'
            gradient={{ from: 'pink', to: 'red', deg: 135 }}
            style={{ width: '40%' }}
          >
            Revert
          </Button>
          <Button
            autoContrast
            rightSection={<CheckIcon size={'14'} />}
            variant='gradient'
            gradient={{ from: 'teal', to: 'lime', deg: 135 }}
            style={{ width: '40%' }}
          >
            Save
          </Button>
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
