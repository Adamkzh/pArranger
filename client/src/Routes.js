import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './components/Home';
import Design from './components/Dashboard';
import Console from './components/admin/Admin';
import EffectAndImpact from './components/admin/EffectAndImpact';
import Login from './components/auth/Login';
import Detail from './components/userDashboard/Panel-Detail-Dashboard';
import Search from './components/admin/Search';
import PowerMap from './components/admin/deck/PowerMap';
import SingleCityContainer from './components/admin/SingleCityContainer';

const Routes =() =>(
    <Router>
    <div style={{height: '100%'}}>
      <Route exact path="/" component={Home}/>
      <Route exact path="/design" component={Design}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/dashboard/:id" component={Detail}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/powermap" component={PowerMap}/>
      <Route exact path="/console" render={(props) => <Console {...props} selected="summary" />}/>
      <Route exact path="/console/effectAndImpact" render={(props) => <EffectAndImpact {...props} selected="effectAndImpact" />}/>
      <Route exact path="/console/sanjose" render={(props) => <SingleCityContainer {...props} selected="citySanJose"/>}/>
      <Route exact path="/console/sunnyvale" render={(props) => <SingleCityContainer {...props} selected="citySunnyvale"/>}/>
      <Route exact path="/console/paloalto" render={(props) => <SingleCityContainer {...props} selected="cityPaloAlto"/>}/>
    </div>
  </Router>
)

export default Routes
