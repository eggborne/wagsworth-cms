import { useContext } from 'react';
import { SiteDataContext, SiteDataContextType } from '../context/SiteDataContext';

export const useSiteData = (): SiteDataContextType => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};