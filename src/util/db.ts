const API_BASE_URL = 'https://firebase-backend-beis.onrender.com/api';

// Helper function to handle fetch requests
async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function getUserInfo(userID: string): Promise<any> {
  const url = `${API_BASE_URL}/user/${userID}`;
  return fetchData<any>(url);
}

async function getUserAuthorizedSites(userID: string): Promise<any> {
  const url = `${API_BASE_URL}/user/${userID}/sites`;
  return fetchData<any>(url);
}

async function getSiteMetaInfo(siteID: string): Promise<any> {
  const url = `${API_BASE_URL}/site/${siteID}/metaInfo/`;
  return fetchData<any>(url);
}

async function getSiteData(siteID: string, path: string): Promise<any> {
  const encodedPath = encodeURIComponent(path); // Ensure the path is URL-safe
  const url = `${API_BASE_URL}/site/${siteID}/${encodedPath}/`;
  return fetchData<any>(url);
}

export { getUserInfo, getUserAuthorizedSites, getSiteMetaInfo, getSiteData };

