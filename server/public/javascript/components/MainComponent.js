import { ce, csrfToken, versionedAsset } from '../react-common.js';
<<<<<<< HEAD
import HomeComponent from './HomeComponent.js';
=======
import AuthenticationComponent from './authentication/AuthenticationComponent.js';
>>>>>>> a03c3b2f0e9eee4fe130f42ff828392af1e60490

/**
 * The Main entry point of the React application.
 * 
 * Edit this component to change what is rendered on the index page.
 */
export default class MainComponent extends React.Component {
  render() {
<<<<<<< HEAD
    return ce(HomeComponent, { username: 'USERNAME' });
=======
    return ce(AuthenticationComponent);
>>>>>>> a03c3b2f0e9eee4fe130f42ff828392af1e60490
  }
}
