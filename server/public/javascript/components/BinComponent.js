import { ce, csrfToken, versionedAsset } from '../react-common.js';
import '../models/PageLikeComponentProps.js';
import Bin from '../models/Bin.js';

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
         * @property {?Bin[]} bins All the users bins. `null` means the bins are
         * not yet loaded
         * @property {?Article[]} articles The currently selected Bin's
         * articles. `null` means the articles are not yet loaded.
         * @property {string} addText The potential new Bin's name
         * @property {?Bin} currBin The currently selected Bin, or `null` if 
         * no Bin is selected
         */
        this.state = {
            bins: null,
            articles: null,
            addText: "",
            currBin: null,
        };
    }

    componentDidMount() {
        if (this.state.bins === null)
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

            // Getting Bins from server right after adding one causes a race
            // condition where the server responds before the bin has been
            // added. Adding a little delay to alleviate this.
            await new Promise((resolve) => setTimeout(resolve, 250 /** ms */));
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

    handleBinClick(bin) {
        this.setState({ currBin: bin }, () => this.getBinInfo());
    }

    render() {
        return ce('div', null, 
            ce('h1', null, "Your Bins"),
            ce('input', {
                    type: 'text',
                    value: this.state.addText,
                    onChange: (e) => this.setState({ addText: e.target.value }) }),
            ce('button', { onClick: () => this.addBin(this.state.addText) }, 'Add Bin'),
            (() => {
                if (this.state.bins === null)
                    return ce('div', { className: 'progress' },
                        ce('div', { className: 'indeterminate' }),
                    );
                else
                    return ce('div', null,
                        ce('div', null,
                            this.state.bins.map((bin) =>
                                ce('h3', { key: bin.id, onClick: () => this.handleBinClick(bin)}, bin.name),
                            ),
                        ),
                        ce('div', null,
                            this.state.bins.map((bin) =>
                            ce('button', {key: bin.name, onClick: () => this.deleteBin(bin.id) }, `Delete ${bin.name}`),
                            ),
                        ),
                    );
            })(),
            (() => {
                if (this.state.currBin !== null && this.state.articles === null)
                    return ce('div', { className: 'progress' },
                        ce('div', { className: 'indeterminate' }),
                    );
                else if (this.state.currBin !== null && this.state.articles !== null)
                    return ce('div', null,
                        ce('div', null, 'Viewing: '),
                        ce('div', null, this.state.currBin.name),
                        ce('div', null, 'Articles: '),
                        ce('ul', null, this.state.articles.map((article, index) =>
                            ce('li', { key: index }, article.clothing_type))
                        ),
                    );
            })(),
        );
    }
}
