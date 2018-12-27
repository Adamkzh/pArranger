import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
<Routes />, document.getElementById('root')
);
registerServiceWorker();
