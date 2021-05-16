import * as React from 'react';
import { ce, csrfToken, versionedAsset } from '../react-common';
import '../models/PageLikeComponentProps';


/**
 * A page-like component that displays all the user's articles.
 */
export default class MyWardrobeComponent extends React.Component {
    constructor(props){
        super(props);
        /** @type {PageLikeComponentProps} */
        this.props;

        /**
         * @typedef MyWardrobeComponentState
         * @type {object}
         * @property {Articles[]} articles
         * @property {string} searchText The current wardrobe search text.
         * @property {?string} selected The currently selected article.
         */
        this.state = {
            gender: 2,
            allOptions: ["allOptions"],
            brandOptions: ["All", "J.Crew", "Old Navy", "Tommy Hilfiger", "Levi's", "Nike"],
            selectedBrand: "Select a Brand",
            clothingOptions: ["All", "Shirt", "Pants", "Jacket"],
            selectedClothing: "Select a Clothing Type",
            colorOptions: ["All", "Navy", "White", "Red", "Blue"],
            selectedColor: "Select a Color",
            materialOptions: ["All", "Cotton", "Nylon"],
            selectedMaterial: "Select a Material",
            weatherOptions: ["All", "Sun", "Snow", "Rain"],
            selectedWeather: "Select Weather Conditions",
            articles: [],
            articleBrand: "",
            articleType: "",
            articleColor: "",
            articleMaterial: "",
            articleWeather: "",
            searchText: "",
            selected: null,
            currArticle: null,
        };
    }

    componentDidMount() {
        M.FormSelect.init(document.querySelectorAll('select'));
        M.Modal.init(document.querySelectorAll('.modal'));
        this.setArticles()
    }

    setArticles() {
        this.setState({ articles: [
            {id: 0, brand: "J.Crew", material: "Cotton", clothing_type: "Shirt", color:"Navy", weather_condition:"Sun", imageURL: "/images/J.CrewNavyT-Shirt.jpg"},
            {id: 1, brand: "Old Navy", material: "Cotton", clothing_type: "Shirt", color: "White", weather_condition:"Sun", imageURL: "/images/OldNavyWhiteDressShirt.jpg"},
            {id: 2, brand: "Tommy Hilfiger", material: "Nylon", clothing_type: "Jacket", color: "Red", weather_condition:"Snow", imageURL: "/images/TommyHilfigerPufferJacket.jpg"},
            {id: 3, brand: "Levi's", material: "Cotton", clothing_type: "Pants", color: "Blue", weather_condition:"Sun", imageURL: "/images/Levi'sBlueJeans.jpg"},
            {id: 4, brand: "Nike", material: "Nylon", clothing_type: "Jacket", color: "Red", weather_condition:"Rain", imageURL: "/images/NikeRedWindbreaker.jpg"},
        ]})
    }
/*     getArticleInfo() {
        fetch(`/bin/${this.state.currArticle.id}`).then(res => res.json()).then(data => {
            this.setState({ articles: data })
        })
    }
 */
    async addArticle() {
      if (this.state.articleBrand != "" && this.state.articleType != "" && this.state.articleColor != "" && this.state.articleMaterial != "" && this.state.articleWeather != "") {
        let newState = this.state.articles
        newState.push({brand: this.state.articleBrand, material: this.state.articleMaterial, 
          clothing_type: this.state.articleType, color: this.state.articleColor, weather_condition: this.state.articleWeather, 
          imageURL: '/images/article-placeholder.svg'})
        this.setState({ articles: newState })
        this.setState({ articleBrand: "" })
        this.setState({ articleMaterial: "" })
        this.setState({ articleType: "" })
        this.setState({ articleColor: "" })
        this.setState({ articleWeather: "" })
        M.toast({html: `Article added`});
      } else {
        M.toast({html: `Please fill all article fields`});
      }

        /* const response = await fetch('/article', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Csrf-Token': csrfToken,
          },
          body: JSON.stringify({ brand, material, clothing_type, color, weather_condition }),
        });
        if (response.ok) {
            M.toast({html: `Article added`});
            this.setState({ addText: "" })
            this.setMaleArticles();
        } else {
          console.log(response.status);
        } */
    }

    async deleteArticle(articleId) {
        let newState = this.state.articles.filter(_ => _.id != articleId)
        this.setState({ articles: newState })
        M.toast({html: `Article deleted`});


        /* const response = await fetch(`/article/${articleId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Csrf-Token': csrfToken,
          }
        });
        if (response.ok) {
            M.toast({html: `Article deleted`});
            this.setState({ selected: null })
            this.getBins();
        } else {
          console.log(response.status);
        } */
    }


    // loadBins(username){
    //     this.setState({
    //         bins: [
    //             { name: "Your Favorites", articles: ["Default Shirt"] },
    //             { name: "Work", articles: ["White Shirt", " Black Pants", "Black Shoes"] }, 
    //             { name: "Weekend", articles: ["Blue Hat", "White Shirt", "Black Tie", "Blue Pants"] },
    //             { name: "Home", articles: ["Gray Shirt", "Black Pants"] }
    //         ]
    //     });
    // }
    
    changeHandler(e) {
        this.setState({[e.target['id']]: e.target.value});
    }

    handleArticleClick(article) {
        this.setState({ selected: article.id });
        this.setState({ currArticle: article });
    }

    resetFilters(){
      this.setState({ selectedBrand: "All" })
      this.setState({ selectedClothing: "All" })
      this.setState({ selectedColor: "All" })
      this.setState({ selectedMaterial: "All" })
      this.setState({ selectedWeather: "All" })
    }

    // <form action="#">
    // <div class="file-field input-field">
    //   <div class="btn">
    //     <span>File</span>
    //     <input type="file">
    //   </div>
    //   <div class="file-path-wrapper">
    //     <input class="file-path validate" type="text">
    //   </div>
    // </div>
    // </form>

    render() {
        return ce('div', null, 
            ce('h1', null, this.props.username + "'s Wardrobe"),
            ce('button', {"data-target": "add-article-modal", className: "btn modal-trigger"}, "Add Article"),
            ce('div', { id: 'add-article-modal', className: 'modal' },
                ce('div', { className: 'modal-content' },
                    ce('h4', null, 'Create a New Article'),
                    ce('div', { className: 'section' },
                        ce('div', { className: 'input-field col s12' },
                            ce('input', {
                                    name: 'article-brand',
                                    type: 'text',
                                    value: this.state.articleBrand,
                                    onChange: (e) => this.setState({ articleBrand: e.target.value }) }),
                            ce('label', { htmlFor: 'article-brand' }, 'Brand'),
                            ce('div', { className: 'input-field col s12' },
                              ce('input', {
                                      name: 'article-clothing-type',
                                      type: 'text',
                                      value: this.state.articleType,
                                      onChange: (e) => this.setState({ articleType: e.target.value }) }),
                              ce('label', { htmlFor: 'article-clothing-type' }, 'Clothing Type'),
                            ),
                            ce('div', { className: 'input-field col s12' },
                              ce('input', {
                                      name: 'article-color',
                                      type: 'text',
                                      value: this.state.articleColor,
                                      onChange: (e) => this.setState({ articleColor: e.target.value }) }),
                              ce('label', { htmlFor: 'article-color' }, 'Color'),
                            ),
                            ce('div', { className: 'input-field col s12' },
                              ce('input', {
                                      name: 'article-material',
                                      type: 'text',
                                      value: this.state.articleMaterial,
                                      onChange: (e) => this.setState({ articleMaterial: e.target.value }) }),
                              ce('label', { htmlFor: 'article-material' }, 'Material'),
                            ),
                            ce('div', { className: 'input-field col s12' },
                              ce('input', {
                                      name: 'article-weather',
                                      type: 'text',
                                      value: this.state.articleWeather,
                                      onChange: (e) => this.setState({ articleWeather: e.target.value }) }),
                              ce('label', { htmlFor: 'article-weather' }, 'Weather Conditions'),
                            ),
                            ce('form', {action: '#'}, 
                              ce('div', {className: 'btn-small'}, ce('span', null, ""), ce('input', {type: 'file'})),
                              // ce('div', {className: 'file-path-wrapper'}, ce('input', {className: "file-path validate", type: 'text'}))
                            ),
                          ),
                ),
                ce('div', { className: 'modal-footer' },
                    ce('a', {
                            onClick: () => this.addArticle(),
                            className: 'modal-close btn waves-effect waves-dark z-depth-0' }, 'Create Article'),
                    ce('a', { 
                            onClick: () => this.setState({ addText: '' }),
                            className: 'modal-close btn-flat waves-effect waves-dark' }, 'Cancel'),
                ),
              ),
            ),
            ce('br'),ce('br'),ce('br'),
            ce('div', { className: 'row' },
              ce('div', { className: "input-field col s2"},
                ce('select', {onChange: e => this.setState({ selectedBrand: e.target.value })}, ce('option', {defaultValue:true, disabled: true}, "Select a Brand"), this.state.brandOptions.map((type, index) => ce('option', {key: index, value: type}, type))),
                ce('label', null, "Brand")
              ),
              ce('div', { className: "input-field col s2"},
                ce('select', {onChange: e => this.setState({ selectedClothing: e.target.value })}, ce('option', {defaultValue:true, disabled: true}, "Select a Clothing Type"), this.state.clothingOptions.map((type, index) => ce('option', {key: index, value: type}, type))),
                ce('label', null, "Clothing Type")
              ),
              ce('div', { className: "input-field col s2"},
                ce('select', {onChange: e => this.setState({ selectedColor: e.target.value })}, ce('option', {defaultValue:true, disabled: true}, "Select a Color"), this.state.colorOptions.map((type, index) => ce('option', {key: index, value: type}, type))),
                ce('label', null, "Color")
              ),
              ce('div', { className: "input-field col s2"},
                ce('select', {onChange: e => this.setState({ selectedMaterial: e.target.value })}, ce('option', {defaultValue:true, disabled: true}, "Select a Material"), this.state.materialOptions.map((type, index) => ce('option', {key: index, value: type}, type))),
                ce('label', null, "Material")
              ),
              ce('div', { className: "input-field col s2"},
                ce('select', {onChange: e => this.setState({ selectedWeather: e.target.value })}, ce('option', {defaultValue:true, disabled: true}, "Select Weather Conditions"), this.state.weatherOptions.map((type, index) => ce('option', {key: index, value: type}, type))),
                ce('label', null, "Weather")
              ),
              ce('div', { className: "col s2"},
                ce('button', { className: "waves-effect waves-light btn-large", onClick: e => this.resetFilters()}, "Clear Filters")
              ),
            ),
            ce('br'),
            ce('div', { className: 'row' },
              (() => {
                  return this.state.articles.map((article, index) =>
                    ce('div', { key: index, className: 'col s3'},
                      ce('div', { className: 'card' },
                        ce('div', { className: 'card-image' },
                          ce('img', { src: versionedAsset(article.imageURL) || versionedAsset('/images/article-placeholder.svg') }),
                          ce('div', { className: 'card-image-gradient' }),
                          ce('span', { className: 'card-title' }, article.brand),
                        ),
                        ce('div', { className: 'card-content' },
                          ce('div', { className: 'chip red lighten-4' }, article.clothing_type),
                          ce('div', { className: 'chip blue-grey lighten-4' }, article.color),
                          ce('div', { className: 'chip deep-purple lighten-4' }, article.material),
                          ce('div', { className: 'chip blue lighten-4' }, article.weather_condition),
                        ),
                        ce('button', { className: "waves-effect waves-light btn-small", key: article.id, onClick: e => this.deleteArticle(article.id) }, `Delete`),
                      ),
                    )
                  );
              })(),
            ),
        );
    }
}
