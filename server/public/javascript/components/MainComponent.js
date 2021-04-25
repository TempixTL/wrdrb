import { ce, csrfToken, versionedAsset } from '../react-common.js';
import HomeComponent from './HomeComponent.js';

/**
 * The Main entry point of the React application.
 * 
 * Edit this component to change what is rendered on the index page.
 */
export default class MainComponent extends React.Component {
  render() {
    return ce(HomeComponent, { username: 'USERNAME' });
  }
}
