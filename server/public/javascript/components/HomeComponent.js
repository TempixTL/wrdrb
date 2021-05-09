import { ce } from '../react-common.js';
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
      ce('div', { className: 'hero' },
        ce('div', { className: 'align-left' },
          ce('img', { src: 'https://via.placeholder.com/64' }),
          ce('div', null,
            ce('h1', null, `Good day, ${this.props.username}`),
            ce('div', null,
              ce('img', { src: 'https://via.placeholder.com/40' }),
              ce('p', null, '75°F, partly cloudy'),
            ),
          ),
        ),
        ce('div', { className: 'align-right' },
          ce('button', null,
            ce('img', { src: 'https://via.placeholder.com/20' }),
            ce('span', null, 'Log'),
          ),
          ce('button', null,
            ce('img', { src: 'https://via.placeholder.com/20' }),
            ce('span', null, 'Search'),
          ),
        ),
      ),
      this.state.bins.map((bin, index) => ce(BinPreviewComponent, { key: index, bin })),
    );
  }
}
