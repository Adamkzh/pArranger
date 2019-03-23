import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './components/Home';
import Design from './components/Dashboard';
import Admin from './components/admin/Admin';
import Login from './components/auth/Login';
import Detail from './components/Panel-Detail-Dashboard';

const Routes =() =>(
    <Router>
    <div style={{height: '100%'}}>
      <Route exact path="/" component={Home}/>
      <Route exact path="/design" component={Design}/>
      <Route exact path="/admin" component={Admin}/>
      {/* <Route exact path="/search" component={Search}/> */}
      <Route exact path="/login" component={Login}/>
      <Route exact path="/dashboard/:id" component={Detail}/>
    </div>
  </Router>
)

export default Routes
