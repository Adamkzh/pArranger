import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './components/Home';
import Design from './components/Dashboard';
import Console from './components/admin/Admin';
import Login from './components/auth/Login';
import Detail from './components/userDashboard/Panel-Detail-Dashboard';
import Search from './components/admin/Search';
import PowerMap from './components/admin/deck/PowerMap';
import SingleCityContent from './components/admin/SingleCityContent';

const Routes =() =>(
    <Router>
    <div style={{height: '100%'}}>
      <Route exact path="/" component={Home}/>
      <Route exact path="/design" component={Design}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/dashboard/:id" component={Detail}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/powermap" component={PowerMap}/>
      <Route exact path="/console" render={(props) => <Console {...props} selected="overview" />}/>
      <Route exact path="/console/overviewPerCapita" render={(props) => <Console {...props} selected="overviewPerCapita" />}/>
      <Route exact path="/console/overviewPerLandArea" render={(props) => <Console {...props} selected="overviewPerLandArea" />}/>
      <Route exact path="/console/sanjose" render={(props) => <SingleCityContent {...props} selected="citySanJose"/>}/>
      <Route exact path="/console/sunnyvale" render={(props) => <SingleCityContent {...props} selected="citySunnyvale"/>}/>
      <Route exact path="/console/paloalto" render={(props) => <SingleCityContent {...props} selected="cityPaloAlto"/>}/>
    </div>
  </Router>
)

export default Routes
