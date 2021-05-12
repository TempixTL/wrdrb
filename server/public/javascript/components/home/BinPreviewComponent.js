import { ce, versionedAsset } from '../../react-common.js';
import Bin from '../../models/Bin.js';
import Article from '../../models/Article.js';
import ClothingType from '../../models/ClothingType.js';
import Color from '../../models/Color.js';

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
    
    /**
     * @type {object}
     * @property {?Article[]} articles
     */
    this.state = {
      articles: this.props.bin.articles,
    };
  }

  componentDidMount() {
    if (this.state.articles === null)
      this.loadArticles();
  }

  async loadArticles() {
    // TODO fetch articles in bin from server
    // const response = await fetch(`bins/${this.props.bin.id}/articles`);

    // mock network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.setState({
      articles: [ 
        new Article(0, ClothingType.Shirt, Color.Red, 'Testing Brand', null, null, null),
        new Article(1, ClothingType.Shorts, Color.Blue, 'Testing Brand', null, null, null),
        new Article(2, ClothingType.Shoes, Color.White, 'Testing Brand', null, null, null),
      ]
    });
  }

  /**
   * @param {Article} article
   * @returns {string} A short caption of `article`.
   */
  articleCaption(article) {
    if (article.brand !== null)
      return `${article.brand}, ${article.clothingType}`;
    else
      return article.clothingType;
  }

  render() {
    return ce('div', { className: 'section' },
      ce('div', { className: 'row' },
        ce('div', { className: 'col s12' },
          ce('h4', null, this.props.bin.name),
        ),
      ),
      ce('div', { className: 'row' },
        (() => {
          if (this.state.articles === null)
            return ce('div', { className: 'col s12' },
              ce('div', { className: 'progress' },
                ce('div', { className: 'indeterminate' }),
              ),
            );
          else
            return this.state.articles.map((article, index) =>
              ce('div', { key: index, className: 'col s12 m6 l4'},
                ce('div', { className: 'card' },
                  ce('div', { className: 'card-image' },
                    ce('img', { src: article.img || versionedAsset('/images/article-placeholder.svg') }),
                    ce('div', { className: 'card-image-gradient' }),
                    ce('span', { className: 'card-title' }, this.articleCaption(article)),
                  ),
                ),
              )
            );
        })(),
      ),
    );
  }
}
