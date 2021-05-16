import * as React from 'react';
import { ce, versionedAsset } from '../../react-common';
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

  /**
   * Returns the name of a `clothingType` based on it's ID.
   * 
   * @param {number} clothingTypeId Integer representing the ID of the clothingType
   * @returns A string describing the clothing type.
   */
  clothingTypeFromId(clothingTypeId) {
    const clothingTypesInOrder = [ 
      ClothingType.Shirt,
      ClothingType.Pants,
      ClothingType.Shoes,
      ClothingType.Hat,
      ClothingType.Dress,
      ClothingType.Skirt,
      ClothingType.Shorts,
    ];

    return clothingTypesInOrder[clothingTypeId-1];
  }

  async loadArticles() {
    // the path for this should be `bins/{binId}/articles`, but this will have
    // do one day before the deadline
    const response = await fetch(`bin/${this.props.bin.id}`);
    
    if (response.ok) {
      const articlesJson = await response.json();
      const articles = articlesJson.map((articleJson) => new Article(
        articleJson.id,
        // `clothingType` is correct according to API spec, but we currently get `clothing_type`
        this.clothingTypeFromId(articleJson.clothingType || articleJson.clothing_type),
        articleJson.color || null,
        articleJson.brand || null,
        // `weather` is correct according to API spec, but we currently get `weather_condition`
        articleJson.weather || articleJson.weather_condition || null,
        articleJson.material || null,
        articleJson.image || null,
      ));

      this.setState({ articles });
    } else if (response.status === 404) {
      M.toast({html: `Bin "${this.props.bin.name}" not found.`});
    } else {
      console.log(`Bin "${this.props.bin.name}" not found.`, response.status);
    }
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
          else if (this.state.articles.length === 0)
            return ce('div', { className: 'col s12'},
              ce('p', null, ce('em', null, 'There are no articles in this bin.')),
            );
          else
            return this.state.articles.map((article, index) =>
              ce('div', { key: index, className: 'col s12 m6 l4'},
                ce('div', { className: 'card' },
                  ce('div', { className: 'card-image' },
                    ce('img', { src: article.img || versionedAsset('/images/article-placeholder.svg') }),
                    ce('div', { className: 'card-image-gradient' }),
                    ce('span', { className: 'card-title' }, article.brand),
                  ),
                  ce('div', { className: 'card-content' },
                    ce('div', { className: 'chip' }, article.clothingType),
                  ),
                ),
              )
            );
        })(),
      ),
    );
  }
}
