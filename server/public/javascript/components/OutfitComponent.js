import { ce, csrfToken, versionedAsset } from '../react-common.js';

export default class OutfitComponent extends React.Component {
  constructor(props) {
    super(props);
  }


  render(){
    return ce('span', null, 
      this.props.outfit.date,
      ce('br'),
      this.props.outfit.articles,
      ce('br'),
      ce('img', { src: 'https://via.placeholder.com/64' }),
      ce('br'),

    )
  }
}