import * as React from 'react'
import {Link} from 'react-router-dom'

export class BTCWindow extends React.Component<any, any> {
  constructor(props: any) {
    super (props)
  }
  render () {
    return (
      <div className = 'main'>
      <Link to = '/main'>
        <button type = 'submit' className = 'button-refresh'>Return</button>
      </Link>
        <div className = 'currency-content'>
          <header className = 'text-header'>Your Bitcoin</header>
          <div className = 'currency-info-container'>
              <p>1232 BTC</p>
              <p>329479186810$</p>
              <img src = 'https://shapeshift.io/images/coins/bitcoin.png'/>
          </div>
          <Link to ='/btc-transaction'>
            <button type = 'submit'>Send</button>
          </Link>
          <div className = 'currency-address-container'>
            <div className = 'currency-address'>
              <img src = 'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=%20mgyENbe2A19bApfxj5VkpTZdMoBweatXkz'/>
              <div className = 'address-with-button'>
                <header className = 'text-header'>Your Litecoin Address:</header>
                <p>sdfkjwur98fdskfl2rfwhssdf</p>
                <button type = 'submit' className =  'button-copy'>Copy</button>
              </div>
            </div>
          </div>
          <div className = 'transaction-history'>
            <header className = 'text-header'>Transaction History:</header>
              <table>
                <tr>
                  <th>Date</th>
                  <th>How much</th>
                  <th>To/from address</th>
                  <th>Status</th>
                </tr>
                <tr>
                  <th>2018/02/01</th>
                  <th>0.587 BTC</th>
                  <th>sdfsdgsf213eqwerwsd</th>
                  <th className = 'text-unconfirmed'>Not confirmed</th>
                </tr>
                <tr>
                  <th>2018/02/11</th>
                  <th>0.587 BTC</th>
                  <th>sdfrewwersfdqwwrwsd</th>
                  <th className = 'text-confirmed'>Confirmed</th>
                </tr>
                <tr>
                  <th>2018/02/01</th>
                  <th>0.3 BTC</th>
                  <th>sadadasdqweqeqsdsss</th>
                   <th className = 'text-confirmed'>Confirmed</th>
                </tr>
                <tr>
                  <th>2018/02/21</th>
                  <th>0.5187 BTC</th>
                  <th>XHRTqweTFDSWER@erwsd</th>
                   <th className = 'text-confirmed'>Confirmed</th>
                </tr>
                <tr>
                  <th>2018/03/01</th>
                  <th>17 BTC</th>
                  <th>XHRqweDSWER@erwsd</th>
                  <th className = 'text-confirmed'>Confirmed</th>
                </tr>
              </table>
          </div>
        </div>
      </div>
    )
  }
}
