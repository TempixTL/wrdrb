import * as React from 'react';
import { ce, versionedAsset } from '../../react-common.js';
import UserFormComponent from './UserFormComponent.js';
import '../../models/UserFormComponentSubmitCallback.js';

/**
 * @typedef AuthenticationComponentProps
 * @type {object}
 * @property {UserFormComponentSubmitCallback} onLoginFormSubmit
 * @property {UserFormComponentSubmitCallback} onRegisterFormSubmit
 */

/**
 * A page-like component that handles authenticating users. This includes login
 * as well as registration.
 */
export default class AuthenticationComponent extends React.Component {
  constructor(props) {
    super(props);
    /** @type {AuthenticationComponentProps} */
    this.props;
  }

  componentDidMount() {
    M.Tabs.init(document.querySelectorAll('.tabs'));
  }

  render() {
    return ce('div', null,
      ce('div', { className: 'row section'},
        ce('div', { className: 'col s12' },
          ce('div', { className: 'valign-wrapper' },
            ce('img', { src: versionedAsset('images/logo.svg') }),
            ce('span', { className: 'grey-text' }, 'Organizing your wardrobe.'),
          ),
        ),
      ),
      ce('div', { className: 'row section' },
        ce('div', { className: 'col s12 m6 offset-m3 center-align' },
          ce('img', { src: versionedAsset('images/fashion-tshirts-colour.svg'), className: 'responsive-img' }),
        ),
      ),
      ce('div', { className: 'row' },
        ce('div', { className: 'col s12 m8 offset-m2'},
          ce('div', { className: 'card hoverable' },
            ce('div', { className: 'card-tabs' },
              ce('ul', { className: 'tabs tabs-fixed-width' },
                ce('li', { className: 'tab' }, ce('a', { href: '#register-form', className: 'active' }, 'Register')),
                ce('li', { className: 'tab' }, ce('a', { href: '#login-form' }, 'Login')),
              ),
            ),
            ce('div', { className: 'card-content' },
              ce('div', { id: 'register-form' },
                ce(UserFormComponent, {
                  title: 'Register',
                  submitLabel: 'Register',
                  onSubmit: this.props.onRegisterFormSubmit }),
              ),
              ce('div', { id: 'login-form' },
                ce(UserFormComponent, {
                  title: 'Login',
                  submitLabel: 'Login',
                  onSubmit: this.props.onLoginFormSubmit }),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
