const ce = React.createElement
//const outfitLogRoute = document.getElementById("outfitLogRoute").value;
//const outfitDetailsRoute = document.getElementById("outfitDetailsRoute").value;

class LogComponent extends React.Component {
 
}

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

render() {
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
}

