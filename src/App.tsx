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
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Divider.css';
import '@mantine/core/styles/Checkbox.css';
import '@mantine/core/styles/Notification.layer.css';
import '@mantine/core/styles/Notification.css';
import '@mantine/notifications/styles.css';


import { AppShell, Button, Center, CheckIcon, CloseIcon, Flex, MantineProvider, Paper, Text, Title } from "@mantine/core";
import { theme } from "./theme";
import { InputSection } from './components/InputSection';
import { useEffect, useLayoutEffect, useState } from 'react';
import { initApp, resetUI, signUserOut, startUI } from '../firebase';

import { User } from 'firebase/auth';
import { SiteContentData, UserData } from './types';
import { LoginWindow } from './components/LoginWindow';
import { getSiteData, getSiteMetaInfo, getUserAuthorizedSites, getUserInfo, saveAll } from './util/db';
import { useSiteData } from './context/SiteDataContext';
import { ConfirmModal } from './components/ConfirmModal';
import { Notifications, notifications } from '@mantine/notifications';


export default function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [modalShowing, setModalShowing] = useState<string | null>(null);
  const { siteData, setSiteData } = useSiteData();

  useLayoutEffect(() => {
    window.addEventListener('load', () => {
      console.warn('setting loading false');
      setLoading(false);
    })
  }, []);

  useEffect(() => {
    checkForLoggedInUser();
  }, []);

  useEffect(() => {
    console.warn('SITE DATA CHANGED!')
  }, [siteData]);

  const checkForLoggedInUser = async () => {
    try {
      const signedInUser = await initApp() as User;
      if (signedInUser) {
        // const userInfo = await getUserInfo(signedInUser.uid);
        const userInfo = await getUserInfo('SusanAuthId');
        const userSiteIDs = await getUserAuthorizedSites('SusanAuthId');
        const sites = [] as any;

        for (const siteID in userSiteIDs) {
          if (userSiteIDs.hasOwnProperty(siteID)) {
            const metaInfo = await getSiteMetaInfo(siteID);
            sites.push({ ...userSiteIDs[siteID], ...metaInfo, siteID });
          }
        }
        const userData: UserData = {
          ...userInfo,
          uid: signedInUser.uid,
          sites,
        }
        setUserData(userData);
      } else {
        startUI();
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const handleSelectUserSite = async (siteID: string) => {
    const newSiteData = await getSiteData(siteID, 'testData');
    newSiteData.metaInfo = userData?.sites.filter(site => site.siteID === siteID)[0];
    console.log('setting newSiteData', newSiteData);
    setSiteData(newSiteData);
  }

  // const orderedSectionList = siteData ? Object.values(Object.values(siteData.sections).filter(x => typeof x === 'object').sort((a, b) => a.order - b.order)) : null;

  // console.log('created section list', orderedSectionList);

  const parsedEpoch = (epoch: number) => {
    const date = new Date(epoch);
    return date.toLocaleString();
  }

  const handleConfirmSaveAll = async (newSiteData: SiteContentData) => {
    const startTime = Date.now();
    const saveResult = await saveAll(newSiteData);
    if (saveResult) {
      const dbTime = Date.now() - startTime;
      notifications.show({
        title: 'Update saved!',
        message: `took ${dbTime}ms`,
        icon: <CheckIcon size={'1.25rem'} />,
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'Update failed :(',
        message: `something done gone wrong`,
        icon: <CloseIcon size={'1.25rem'} />,
        color: 'red',
      });
    }
    setModalShowing(null);
  };

  return (
    <MantineProvider theme={theme}>
      <AppShell
        layout='alt'
        header={{ height: '3.5rem', }}
        footer={{ height: '6rem' }}
        styles={theme => ({
          root: {
            backgroundColor: theme.black,
            color: theme.white,
          }
        })}
      >
        <Notifications position='top-center' autoClose={3000} />
        <AppShell.Header styles={theme => ({ header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', backgroundColor: theme.black } })} >
          {userData ?
            <>
              <Flex display={'flex'} direction={'column'} >
                <Text size='xs'>{userData.username} is {siteData ? 'editing ' + siteData.metaInfo.siteName : 'logged in'}</Text>
                {siteData && <Text size='xs' c={'#ffffff77'}>{siteData.metaInfo.siteUrl}</Text>}
              </Flex>
              <Button autoContrast color='#90000077' size={'compact-xs'} onClick={() => { signUserOut(); setUserData(null); setSiteData(null); resetUI() }} >
                Sign out
              </Button>
            </>
            :
            <Title order={3}>
              Wagsworth CMS
            </Title>
          }
        </AppShell.Header>
        <AppShell.Main>
          {siteData ?
            <>
              <Flex display={'flex'} direction={'column'} gap={'0.2rem'} >
                {Object.values(Object.values(siteData.sections).filter(x => typeof x === 'object').sort((a, b) => a.order - b.order))?.map(section => (
                  <InputSection
                    key={section.href}
                    sectionData={section}
                    contactInfo={section.order === 5 ? siteData.contactInfo : undefined}
                  />
                ))}
              </Flex>
              <ConfirmModal
                opened={modalShowing === 'confirmSaveAll'}
                title={'Really save it for real?'}
                confirmAction={() => handleConfirmSaveAll(siteData)}
                cancelAction={() => setModalShowing(null)}
              />
            </>
            :
            userData ?
              <Center>
                <Text size='lg' style={{ textAlign: 'center', margin: '1rem 0' }}>Choose site</Text>
                <Paper withBorder shadow="md" p="sm" styles={theme => ({ root: { backgroundColor: theme.colors.dark[8], color: theme.white, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem' } })} >
                  {userData.sites.map(({ siteName, siteUrl, siteID, lastEdited }) =>
                    <div onClick={() => handleSelectUserSite(siteID)} key={siteName}>
                      <div>{siteName}</div>
                      <div>{siteUrl}</div>
                      <small>Last edited: {parsedEpoch(lastEdited)}</small>
                    </div>
                  )}
                </Paper>
              </Center>
              : !loading ?
                <LoginWindow opened={(!userData && !siteData)} />
                :
                <h2 style={{ textAlign: 'center', marginTop: '4rem', width: '100%' }}>
                  loading...
                </h2>
          }

        </AppShell.Main>
        <AppShell.Footer styles={theme => ({ footer: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', backgroundColor: theme.colors.headerBackgroundColor[0], } })} >
          <Button autoContrast leftSection={<CloseIcon size={'14'} />} variant='gradient' gradient={{ from: 'pink', to: 'red', deg: 135 }} style={{ width: '40%' }} >
            Revert
          </Button>
          <Button
            onClick={() => {
              setModalShowing('confirmSaveAll');
            }}
            autoContrast rightSection={<CheckIcon size={'14'} />} variant='gradient' gradient={{ from: 'teal', to: 'lime', deg: 135 }} style={{ width: '40%' }} >
            Save
          </Button>
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
