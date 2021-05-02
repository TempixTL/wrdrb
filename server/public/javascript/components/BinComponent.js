import { ce, csrfToken, versionedAsset } from '../react-common.js';

/**
 * Wrdrb Bin View
 * 
 * # Bins
 *   POST       /bins                         controllers.Application.bins
 */
export default class BinComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { username: "Default", 
        bins: [{name: "Your Favorites", articles: ["Default Shirt"]},
               {name: "Work", articles: ["White Shirt", " Black Pants", "Black Shoes"]}, 
               {name: "Weekend", articles: ["Blue Hat", "White Shirt", "Black Tie", "Blue Pants"]}, 
               {name: "Home", articles: ["Gray Shirt", "Black Pants"]}], 
        searchText: "", selected: "Your Favorites" }
    }

    // componentDidMount() {
    //     this.loadBins(this.props.username);
    // }

    loadBins(username){
        fetch(binRoute, {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
            body: JSON.stringify({ username })
        }).then(res => res.json()).then(data => {
            this.setState({ bins: data })
            this.loadBins(this.props.username)
        })
    }
    
    changeHandler(e) {
        this.setState({[e.target['id']]: e.target.value});
    }

    render() {
        return ce('div', null, 
        ce('h1', null, 'Bins'),
        ce('button', { onClick: e => this.setState({ selected: "Your Favorites" })}, 'Logout'),
        // ce('p', null, `The CSRF Token is ${csrfToken}`),
        ce('img', { src: versionedAsset('images/favicon.png') }),
        ce('input', {type: 'text', id: 'searchText', value: this.state.searchText, onChange: e => this.changeHandler(e)}),
        ce('button', {onClick: e => console.log(this.state.searchText)}, 'Search'),
        ce('br'),
        ce('br'),
        ce('div', null, this.state.username + "'s Bins"),
        ce('br'),
        ce('div', null, this.state.bins.map((bin, index) => ce('div', {key: index, onClick: e => this.setState({ selected: bin.name })}, bin.name))),
        ce('br'),
        ce('div', null, 'Viewing: '),
        ce('br'),
        ce('div', null, this.state.bins.find((bin) => {return bin.name == this.state.selected}).name),
        ce('ul', null, this.state.bins.find((bin) => {return bin.name == this.state.selected}).articles.map((article, index) => ce('li', {key: index}, article))),
        );
    }
}