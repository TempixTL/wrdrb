import { ce } from '../../react-common.js';
import BinPreviewComponent from './BinPreviewComponent.js';

/**
 * @typedef HomeComponentProps
 * @type {object}
 * @property {string} username The username of the logged-in user
 */

/**
 * A page-like component which represents the home page of the application.
 * @property {HomeComponentProps} props
 */
export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);

    /**
     * @type {object}
     * @property {Bin[]} bins
     */
    this.state = {
      bins: [
        {
          name: 'Placeholder Bin  1',
          articles: new Array(3).fill({ dateAdded: new Date(), img: 'https://via.placeholder.com/150' }),
        },
        {
          name: 'Placeholder Bin  2',
          articles: new Array(3).fill({ dateAdded: new Date(), img: 'https://via.placeholder.com/150' }),
        },
        {
          name: 'Placeholder Bin  3',
          articles: new Array(3).fill({ dateAdded: new Date(), img: 'https://via.placeholder.com/150' }),
        },
      ],
    };
  }

  render() {
    return ce('div', null,
      ce('div', { className: 'row hero' },
        ce('div', { className: 'col s12 m6' },
          ce('h3', { className: 'white-text' }, `Welcome, ${this.props.username}`),
        ),
        ce('div', { className: 'col s12 m6 center-align' },
          ce('button', { className: 'waves-effect waves-dark btn-large white', style: { marginLeft: '10px' } },
            ce('i', { className: 'large material-icons left black-text' }, 'edit'),
            ce('span', { className: 'black-text'}, 'Log'),
          ),
          ce('button', { className: 'waves-effect waves-light btn-large', style: { margin: '10px 0 10px 10px'} },
            ce('i', { className: 'large material-icons left' }, 'search'),
            ce('span', null, 'Search'),
          ),
        ),
      ),
      this.state.bins.map((bin, index) => ce(BinPreviewComponent, { key: index, bin })),
    );
  }
}
