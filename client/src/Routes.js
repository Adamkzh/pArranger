import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import Try from './components/Try';

const Routes =() =>(
    <Router>
    <div style={{height: '100%'}}>
      <Route exact path="/" component={Home}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/learn" component={Learn}/>
      <Route exact path="/try" component={Try}/>
    </div>
  </Router>
)

export default Routes
