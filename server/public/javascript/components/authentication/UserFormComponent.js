import { ce } from '../../react-common.js';
import '../../models/UserFormComponentSubmitCallback.js';

/**
 * @typedef UserFormComponentProps
 * @type {object}
 * @property {string} title The title to render for the form.
 * @property {string} submitLabel The label text of the submit button.
 * @property {UserFormComponentSubmitCallback} onSubmit The callback when the
 * form is submitted.
 */

/**
 * Renders a single UserForm.
 * For example, a login form or a registration form.
 * 
 * @param {UserFormComponentProps} props
 */
export default class UserFormComponent extends React.Component {
  constructor(props) {
    super(props);
    /** @type {UserFormComponentProps} */
    this.props;

    /**
     * @typedef UserFormComponentState
     * @type {object}
     * @property {string} username
     * @property {string} password
     */
    this.state = {
      username: '',
      password: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e, this.state.username, this.state.password);
  }

  render() {
    return ce('div', null,
      ce('h1', null, this.props.title),
      ce('form', { onSubmit: (e) => this.onSubmit(e) },
        ce('label', { htmlFor: 'username' }, 'Username'),
        ce('div', null,
          ce('input', {
            name: 'username',
            value: this.state.username,
            onChange: (e) => this.setState({ username: e.target.value }),
            type: 'text',
            placeholder: 'Username',
          }),
          ce('span', null,
            ce('i', null),
          ),
        ),
        ce('label', { htmlFor: 'password' }, 'Password'),
        ce('div', null,
          ce('input', {
            name: 'password',
            value: this.state.password,
            onChange: (e) => this.setState({ password: e.target.value }),
            type: 'password',
            placeholder: 'Password',
            className: 'input'
          }),
          ce('span', null,
            ce('i', null),
          ),
        ),
        ce('input', { type: 'submit', value: this.props.submitLabel }),
      ),
    );
  }
}
