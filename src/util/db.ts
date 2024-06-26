import { SiteContentData, SiteMetaInfo, UserAuthorizedSiteInfo, UserData } from "../types";

const API_BASE_URL = 'https://firebase-backend-beis.onrender.com/api';

// Helper function to handle fetch requests

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error instanceof Error ? error.message : String(error)}`);
  }
}

interface PatchSiteDataParams<T> {
  siteID: string;
  environment: string;
  path: string;
  newValue: T;
}

// Function to send a PATCH request to update site data
async function patchSiteData<T>({ siteID, environment, path, newValue }: PatchSiteDataParams<T>): Promise<void> {
  const encodedPath = encodeURIComponent(path); // Encoding to handle special characters in URL
  const url = `${API_BASE_URL}/site/${siteID}/${environment}/${encodedPath}`;

  // Define the options for the PATCH request
  const options: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value: newValue })
  };

  try {
    // Using fetchData to perform the PATCH request
    const result = await fetchData<{ message: string }>(url, options);
    console.log('Update successful:', result.message);
  } catch (error) {
    console.error('Error updating site data:', error instanceof Error ? error.message : String(error));
  }
}

async function getUserInfo(userID: string): Promise<UserData> {
  const url = `${API_BASE_URL}/user/${userID}`;
  return fetchData<UserData>(url);
}

async function getUserAuthorizedSites(userID: string): Promise<UserAuthorizedSiteInfo> {
  const url = `${API_BASE_URL}/user/${userID}/sites`;
  return fetchData<UserAuthorizedSiteInfo>(url);
}

async function getSiteMetaInfo(siteID: string): Promise<SiteMetaInfo> {
  const url = `${API_BASE_URL}/site/${siteID}/metaInfo/`;
  return fetchData<SiteMetaInfo>(url);
}

async function getSiteData(siteID: string, path: string): Promise<SiteContentData> {
  const encodedPath = encodeURIComponent(path); // Ensure the path is URL-safe
  const url = `${API_BASE_URL}/site/${siteID}/${encodedPath}/`;
  return fetchData<SiteContentData>(url);
}

async function patchTestSite<T>(path: string, newValue: T): Promise<boolean> {
  try {
    patchSiteData({
      siteID: 'WagsworthSiteID',
      environment: 'testData',
      path: path,
      newValue: newValue
    });
  } catch (error) {
    console.error('Error updating site data:', error);
    return false;
  }
  return true
}

async function saveAll(newSiteData: SiteContentData): Promise<boolean> {
  try {
    patchSiteData({
      siteID: 'WagsworthSiteID',
      environment: 'liveData',
      path: '/',
      newValue: newSiteData
    });
  } catch(error) {
    console.error('Error saving data:', error);
    return false;
  }
  return true;
}

export { getUserInfo, getUserAuthorizedSites, getSiteMetaInfo, getSiteData, patchSiteData, patchTestSite, saveAll };

