import * as React from 'react';
import { ce, csrfToken, versionedAsset } from '../react-common';
import BinPreviewComponent from './home/BinPreviewComponent.js';
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
         * @property {string} addText The potential new Bin's name
         * @property {?Bin} currBin The currently selected Bin, or `null` if 
         * no Bin is selected
         */
        this.state = {
            bins: null,
            addText: "",
            currBin: null,
        };
    }

    componentDidMount() {
        M.Modal.init(document.querySelectorAll('.modal'));

        if (this.state.bins === null)
            this.getBins()
    }

    getBins() {
        fetch("/bins").then(res => res.json()).then(data => {
            const bins = data.map((binJson) => new Bin(
                binJson.id, binJson.name, binJson.username, binJson.image || null, null
            ))
            this.setState({ bins })
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
            this.setState({ currBin: null })

            // Deleting Bins from server right after adding one causes a race
            // condition where the server responds before the bin has been
            // deleted. Adding a little delay to alleviate this.
            await new Promise((resolve) => setTimeout(resolve, 250 /** ms */));
            this.getBins();
        } else {
          console.log(response.status);
        }
    }

    handleBinClick(bin) {
        this.setState({ currBin: bin });
    }

    render() {
        return ce('div', { className: 'section' }, 
            ce('div', { className: 'row' },
                ce('div', { className: 'col s12' },
                    ce('h1', null, "Your Bins"),
                ),
            ),
            ce('div', { className: 'row' },
                ce('div', { className: 'col s12'},
                    ce('button', {
                            'data-target': 'add-bin-modal',
                            className: 'btn waves-effect waves-light modal-trigger'},
                        ce('span', null, 'Create Bin'),
                        ce('i', { className: 'material-icons left' }, 'add'),
                    )
                ),
            ),
            ce('div', { id: 'add-bin-modal', className: 'modal' },
                ce('div', { className: 'modal-content' },
                    ce('h4', null, 'Create a New Bin'),
                    ce('div', { className: 'secion' },
                        ce('div', { className: 'input-field' },
                            ce('input', {
                                    name: 'bin-name',
                                    type: 'text',
                                    value: this.state.addText,
                                    onChange: (e) => this.setState({ addText: e.target.value }) }),
                            ce('label', { htmlFor: 'bin-name' }, 'Bin Name'),
                        ),
                    ),
                ),
                ce('div', { className: 'modal-footer' },
                    ce('div', {
                            onClick: () => this.addBin(this.state.addText),
                            className: 'modal-close btn waves-effect waves-dark z-depth-0' }, 'Create Bin'),
                    ce('div', { 
                            onClick: () => this.setState({ addText: '' }),
                            className: 'modal-close btn-flat waves-effect waves-dark' }, 'Cancel'),
                ),
            ),
            ce('div', { className: 'row' },
                ce('div', { className: 'col s12'},
                    (() => {
                        if (this.state.bins === null)
                            return ce('div', { className: 'progress' },
                                ce('div', { className: 'indeterminate' }),
                            );
                        else
                            return ce('ul', { className: 'collection' },
                                this.state.bins.map((bin) =>
                                    ce('a', {
                                            key: bin.id,
                                            href: '#',
                                            className: 'collection-item avatar valign-wrapper ' +
                                                // Mark bin as 'active' if it's currently selected
                                                ((this.state.currBin !== null && bin.id === this.state.currBin.id) ? 'active' : ''),
                                            style: { display: 'flex' },
                                            onClick: () => this.handleBinClick(bin) },
                                        ce('img', { src: bin.image || versionedAsset('/images/article-placeholder.svg'), className: 'circle' }),
                                        ce('span', { className: 'title' }, bin.name),
                                    ),
                                ),
                            );
                    })(),
                ),
            ),
            (() => {
                if (this.state.currBin !== null)
                    return ce('div', null,
                        ce(BinPreviewComponent, { key: this.state.currBin.id, bin: this.state.currBin }),
                        ce('div', { className: 'row' },
                            ce('div', { className: 'col s12' },
                                ce('button', {
                                        className: 'btn waves-effect waves-light red',
                                        onClick: () => this.deleteBin(this.state.currBin.id) },
                                    ce('span', null, 'Delete Bin'),
                                    ce('i', { className: 'material-icons left' }, 'remove'),
                                ),
                            ),
                        ),
                    );
            })(),
        );
    }
}
