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
      <Route exact path="/console" component={Console}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/dashboard/:id" component={Detail}/>
      <Route exact path="/search" component={Search}/>
      <Route exact path="/powermap" component={PowerMap}/>
      <Route exact path="/console/sanjose" component={SingleCityContent}/>
      <Route exact path="/console/sunnyvale" component={SingleCityContent}/>
      <Route exact path="/console/paloalto" component={SingleCityContent}/>
    </div>
  </Router>
)

export default Routes
