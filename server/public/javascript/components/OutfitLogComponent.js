import OutfitComponent from './OutfitComponent.js';
import { ce, csrfToken, versionedAsset } from '../react-common.js';
const outfitLogRoute = document.getElementById("outfitLogRoute").value;


export default class LogComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Lizzie",
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
      console.log("load outfits")
      this.setState({ outfits: data })
    })
  }
  componentDidMount() {
    this.loadOutfits(this.props.username);
  }

  changerHandler(e) {
    this.setState({ [e.target['id']]: e.target.value });
  }

  createArticle(e){

  }

  render(){
    console.log("here")
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
      //make text fields show *
      //let them be typed in *
      //submit info
  }
}
/*
export default props => 
  props.images.map((image, i) =>
    <div key={i} className='fadein'>
      <div 
        onClick={() => props.removeImage(image.public_id)} 
        className='delete'
      >
      </div>
      <img src={image.secure_url} alt='' />
    </div>
  )

onChange = e => {
  const files = Array.from(e.target.files)
  this.setState({ uploading: true })

  const formData = new FormData()

  files.forEach((file, i) => {
    formData.append(i, file)
  })

  fetch(`${API_URL}/image-upload`, {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(images => {
    this.setState({ 
      uploading: false,
      images
    })
  })
};

removeImage = id => {
  this.setState({
    images: this.state.images.filter(image => image.public_id !== id)
  })
};



/*render() {
  const { uploading, images } = this.state

  const content = () => {
    switch(true) {
      case uploading:
        return <Spinner />
      case images.length > 0:
        return <Images images={images} removeImage={this.removeImage} />
      default:
        return <Buttons onChange={this.onChange} />
    }
  }

  return (
    <div>
      <div className='buttons'>
        {content()}
      </div>
    </div>
  )
}*/
