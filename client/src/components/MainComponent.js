import * as React from 'react';
import { ce, csrfToken, versionedAsset } from '../react-common';
import NavBarComponent from './NavBarComponent.js';
import AuthenticationComponent from './authentication/AuthenticationComponent.js';
import HomeComponent from './home/HomeComponent.js';
import OutfitLogComponent from './OutfitLogComponent.js';
import WardrobeComponent from './WardrobeComponent.js';
import BinComponent from './BinComponent.js';
import AuthenticatedUser from '../models/AuthenticatedUser.js';
import '../models/NavigateCallback.js';
import Page from '../models/Page.js';

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
     * @property {Page} currentPage
     */
    this.state = {
      user: null,
      currentPage: Page.Home,
    };
  }

  async loginFormSubmitted(username, password) {
    const response = await fetch('/user/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Csrf-Token': csrfToken,
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (response.ok) {
      const user = await response.json();
      this.successfulSignIn(user);
    } else if (response.status === 401) {
      // 401 Unauthorized
      M.toast({html: 'Invalid username/password combination.'});
    } else {
      console.log(response.status);
    }
  }

  async registerFormSubmitted(username, password) {
    const response = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Csrf-Token': csrfToken,
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      this.successfulSignIn(user);
    } else if (response.status === 409) {
      // 409 Conflict
      M.toast({html: `Username "${username}" is taken.`});
    } else {
      console.log(response.status);
    }
  }

  /** @param {AuthenticatedUser} user */
  successfulSignIn(user) {
    M.toast({html: `Signed in as ${user.username}.`});
    this.setState({ user });
  }

  navbarBrandClicked() {
    this.setState({
      currentPage: Page.Home,
    });
  }

  navbarOutfitLogClicked() {
    this.setState({
      currentPage: Page.OutfitLog,
    });
  }

  navbarMyWardrobeClicked() {
    this.setState({
      currentPage: Page.Wardrobe,
    });
  }

  navbarMyBinsClicked() {
    this.setState({
      currentPage: Page.Bins,
    });
  }

  /**
   * Used by page-like components to navigate to other pages within the
   * Application.
   * @param {Page} page The page to navigate to
   */
  navigate(page) {
    this.setState({ currentPage: page });
  }

  currentPageComponent() {
    switch (this.state.currentPage) {
      case Page.Home:
        return HomeComponent;
      case Page.OutfitLog:
        return OutfitLogComponent;
      case Page.Wardrobe:
        return WardrobeComponent;
      case Page.Bins:
        return BinComponent;
    }
  }

  async navbarLogoutClicked() {
    const response = await fetch('/logout');
    
    if (response.ok) {
      M.toast({html: 'Successfully signed out.'});
      this.setState({
        user: null,
        currentPage: Page.Home,
      });
    } else {
      M.toast({html: `Unable to sign out. ${response.statusText}.`});
    }
  }

  render() {
    return ce('div', null,
      (() => {
        if (this.state.user === null)
          return ce('div', { className: 'container' },
            ce(AuthenticationComponent, {
              onLoginFormSubmit: (_, username, password) => this.loginFormSubmitted(username, password),
              onRegisterFormSubmit: (_, username, password) => this.registerFormSubmitted(username, password),
            }),
          );
        else 
          return ce('div', null,
            ce(NavBarComponent, {
              onBrandClicked: () => this.navbarBrandClicked(),
              onOutfitLogClicked: () => this.navbarOutfitLogClicked(),
              onMyWardrobeClicked: () => this.navbarMyWardrobeClicked(),
              onMyBinsClicked: () => this.navbarMyBinsClicked(),
              onLogoutClicked: () => this.navbarLogoutClicked(),
            }),
            ce('div', { className: 'container section' },
              ce(this.currentPageComponent(), { 
                  key: this.state.user.id,
                  username: this.state.user.username,
                  navigate: (p) => this.navigate(p) }),
            ),
          );
      })(),
    );
  }
}
