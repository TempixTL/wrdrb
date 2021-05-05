import { ce } from './react-common.js';
import MainComponent from './components/MainComponent.js';
import BinComponent from './components/BinComponent.js';

ReactDOM.render(
  ce(BinComponent),
  document.getElementById('react-root'),
);
