import { ce, csrfToken, versionedAsset } from '../react-common.js';
import NavBarComponent from './NavBarComponent.js';
import AuthenticationComponent from './authentication/AuthenticationComponent.js';
import HomeComponent from './home/HomeComponent.js';
import OutfitLogComponent from './OutfitLogComponent.js';
import BinComponent from './BinComponent.js';
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
     * @property {React.Component} currentPage
     */
    this.state = {
      user: null,
      currentPage: HomeComponent,
    };
  }

  loginFormSubmitted(username, password) {
    this.setState({
      user: new AuthenticatedUser('Testing User', 'testing_user'),
    });
  }

  registerFormSubmitted(username, password) {
    console.log('Registering user', username, password);
  }

  navbarBrandClicked() {
    this.setState({
      currentPage: HomeComponent,
    });
  }

  navbarOutfitLogClicked() {
    this.setState({
      currentPage: OutfitLogComponent,
    });
  }

  navbarMyWardrobeClicked() {
    console.log('My Wardrobe clicked');
  }

  navbarMyBinsClicked() {
    this.setState({
      currentPage: BinComponent,
    });
  }

  navbarLogoutClicked() {
    this.setState({
      user: null,
    });
  }

  render() {
    return ce('div', { className: 'container' },
      (() => {
        if (this.state.user === null)
          return ce(AuthenticationComponent, {
            onLoginFormSubmit: (_, username, password) => this.loginFormSubmitted(username, password),
            onRegisterFormSubmit: (_, username, password) => this.registerFormSubmitted(username, password),
          });
        else 
          return ce('div', null,
            ce(NavBarComponent, {
              onBrandClicked: () => this.navbarBrandClicked(),
              onOutfitLogClicked: () => this.navbarOutfitLogClicked(),
              onMyWardrobeClicked: () => this.navbarMyWardrobeClicked(),
              onMyBinsClicked: () => this.navbarMyBinsClicked(),
              onLogoutClicked: () => this.navbarLogoutClicked(),
            }),
            ce(this.state.currentPage, { username: this.state.user.username }),
          );
      })(),
    );
  }
}
