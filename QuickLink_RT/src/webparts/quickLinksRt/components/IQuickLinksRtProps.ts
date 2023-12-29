export interface IQuickLinksRtProps {
  description: string;
  ListName: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  AddlinkURL: string;
  AddIcon: string;
  Quicklinkcolor: string;
  ShortList:string;
}

export interface ISPList {
  Title: string;
  
    Url: string;
    description: string;
  
  Icon: string;
  IsActive: boolean;
}