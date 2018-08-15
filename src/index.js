import React from 'react';
import ReactDOM from 'react-dom';
import "normalize.css"
import './scss/index.scss';
import "./scss/app.scss";
import "./scss/kiln-dashboard.scss";
import App from './components/App';
import { BrowserRouter } from "react-router-dom"
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
