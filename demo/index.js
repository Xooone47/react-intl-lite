import '@babel/polyfill';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
