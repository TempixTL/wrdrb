import { ce, csrfToken, versionedAsset } from '../react-common.js';

/**
 * @typedef {object} BinComponentProps
 * @property {string} username
 */

/**
 * A page-like component that displays all the user's bins.
 */
export default class BinComponent extends React.Component {
    constructor(props){
        super(props);
        /** @type {BinComponentProps} */
        this.props;

        /**
         * @typedef BinComponentState
         * @type {object}
         * @property {Bin[]} bins
         * @property {string} searchText The current Bin search text.
         * @property {?string} selected The currently selected Bin.
         */
        this.state = {
            bins: [],
            searchText: "",
            selected: null,
        };
    }

    componentDidMount() {
        this.loadBins(this.props.username);
    }

    loadBins(username){
        this.setState({
            bins: [
                { name: "Your Favorites", articles: ["Default Shirt"] },
                { name: "Work", articles: ["White Shirt", " Black Pants", "Black Shoes"] }, 
                { name: "Weekend", articles: ["Blue Hat", "White Shirt", "Black Tie", "Blue Pants"] },
                { name: "Home", articles: ["Gray Shirt", "Black Pants"] }
            ]
        });
    }
    
    changeHandler(e) {
        this.setState({[e.target['id']]: e.target.value});
    }

    render() {
        return ce('div', null, 
        ce('h1', null, 'Bins'),
        ce('button', { onClick: e => this.setState({ selected: "Your Favorites" })}, 'Logout'),
        ce('img', { src: versionedAsset('images/favicon.png') }),
        ce('input', {type: 'text', id: 'searchText', value: this.state.searchText, onChange: e => this.changeHandler(e)}),
        ce('button', {onClick: e => console.log(this.state.searchText)}, 'Search'),
        ce('br'),
        ce('br'),
        ce('div', null, this.props.username + "'s Bins"),
        ce('br'),
        ce('div', null, this.state.bins.map((bin, index) => ce('div', {key: index, onClick: e => this.setState({ selected: bin.name })}, bin.name))),
        (() => {
            if (this.state.selected != null)
                return ce('div', null,
                    ce('br'),
                    ce('div', null, 'Viewing: '),
                    ce('br'),
                    ce('div', null, this.state.bins.find((bin) => {return bin.name == this.state.selected}).name),
                    ce('ul', null, this.state.bins.find((bin) => {return bin.name == this.state.selected}).articles.map((article, index) => ce('li', {key: index}, article))),
                );
        })(),
        );
    }
}