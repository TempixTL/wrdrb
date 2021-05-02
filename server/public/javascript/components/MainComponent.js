import { ce, csrfToken, versionedAsset } from '../react-common.js';
import NavBarComponent from './NavBarComponent.js';
import AuthenticationComponent from './authentication/AuthenticationComponent.js';

/**
 * The Main entry point of the React application.
 * 
 * Edit this component to change what is rendered on the index page.
 */
export default class MainComponent extends React.Component {
  navbarOutfitLogClicked() {
    console.log('Outfit Log clicked');
  }

  navbarMyWardrobeClicked() {
    console.log('My Wardrobe clicked');
  }

  navbarMyBinsClicked() {
    console.log('My Bins clicked');
  }

  render() {
    return ce('div', null,
      ce(NavBarComponent, {
        onOutfitLogClicked: () => this.navbarOutfitLogClicked(),
        onMyWardrobeClicked: () => this.navbarMyWardrobeClicked(),
        onMyBinsClicked: () => this.navbarMyBinsClicked(),
      }),
      ce(AuthenticationComponent),
    );
  }
}
