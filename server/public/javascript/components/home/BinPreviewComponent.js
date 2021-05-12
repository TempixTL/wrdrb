import { ce } from '../../react-common.js';
import Bin from '../../models/Bin.js';

/**
 * @typedef BinPreviewComponentProps
 * @type {object}
 * @property {Bin} bin The bin to preview.
 */

/**
 * A component which previews a single `Bin`, and therefore, all of it's
 * contained `Article`s.
 */
export default class BinPreviewComponent extends React.Component {
  constructor(props) {
    super(props);
    /** @type {BinPreviewComponentProps} */
    this.props;
  }

  render() {
    return ce('div', { className: 'section' },
      ce('div', { className: 'row' },
        ce('div', { className: 'col s12' },
          ce('h4', null, this.props.bin.name),
        ),
      ),
      ce('div', { className: 'row' },
        this.props.bin.articles.map((article, index) =>
          ce('div', { key: index, className: 'col s12 m6 l4'},
            ce('div', { className: 'card' },
              ce('div', { className: 'card-image' },
                ce('img', { src: article.img, width: '150px' }),
              ),
            ),
          )
        ),
      ),
    );
  }
}
