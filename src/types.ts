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

interface Requirement {
  headline: string;
  bodyText: Paragraph[];
}

interface Question {
  question: string;
  answer: Paragraph[];
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
  slides?: Slide[];
  textContent?: Paragraph[];
  pricedServices?: PricedService[];
}

interface ServicesData extends SectionData {
  pricedServices: PricedService[];
  slides: Slide[];
}

interface AboutData extends SectionData { }

interface FAQsData extends SectionData {
  questions: Question[];
}

interface RequirementsData extends SectionData {
  requirements: Requirement[];
}

interface ContactData extends SectionData { }

interface SiteContentData {
  contactInfo: ContactInfo;
  homePage: HomePageData;
  images: {
    gallery: Record<string, ImageMetadata>;
    logo: Record<string, ImageMetadata>;
    socialLinks: Record<string, ImageMetadata>;
    ui: Record<string, ImageMetadata>;
  };
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

type userAuthorizedSiteInfo = Record<string, siteAuthInfoForUser>;

interface FullSiteData {
  authorizedUsers: string[];
  lastSavedData: SiteContentData;
  liveData: SiteContentData;
  testData: SiteContentData;
  themes: Record<string, Record<string, string | number>>;
}

export type {
  userAuthorizedSiteInfo, FullSiteData, ServicesData, SiteContentData, AboutData, FAQsData, RequirementsData, ContactData,
  HomePageData, ContactInfo, SectionData, NavItem, ImageMetadata
};