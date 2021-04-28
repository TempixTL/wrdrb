import { ce } from '../react-common.js';
import Bin from '../models/Bin.js';

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
    return ce('div', null,
      ce('h2', null, this.props.bin.name),
      ce('div', { className: 'masonry' },
        this.props.bin.articles.map((article, index) =>
          ce('div', { key: index },
            ce('img', { src: article.img }),
          )
        ),
      ),
    );
  }
}
