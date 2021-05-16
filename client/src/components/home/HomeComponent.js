import * as React from 'react';
import Bin from '../../models/Bin.js';
import { ce } from '../../react-common.js';
import BinPreviewComponent from './BinPreviewComponent.js';
import '../../models/PageLikeComponentProps.js';
import Page from '../../models/Page.js';

/**
 * A page-like component which represents the home page of the application.
 */
export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    /** @type {PageLikeComponentProps} */
    this.props;

    /**
     * @type {object}
     * @property {?Bin[]} bins
     */
    this.state = {
      bins: null,
    };
  }

  componentDidMount() {
    if (this.state.bins === null)
      this.loadBins();
  }

  async loadBins() {
    const response = await fetch('/bins');

    if (response.ok) {
      const binsJson = await response.json();
      const bins = binsJson.map((binJson) => new Bin(
        binJson.id, binJson.name, this.props.username
      ));

      this.setState({ bins });
    } else {
      M.toast({html: 'Failed to load bins.'});
      console.log('Failed to load bins.', response.status);
    }
  }

  render() {
    return ce('div', null,
      ce('div', { className: 'row hero' },
        ce('div', { className: 'col s12 m6' },
          ce('h3', { className: 'white-text' }, `Welcome, ${this.props.username}`),
        ),
        ce('div', { className: 'col s12 m6 center-align' },
          ce('button', {
              onClick: () => this.props.navigate(Page.OutfitLog),
              className: 'waves-effect waves-dark btn-large white',
              style: { marginLeft: '10px' } },
            ce('i', { className: 'large material-icons left black-text' }, 'edit'),
            ce('span', { className: 'black-text'}, 'Log'),
          ),
          ce('button', {
              onClick: () => this.props.navigate(Page.Wardrobe),
              className: 'waves-effect waves-light btn-large',
              style: { margin: '10px 0 10px 10px'} },
            ce('i', { className: 'large material-icons left' }, 'search'),
            ce('span', null, 'Search'),
          ),
        ),
      ),
      (() => {
        if (this.state.bins === null)
          return ce('div', { className: 'progress' },
            ce('div', { className: 'indeterminate' }),
          );
        else if (this.state.bins.length > 0)
          return this.state.bins.map((bin, index) => ce(BinPreviewComponent, { key: index, bin }));
        else
          return ce('div', { className: 'section' },
            ce('div', { className: 'row' },
              ce('div', { className: 'col s12' },
                ce('p', null, 'No bins to show 😔'),
              ),
            ),
          );
      })(),
    );
  }
}
