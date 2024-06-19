import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SiteContentData } from '../types';

// Define the type for the context data
interface SiteDataContextType {
  siteData: SiteContentData | null;
  setSiteData: React.Dispatch<React.SetStateAction<SiteContentData | null>>;
}

// Create the context with a default value
const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

// Define props interface to include children
interface ProviderProps {
  children: ReactNode;
}

// Create a Provider Component
export const SiteDataProvider: React.FC<ProviderProps> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteContentData | null>(null);

  // Provide the context value
  return (
    <SiteDataContext.Provider value={{ siteData, setSiteData }}>
      {children}
    </SiteDataContext.Provider>
  );
};

// Create a custom hook for easy access
export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
