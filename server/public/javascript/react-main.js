import { ce } from './react-common.js';
import MainComponent from './components/MainComponent.js';
import BinComponent from './components/BinComponent.js';
import LogComponent from './outfitLog.js'

ReactDOM.render(
  ce(LogComponent),
  document.getElementById('react-root'),
);
