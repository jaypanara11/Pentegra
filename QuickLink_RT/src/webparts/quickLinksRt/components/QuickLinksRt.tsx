import * as React from 'react';
import styles from './QuickLinksRt.module.scss';
import { IQuickLinksRtProps } from './IQuickLinksRtProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { cssColor } from 'office-ui-fabric-react';

const addIcon: any = require('../../../Icons/add.svg');

export default class QuickLinksRt extends React.Component<IQuickLinksRtProps, {}> {
  public render(): React.ReactElement<IQuickLinksRtProps> {
    const style = {
      color: 'red'
      
    };


   
    

    return (
      // <section className={`${styles.quickLinksRt} ${hasTeamsContext ? styles.teams : ''}`}>      
      
        
      
        <div className={styles.quicklinks}>
          <div className={[styles['d-flex'] ,styles['flex-wrap'], styles['justify-content-between'], styles['align-items-center']].join(' ')}>
            

            <div className={styles['featured--title']} >
              <h3 style={{color:this.props.Quicklinkcolor}}>{this.props.description}</h3>
            </div>
            
            {/* <h3 style='font-weight: 500;font-size: 20px;line-height: 30px;color:'>Quick Links : {this.props.description}</h3> */}
            <div className={styles.add__btns}>
              <a href={this.props.AddlinkURL}  target='_blank' data-interception='off'>View All</a>
            </div>
            {/* <div style='color:"+this.properties.color+";font-weight: 500;font-size: 16px;line-height: 22px;margin-bottom: 5px;'></div> */}
          </div>
          <div className={[styles['d-flex'], styles['flex-wrap'], styles['quicklinks--warpper']].join(' ')} id="quickLinkItems">
            {/* <div className={styles['quicklink--card']}>
              <div className={[styles['card'], styles['d-flex'], styles['align-items-center'], styles['quicklink__card--inner'] ].join(' ')}>
                <div className={styles['quicklinks__icons']}>
                  <img src="https://pyxisoncology.sharepoint.com/Icons/Quick-Links-1.svg" alt="Quic link"/>
                </div>
                <div className={styles['quicklinks--ttile']}>
                  <h4>IT Support Ticket</h4>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      // </section>
    );
  }
}
