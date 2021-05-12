import { ce } from '../react-common.js';
import '../models/PageLikeComponentProps.js';

/**
 * A page-like component for viewing the user's wardrobe.
 */
export default class WardrobeComponent extends React.Component {
  constructor(props) {
    super(props);
    /** @type {PageLikeComponentProps} */
    this.props;
  }

  render() {
    return ce('h1', null, 'TODO');
  }
}
