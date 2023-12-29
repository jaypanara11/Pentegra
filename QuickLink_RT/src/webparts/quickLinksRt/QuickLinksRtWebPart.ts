import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  
 
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'QuickLinksRtWebPartStrings';
import QuickLinksRt from './components/QuickLinksRt';
import { IQuickLinksRtProps } from './components/IQuickLinksRtProps';

export interface IQuickLinksRtWebPartProps {
  description: string;
  ListName: string;
  Backgroundcolor: string;
  color: string;
  AddlinkURL: string;
  AddIcon: string;
  Quicklinkcolor: string;
  Numbershow: number;
  IconUrl: string;
  ShortList:string;


}

////
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import styles from './components/QuickLinksRt.module.scss';

export interface IGetListItemFromSharePointListWebPartProps {
  description: string;
  ListName: string;
  Backgroundcolor: string;
  color: string;
  AddlinkURL: string;
  AddIcon: string;
  Quicklinkcolor: string;
  IconUrl: string;
  ShortList:string;

}
export interface ISPLists {
  value: ISPList[];
}
export interface ISPList {
  Title: string;
  URL: any;
  Icon: string;
  IsActive: boolean;
  EncodedAbsUrl: any;
  File: any;
}
////

export default class QuickLinksRtWebPart extends BaseClientSideWebPart<IQuickLinksRtWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  //
  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('"+this.properties.ListName+"')/Items?$select=EncodedAbsUrl,*,File/Name&$expand=File&$orderby="+this.properties.ShortList+" desc&$top="+this.properties.Numbershow+"", SPHttpClient.configurations.v1)
    // return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('QuickLink')/Items?$filter=IsActive eq 1&$orderby=ID desc&$top=5", SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }
  private _renderListAsync(): void {
    if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData()
        .then((response) => {
          this._renderList(response.value);
        });
    }
  }
  private _renderList(items: ISPList[]): void {
    var html: string = '';
    
    items.forEach((item: ISPList) => {

      var iconURL = "";
      if (item.Icon != undefined) {
        iconURL = JSON.parse(item.Icon).serverUrl + JSON.parse(item.Icon).serverRelativeUrl;
      }
      
      /*<div style="background-color: var(--white);padding: 1rem;border-radius: 5px;display: flex;align-items: center;padding: 10px 5px 10px 10px;">"*/ 
      html += "<div class='"+styles['quicklink--card']+"'>"+
      // for list
      "<a href='"+item.EncodedAbsUrl+"' target='_blank' data-interception='off'>"+
      // for document libriery
      // "<a href='"+item.FileRef+"' target='_blank' data-interception='off'>"+
      "<div style='background-color: "+this.properties.Backgroundcolor+";padding: 1rem;border-radius: 5px;display: flex;align-items: center;padding: 10px 5px 10px 10px;'>"+
      /*"<div class='"+styles['card']+' '+styles['d-flex']+' '+styles['align-items-center']+' '+styles['quicklink__card--inner']+"'>"+*/
          "<div class='"+styles.quicklinks__icons+"'>"+
           "<img src='"+this.properties.IconUrl+"' alt='Quick link'>"+
          "</div>"+
          /*"<div class='"+styles['quicklinks--ttile']+"'>"+*/
          "<div style='color:"+this.properties.color+"'>"+item.File.Name+"</div>"+
          // font-weight: 500;font-size: 14px;line-height: 22px;margin-bottom: 5px;
          
          /*"<div style='color:"+this.properties.color+";font-weight: 500;font-size: 14px;line-height: 22px;margin-bottom: 5px;'>"+
            "<h4>"+item.File.Name+"</h4>"+
          "</div>"+*/
        "</div>"+ 
        "</a>"+
      "</div>";

      // var eventDate = new Date(item.EventDate)
      // const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      // let day = weekday[eventDate.getUTCDay()];

      // const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // let monthName = month[eventDate.getUTCMonth()];

      // var AllDayEvent = "";
      // if (item.fAllDayEvent == true)
      // {
      //   AllDayEvent = "All Day";
      // }

      // html += `<p>${item.Title} | ${monthName} - ${eventDate.getDay()} - ${day} | ${AllDayEvent}</p> `;
    });

    html += '';
    const listContainer: Element = this.domElement.querySelector('#quickLinkItems');
    listContainer.innerHTML = html;
  }
  //

  public render(): void {

    this._renderListAsync();

    const element: React.ReactElement<IQuickLinksRtProps> = React.createElement(
      QuickLinksRt,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        AddlinkURL: this.properties.AddlinkURL,
        AddIcon: this.properties.AddIcon,
        Quicklinkcolor: this.properties.Quicklinkcolor,
        ListName: this.properties.ListName,
        ShortList: this.properties.ShortList

        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let templateProperty: any;
  if (this.properties.AddIcon) {
    templateProperty = PropertyPaneToggle('propertyoff', {
      label: 'Property hide when toggle is turned off'
    });
  }
  else{
    templateProperty = PropertyPaneToggle('propertyon', {
      label: 'Property show when toggle is turned on'
    });

  }
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
            AddlinkURL: strings.PropertyPaneAddlinkURL,
            Quicklinkcolor: strings.PropertyPaneQuicklinkcolor,
            AddIcon: strings.PropertyPaneAddlinkURL,
            ListName: strings.PropertyPaneListName
            
            

          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', { 
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('ListName', {
                  label: "List Name"
                }),
                PropertyPaneTextField('Backgroundcolor', {
                  label: "Background-color"
                }),
                PropertyPaneTextField('color', {
                  label: "Text color"
                }),
                PropertyPaneTextField('AddlinkURL', {
                  label: "View All"
                }),
                PropertyPaneTextField('IconUrl', {
                  label: "Icon Url"
                }),
                PropertyPaneTextField('Quicklinkcolor', {
                  label: "Header color"
                }),
                PropertyPaneTextField('Numbershow', {
                  label: "Number of entry show"
                }),
              
                PropertyPaneToggle('AddIcon', {
                  label: "Add icon"
                }),
                PropertyPaneTextField('ShortList', {
                  label: "ShortList"
                })

              ]
            }
          ]
        },
      ]
    };
  }
}
