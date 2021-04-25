import { ce } from '../react-common.js';

/**
 * @typedef BinPreviewComponentProps
 * @type {object}
 * @property {Bin} bin The bin to preview.
 * 
 * @typedef Bin A collection of articles.
 * Can either be user-organized, or automatically generated (i.e. 'Recently
 * Logged' bin).
 * @type {object}
 * @property {string} name The name of the bin.
 * @property {BinArticle[]} articles The array of all articles in the bin.
 * 
 * @typedef BinArticle An article decorated with extra information relevant to
 * the bin that it's stored within.
 * @type {object}
 * @property {Date} dateAdded The date the article was added to the bin.
 * @property {string} img An image of the article.
 */

/**
 * A component which previews a single `Bin`, and therefore, all of it's
 * contained `Article`s.
 * @property {BinPreviewComponentProps} props
 */
export default class BinPreviewComponent extends React.Component {
  render() {
    return ce('div', null,
      ce('h2', null, this.props.bin.name),
      ce('div', { className: 'masonry' },
        this.props.bin.articles.map((article, index) =>
          ce('div', { key: index },
            ce('img', { src: article.img }),
            ce('span', null, article.dateAdded.toDateString()),
          )
        ),
      ),
    );
  }
}
