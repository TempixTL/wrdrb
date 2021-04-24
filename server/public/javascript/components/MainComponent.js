import { ce, csrfToken, versionedAsset } from '../react-common.js';

/**
 * The Main entry point of the React application.
 * 
 * Edit this component to change what is rendered on the index page.
 */
export default class MainComponent extends React.Component {
  render() {
    return ce('div', null, 
      ce('h1', null, 'Hello, React!'),
      ce('p', null, `The CSRF Token is ${csrfToken}`),
      ce('img', { src: versionedAsset('images/favicon.png') }),
    );
  }
}
