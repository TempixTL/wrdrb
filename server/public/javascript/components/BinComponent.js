import { ce, csrfToken, versionedAsset } from '../react-common.js';
import '../models/PageLikeComponentProps.js';
import Bin from '../models/Bin.js';

// export const getAllBinsRoute = document.getElementById("getAllBinsRoute").value;
// export const getBinRoute = document.getElementById("getBinRoute").value;
// export const addBinRoute = document.getElementById("addBinRoute").value;
// export const deleteBinRoute = document.getElementById("deleteBinRoute").value;
// export const addArticleToBinRoute = document.getElementById("addArticleToBinRoute").value;
// export const removeArticleFromBinRoute = document.getElementById("removeArticleFromBinRoute").value;

/**
 * A page-like component that displays all the user's bins.
 */
export default class BinComponent extends React.Component {
    constructor(props){
        super(props);
        /** @type {PageLikeComponentProps} */
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
            articles: [],
            searchText: "",
            addText: "",
            selected: null,
            currBin: null,
        };
    }

    componentDidMount() {
        this.getBins()
    }

    getBins() {
        fetch("/bins").then(res => res.json()).then(data => {
            this.setState({ bins: data })
        })
    }

    getBinInfo() {
        fetch(`/bin/${this.state.currBin.id}`).then(res => res.json()).then(data => {
            this.setState({ articles: data })
        })
    }

    async addBin(name) {
        const response = await fetch('/bin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Csrf-Token': csrfToken,
          },
          body: JSON.stringify({ name }),
        });
        if (response.ok) {
            M.toast({html: `Bin added`});
            this.setState({ addText: "" })
            this.getBins();
        } else {
          console.log(response.status);
        }
    }

    async deleteBin(binId) {
        const response = await fetch(`/bin/${binId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Csrf-Token': csrfToken,
          }
        });
        if (response.ok) {
            M.toast({html: `Bin deleted`});
            this.setState({ selected: null })
            this.getBins();
        } else {
          console.log(response.status);
        }
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

    handleBinClick(bin) {
        this.setState({ selected: bin.name });
        this.setState({ currBin: bin }, function () {
            this.getBinInfo()
        });
    }

    render() {
        return ce('div', null, 
            ce('h1', null, this.props.username + "'s Bins"),
            ce('br'),
            ce('input', {type: 'text', id: 'addText', value: this.state.addText, onChange: e => this.changeHandler(e)}),
            ce('button', { onClick: e => this.addBin(this.state.addText) }, 'Add Bin'),
            // ce('input', {type: 'text', id: 'searchText', value: this.state.searchText, onChange: e => this.changeHandler(e)}),
            // ce('button', {onClick: e => console.log(this.state.searchText)}, 'Search'),
            ce('br'),
            ce('br'),
            ce('br'),
            ce('div', null, this.state.bins.map((bin, index) =>
                ce('h3', {key: bin.id, onClick: e => this.handleBinClick(bin)}, bin.name),
            )),
            ce('div', null, this.state.bins.map((bin, index) =>
                ce('button', {key: bin.name, onClick: e => this.deleteBin(bin.id) }, `Delete ${bin.name}`),
            )),
            (() => {
                if (this.state.currBin != null && this.state.selected != null)
                    return ce('div', null,
                        ce('br'),
                        ce('div', null, 'Viewing: '),
                        ce('br'),
                        ce('div', null, this.state.bins.find((bin) => {return bin.name === this.state.selected}).name),
                        ce('br'),
                        ce('div', null, 'Articles: '),
                        ce('ul', null, this.state.articles.map((article, index) => ce('li', {key: index}, article.clothing_type))),
                    );
            })(),
        );
    }
}