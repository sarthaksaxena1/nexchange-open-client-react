import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';

import OrderDepthItem from './OrderDepthItem/OrderDepthItem';
import styles from './OrderDepth.scss';


class OrderDepth extends PureComponent {
  render() {
    let sellDepth = [];
    if(!_.isEmpty(this.props.sellDepth)){
      sellDepth = this.props.sellDepth.map((depthItem) => {
        return <OrderDepthItem key={String(depthItem.rate)} item={depthItem} side='SELL'/>;
      });
    }
    let buyDepth = [];
    if(!_.isEmpty(this.props.buyDepth)){
      buyDepth = this.props.buyDepth.map((depthItem) => {
        return <OrderDepthItem key={String(depthItem.rate)} item={depthItem} side='BUY'/>;
      });
    }

    let spreadValue;
    const bestBid = this.props.sellDepth[this.props.sellDepth.length -1];
    const bestAsk = this.props.buyDepth[0];

    if(bestBid && bestAsk) {
      spreadValue = (bestAsk.rate - bestBid.rate) / ((bestAsk.rate + bestBid.rate)/2) * 100;
      spreadValue = parseFloat(Math.round(spreadValue * 100) / 100).toFixed(2);
    }
    return (
      <I18n ns="translations">
        {t => (
         <div className={`col-xs-12 col-sm-12 col-md-6 col-lg-4 ${styles.container}`}>
          <div className={`${styles.heading}`}><h4>Order Book</h4></div>
          <div className={`${styles.content}`}>
            <div className={`${styles.spread}`}><span>{`Spread ${spreadValue}%`}</span></div>
            <div className={`${styles.header}`}>
              <span className={``}>{`Size (${this.props.selectedCoins.receive})`}</span>
              <span className={``}>{`Price (${this.props.selectedCoins.deposit})`}</span>
            </div>
              {_.isEmpty(sellDepth) ? <span>{'Currently there are no buy orders for this market..'}</span> : sellDepth}
              {_.isEmpty(buyDepth) ? <span>{'Currently there are no buy orders for this market..'}</span> : buyDepth}
          </div>
        </div>
        )}
      </I18n>
    );
  }
}

export default OrderDepth;
