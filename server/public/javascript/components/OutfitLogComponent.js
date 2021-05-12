import OutfitComponent from './OutfitComponent.js';
import { ce, csrfToken, versionedAsset } from '../react-common.js';
import Outfit from '../models/Outfit.js';
import '../models/PageLikeComponentProps.js';
import Article from '../models/Article.js';
const outfitLogRoute = document.getElementById("outfitLogRoute").value;

/**
 * A page-like component which renders the user's outfit log.
 */
export default class OutfitLogComponent extends React.Component {
  constructor(props) {
    super(props);
    /** @type {PageLikeComponentProps} */
    this.props;

    /**
     * @type {object}
     * @property {?Outfit[]} outfits The outfits of the current user, or
     * `null` if they are still loading.
     * @property {boolean} pulseActionButton Pulses the action button initially
     * so the user sees it.
     */
    this.state = {
      outfits: null,
      pulseActionButton: true,
    };
  }

  async loadOutfits() {
    const response = await fetch(outfitLogRoute, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Csrf-Token': csrfToken
      },
    });

    if (response.ok) {
      const outfitsJson = await response.json();
      const outfits = outfitsJson.map((outfitJson, index) => new Outfit(
        outfitJson.id || index,
        new Date(outfitJson.date),
        outfitJson.image || null,
        outfitJson.articles.map((articleJson) => new Article(
          articleJson.id,
          articleJson.clothing_type || articleJson.clothingType,
          articleJson.color || null,
          articleJson.brand || null,
          articleJson.weather || articleJson.weather_condition || null,
          articleJson.material || null,
          articleJson.image || null,
        )),
      ));

      this.setState({ outfits });
    } else if (response.status === 400) {
      // 400 Unauthorized
      M.toast({html: 'Must be logged in to retrieve outfits.'});
      console.log('Must be logged in to retrieve outfits.', response.status);
    } else {
      console.log(response.status);
    }
  }

  componentDidMount() {
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
    if (this.state.outfits === null)
      this.loadOutfits();
  }

  changerHandler(e) {
    this.setState({ [e.target['id']]: e.target.value });
  }

  render(){
    return ce('div', null, 
      ce('h1', null, 'Outfit Log'),
      ce('div', { className: 'fixed-action-btn' },
        ce('a', {
            href: '#',
            onMouseOver: () => this.setState({pulseActionButton: false}),
            className: 'btn-floating btn-large' + ((this.state.pulseActionButton) ? ' pulse' : '') },
          ce('i', { className: 'large material-icons' }, 'mode_edit'),
        ),
        ce('ul', null,
          ce('li', null, ce('a', { className: 'btn-floating green' }, ce('i', { className: 'material-icons' }, 'event'))),
          ce('li', null, ce('a', { className: 'btn-floating blue' }, ce('i', { className: 'material-icons' }, 'more_horiz'))),
        ),
      ),
      (() => {
        if (this.state.outfits === null)
          return ce('div', { className: 'progress' },
            ce('div', { className: 'indeterminate' }),
          );
        else
          return this.state.outfits.map((outfit, index) => 
            ce(OutfitComponent, { key: index, outfit })
          );
      })(),
    )
  }
}

