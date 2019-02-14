import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Admin from './components/admin/Admin';
import Search from './components/SearchContent';


const Routes =() =>(
    <Router>
    <div style={{height: '100%'}}>
      <Route exact path="/" component={Home}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/admin" component={Admin}/>
      <Route exact path="/search" component={Search}/>
    </div>
  </Router>
)

export default Routes
