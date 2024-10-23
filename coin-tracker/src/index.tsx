import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styling/App.css';

/**
 * Renders the React application into the root element of the HTML document.
 * Utilizes React's StrictMode for highlighting potential problems in the application.
 */
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
);
