import { ce } from '../../react-common.js';
import '../../models/UserFormComponentSubmitCallback.js';

/**
 * @typedef UserFormComponentProps
 * @type {object}
 * @property {string} submitLabel The label text of the submit button.
 * @property {UserFormComponentSubmitCallback} onSubmit The callback when the
 * form is submitted.
 */

/**
 * Renders a single UserForm.
 * For example, a login form or a registration form.
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
    const usernameId = this.props.title + '[username]';
    const passwordId = this.props.title + '[password]';
    return ce('div', null,
      ce('form', { onSubmit: (e) => this.onSubmit(e) },
        ce('div', { className: 'input-field' },
          ce('i', { className: 'material-icons prefix' }, 'account_circle'),
          ce('input', {
            id: usernameId,
            value: this.state.username,
            onChange: (e) => this.setState({ username: e.target.value }),
            type: 'text',
          }),
          ce('label', { htmlFor: usernameId }, 'Username'),
        ),
        ce('div', { className: 'input-field' },
          ce('i', { className: 'material-icons prefix' }, 'password'),
          ce('input', {
            id: passwordId,
            value: this.state.password,
            onChange: (e) => this.setState({ password: e.target.value }),
            type: 'password',
          }),
          ce('label', { htmlFor: passwordId }, 'Password'),
        ),
        ce('button', { type: 'submit', className: 'btn waves-effect waves-light' },
          ce('i', { className: 'material-icons right' }, 'login'),
          this.props.submitLabel,
        ),
      ),
    );
  }
}
