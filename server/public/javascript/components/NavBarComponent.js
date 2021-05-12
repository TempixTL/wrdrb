import { ce, versionedAsset } from '../react-common.js';
import '../models/ClickCallback.js';

/**
 * @typedef NavBarComponentProps
 * @type {object}
 * @property {ClickCallback} onBrandClicked
 * @property {ClickCallback} onOutfitLogClicked
 * @property {ClickCallback} onMyWardrobeClicked
 * @property {ClickCallback} onMyBinsClicked
 * @property {ClickCallback} onLogoutClicked
 */

/**
 * The component primarily responsible for navigation within the app.
 */
export default class NavBarComponent extends React.Component {
  constructor(props) {
    super(props);
    /** @type {NavBarComponentProps} */
    this.props;
  }

  closeNavBar() {
    console.log(M.Sidenav);
  }

  componentDidMount() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
  }

  render() {
    return ce('div', null,
      ce('div', { className: 'navbar-fixed' },
        ce('nav', null,
          ce('div', { className: 'nav-wrapper' },
            ce('img', {
              src: versionedAsset('images/logo-nav.svg'),
              onClick: this.props.onBrandClicked,
              className: 'brand-logo',
              style: { height: '125%', cursor: 'pointer' },
            }),
            ce('a', { href: '#', 'data-target': 'mobile-menu', className: 'sidenav-trigger' }, ce('i', { className: 'material-icons' }, 'menu')),
            ce('div', { className: 'right hide-on-med-and-down' },
              ce('ul', null,
                ce('li', null, ce('a', { href: '#', onClick: this.props.onOutfitLogClicked }, 'Outfit Log')),
                ce('li', null, ce('a', { href: '#', onClick: this.props.onMyWardrobeClicked }, 'My Wardrobe')),
                ce('li', null, ce('a', { href: '#', onClick: this.props.onMyBinsClicked }, 'My Bins')),
                ce('li', null, ce('a', { href: '#', onClick: this.props.onLogoutClicked }, 'Logout')),
              ),
            ),
          ),
        ),
      ),
      ce('ul', { id: 'mobile-menu', className: 'sidenav' },
        ce('li', null, ce('a', { href: '#', onClick: this.props.onOutfitLogClicked, className: 'sidenav-close' }, 'Outfit Log')),
        ce('li', null, ce('a', { href: '#', onClick: this.props.onMyWardrobeClicked, className: 'sidenav-close' }, 'My Wardrobe')),
        ce('li', null, ce('a', { href: '#', onClick: this.props.onMyBinsClicked, className: 'sidenav-close' }, 'My Bins')),
        ce('li', null, ce('a', { href: '#', onClick: this.props.onLogoutClicked, className: 'sidenav-close' }, 'Logout')),
      ),
    );
  }
}