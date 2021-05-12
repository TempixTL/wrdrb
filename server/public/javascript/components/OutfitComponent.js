import { ce, csrfToken, versionedAsset } from '../react-common.js';

const clothingType = ["Shirt","Pants","Shoes","Hat","Dress","Skirt","Shorts"]
const color = ["Red","Orange","Yellow","Green","Blue","Indigo","Violet","Black","White","Grey","Brown"]
const weatherCondition = ["Snow","Sun", "Rain", "Wind"]

export default class OutfitComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ce('div', null, 
      JSON.stringify(this.props.outfit.date),
      ce('br'),
      this.props.outfit.articles.map((article, index) => {
        return ce('ul', {key:index},
          ce('li',null, article.brand),
          ce('li',null, article.material),
          ce('li',null, clothingType[article.clothing_type-1]),
          ce('li',null, color[article.color-1]),
          ce('li',null, weatherCondition[article.weather_condition-1]),
        )
      }),
      ce('br'),
      ce('img', { src: 'https://via.placeholder.com/64' }),
      ce('br'),
    );
  }
}
