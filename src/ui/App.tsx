import React from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { SignIn } from './signin'
// import { MainLayout } from './MainLayout'
// import { SignIn } from './SignIn'
import { NavBar } from './NavBar'
import { Switch, Route } from 'react-router'
import { ActionLog } from '../components/ActionLog'
import { TransactionComponent } from '../components/TransactionComponent'
/* import { Routes } from './Routes'
import { Switch } from 'react-router'
*/
export class App extends React.Component {
  render() {
    return(<div>
      <NavBar/>
      <Switch>
        <Route exact path = '/home' component = { ActionLog }/>
        <Route path = '/home/transaction' component = { TransactionComponent }/>
      </Switch>
      </div>
    )
  }
}
// <Route path = '/' component = {MainLayout}/>
