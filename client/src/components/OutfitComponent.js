import * as React from 'react';
import { ce, csrfToken, versionedAsset } from '../react-common';
import Outfit from '../models/Outfit';

const clothingType = ["Shirt","Pants","Shoes","Hat","Dress","Skirt","Shorts"]
const color = ["Red","Orange","Yellow","Green","Blue","Indigo","Violet","Black","White","Grey","Brown"]
const weatherCondition = ["Snow","Sun", "Rain", "Wind"]

/**
 * @typedef {object} OutfitComponentProps
 * @type {object}
 * @property {Outfit} outfit
 */

/**
 * A component which renders a single `Outfit`.
 */
export default class OutfitComponent extends React.Component {
  constructor(props) {
    super(props);
    /** @type {OutfitComponentProps} */
    this.props;
  }

  render() {
    return ce('div', { className: 'section' },
      ce('div', { className: 'row' },
        ce('div', { className: 'col s12' },
          ce('h4', null, this.props.outfit.date.toLocaleDateString()),
        ),
      ),
      ce('div', { className: 'row' },
        ce('div', { className: 'col s12' },
          ce('button', { className: 'btn waves-effect waves-dark white' },
              ce('span', { className: 'black-text' }, 'Add Article'),
              ce('i', { className: 'material-icons left black-text' }, 'add'),
          ),
          ce('span', null, ' '),
          ce('button', { className: 'btn waves-effect waves-light red' },
              ce('span', null, 'Delete Outfit'),
              ce('i', { className: 'material-icons left' }, 'delete'),
          ),
        ),
      ),
      ce('div', { className: 'row' },
        this.props.outfit.articles.map((article, index) =>
          ce('div', { key: index, className: 'col s12 m6 l4'},
            ce('div', { className: 'card' },
              ce('div', { className: 'card-image' },
                ce('img', { src: article.img || versionedAsset('/images/article-placeholder.svg') }),
                ce('div', { className: 'card-image-gradient' }),
                ce('span', { className: 'card-title' }, article.brand),
              ),
              ce('div', { className: 'card-content' },
                ce('div', { className: 'chip' }, clothingType[article.clothingType-1].toLowerCase()),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
