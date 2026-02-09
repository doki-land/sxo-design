/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App';
import 'virtual:sxo.css';

const root = document.getElementById('root');

if (root) {
    render(() => <App />, root);
}
