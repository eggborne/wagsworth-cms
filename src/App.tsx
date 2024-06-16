import '@mantine/core/styles/global.css';

// import '@mantine/core/styles/Popover.css';
// import '@mantine/core/styles/Group.css';
// import '@mantine/core/styles/Loader.css';
// import '@mantine/core/styles/Input.css';
// import '@mantine/core/styles/Flex.css';

import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Modal.css';
import '@mantine/core/styles/AppShell.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Input.css';

import { AppShell, Button, CheckIcon, CloseIcon, MantineProvider, Modal, Paper, Title } from "@mantine/core";
import { theme } from "./theme";
import { InputSection } from './components/InputSection';
import { useEffect, useLayoutEffect, useState } from 'react';
import { initApp, resetUI, signUserOut, startUI } from '../firebase';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null as any);
  const [siteData, setSiteData] = useState(null as any);

  const checkForLoggedInUser = async () => {
    console.log('calling initApp');
    const signedInUser = await initApp();
    console.log('signed in user', signedInUser)
    if (!signedInUser) {
      startUI();
    } else {
      console.log('setting user to', signedInUser)
      setUserData(signedInUser)
    }
  }

  useLayoutEffect(() => {
    // setLoading(false);
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
        padding='xs'
        styles={theme => ({
          root: {
            backgroundColor: theme.colors.gray[7],
            color: theme.white
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
            <InputSection
              sectionData={null}
            />
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
              : true &&
              <Modal
                opened={(!loading && !userData && !siteData)}
                onClose={() => { }}
                centered
                title={'Log in'}
                withCloseButton={false}
                size={'max-content'}
                styles={{
                  header: { paddingTop: '2rem', backgroundColor: 'transparent' },
                  body: { padding: '0.5rem 0', backgroundColor: 'transparent' },
                  title: {
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '2rem'
                  },
                }}
              >
                <div style={{ opacity: loading ? '0.4' : '1' }} id='firebaseAuthContainer'></div>
              </Modal>
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
            size={'sm'}
          >
            Revert to last saved
          </Button>
          <Button
            autoContrast
            rightSection={<CheckIcon size={'14'} />}
            variant='gradient'
            gradient={{ from: 'teal', to: 'lime', deg: 135 }}
            size={'sm'}
          >
            Save this for real
          </Button>
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
