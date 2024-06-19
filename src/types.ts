type Paragraph = string;
type ImagePath = string;
type Color = string;
type PhoneNumber = string;

interface PricedService {
  name: string;
  price: number;
}

interface Slide {
  headline: string;
  textContent: Paragraph[];
  icon: ImagePath;
  backgroundColor: Color;
}

interface HeadLineBodySet {
  headline: string;
  bodyText: Paragraph[];
}

interface HomePageData {
  bannerText: string;
  introContent: Paragraph[];
}

interface ContactInfo {
  addressCoords: {
    n: string,
    w: string,
  };
  email: string;
  hours: {
    Sunday: { open: number, close: number },
    Monday: { open: number, close: number },
    Tuesday: { open: number, close: number },
    Wednesday: { open: number, close: number },
    Thursday: { open: number, close: number },
    Friday: { open: number, close: number },
    Saturday: { open: number, close: number },
  }
  phone: PhoneNumber;
  streetAddress: string[];
}

interface ImageMetadata {
  url: string;
  height: number;
  width: number;
  alt: string;
  href?: string;
}

interface NavItem {
  href: string;
  label: string;
  order: number;
}

interface SectionData {
  href: string;
  label: string;
  note?: Paragraph[];
  order: number;
  bannerImage?: ImageMetadata;
  slides: Slide[];
  textContent: Paragraph[];
  pricedServices: PricedService[];
  pricedServicesLabel: string;
  questions: HeadLineBodySet[];
  requirements: HeadLineBodySet[];
}

interface ServicesData extends SectionData {
  pricedServices: PricedService[];
  pricedServicesLabel: string;
  slides: Slide[];
}

interface AboutData extends SectionData { }

interface FAQsData extends SectionData {
  questions: HeadLineBodySet[];
}

interface RequirementsData extends SectionData {
  requirements: HeadLineBodySet[];
}

interface ContactData extends SectionData { }

interface SiteMetaInfo {
  siteName: string,
  siteUrl: string,
  siteID: string,
  lastEdited : number,
}

interface SiteContentData {
  contactInfo: ContactInfo;
  homePage: HomePageData;
  images: {
    gallery: Record<string, ImageMetadata>;
    logo: Record<string, ImageMetadata>;
    socialLinks: Record<string, ImageMetadata>;
    ui: Record<string, ImageMetadata>;
  };
  metaInfo: SiteMetaInfo,
  sections: {
    [key: string]: SectionData | ServicesData | AboutData | FAQsData | RequirementsData | ContactData;
  };
  style: Record<string, string | number>;
  theme: string;
}

interface siteAuthInfoForUser {
  lastEdited: number;
  // plus others?
}

type UserAuthorizedSiteInfo = Record<string, siteAuthInfoForUser>;

interface FullSiteData {
  authorizedUsers: string[];
  lastSavedData: SiteContentData;
  liveData: SiteContentData;
  testData: SiteContentData;
  themes: Record<string, Record<string, string | number>>;
}

interface UserData {
  email: string;
  sites: {
    lastEdited: number,
    siteID: string,
    siteName: string,
    siteUrl: string,
  }[];
  username: string;
  uid: string;
}

export type {
  UserData, Slide, PricedService, SiteMetaInfo, UserAuthorizedSiteInfo, FullSiteData, ServicesData, SiteContentData, AboutData, FAQsData, RequirementsData, ContactData,
  HomePageData, HeadLineBodySet, ContactInfo, SectionData, NavItem, ImageMetadata
};