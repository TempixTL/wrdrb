import { ce } from '../react-common.js';
import '../models/ClickCallback.js';

/**
 * @typedef NavBarComponentProps
 * @type {object}
 * @property {ClickCallback} onOutfitLogClicked
 * @property {ClickCallback} onMyWardrobeClicked
 * @property {ClickCallback} onMyBinsClicked
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

  render() {
    return ce('div', { role: 'navigation' },
      ce('div', { className: 'align-left' },
        ce('img', { src: 'https://via.placeholder.com/64', className: 'brand' }),
      ),
      ce('div', { className: 'align-right' },
        ce('ul', null,
          ce('li', { onClick: this.props.onOutfitLogClicked }, 'Outfit Log'),
          ce('li', { onClick: this.props.onMyWardrobeClicked }, 'My Wardrobe'),
          ce('li', { onClick: this.props.onMyBinsClicked }, 'My Bins'),
        ),
      ),
    );
  }
}