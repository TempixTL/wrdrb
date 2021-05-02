import { ce, csrfToken, versionedAsset } from '../react-common.js';
import NavBarComponent from './NavBarComponent.js';
import AuthenticationComponent from './authentication/AuthenticationComponent.js';
import AuthenticatedUser from '../models/AuthenticatedUser.js';

/**
 * The Main entry point of the React application.
 * 
 * Edit this component to change what is rendered on the index page.
 */
export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);

    /**
     * @typedef MainComponentState
     * @type {object}
     * @property {?AuthenticatedUser} user
     */
    this.state = {
      user: null,
    };
  }
  navbarOutfitLogClicked() {
    console.log('Outfit Log clicked');
  }

  navbarMyWardrobeClicked() {
    console.log('My Wardrobe clicked');
  }

  navbarMyBinsClicked() {
    console.log('My Bins clicked');
  }

  navbarLogoutClicked() {
    console.log('Logout clicked');
  }

  render() {
    return ce('div', null,
      ce(NavBarComponent, {
        onOutfitLogClicked: () => this.navbarOutfitLogClicked(),
        onMyWardrobeClicked: () => this.navbarMyWardrobeClicked(),
        onMyBinsClicked: () => this.navbarMyBinsClicked(),
        onLogoutClicked: () => this.navbarLogoutClicked(),
      }),
      ce(AuthenticationComponent),
    );
  }
}
