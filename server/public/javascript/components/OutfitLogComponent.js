import OutfitComponent from './OutfitComponent.js';
import { ce, csrfToken, versionedAsset } from '../react-common.js';
const outfitLogRoute = document.getElementById("outfitLogRoute").value;


export default class OutfitLogComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "lizzie",
      outfitDate: "04/29/2021", 
      outfits: [],
      createDate: "",
      createArticles: [],
    };
  }

  loadOutfits(username){
    fetch(outfitLogRoute, {
      method: "GET",
      headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
    }).then(res => res.json()).then(data => {
      this.setState({ outfits: data })
    })
  }
  componentDidMount() {
    this.loadOutfits(this.props.username);
  }

  changerHandler(e) {
    this.setState({ [e.target['id']]: e.target.value });
  }

  render(){
    return ce('div', null, 
      ce('h2', null, 'Outfit Log:'),
      ce('br'),
      this.state.outfits.map((outfit, index) => 
        ce(OutfitComponent, {key:index, outfit})),
      ce('br'),
      ce('h2', null, 'Create new Outfit:'),
      ce('input', {type: "text", id: "createDate", value: this.state.createDate, placeholder:'date', onChange: e => this.changerHandler(e)}),
      ce('br'),
      ce('input', {type: "text", id: "createArticles", value: this.state.createArticles, placeholder:'articles', onChange: e => this.changerHandler(e)}),
      ce('button', {onClick: e => this.createArticle(e)}, 'Create Article'),
    )
  }
}

