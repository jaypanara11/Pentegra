declare interface IQuickLinksRtWebPartStrings {
  [x: string]: string;
  AddIconFieldLabel: string | ReactElement<any, string | JSXElementConstructor<any>>;
  PropertyPaneAddlinkURL: any;
  AddlinkURLFieldLabel: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  BackgroundcolorFieldLabel: string;
  colorFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'QuickLinksRtWebPartStrings' {
  const strings: IQuickLinksRtWebPartStrings;
  export = strings;
}
