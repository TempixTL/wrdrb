import { ce, csrfToken, versionedAsset } from '../react-common.js';
import AuthenticationComponent from './AuthenticationComponent.js';

/**
 * The Main entry point of the React application.
 * 
 * Edit this component to change what is rendered on the index page.
 */
export default class MainComponent extends React.Component {
  render() {
    return ce(AuthenticationComponent);
  }
}
