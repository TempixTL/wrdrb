import { ce } from '../../react-common.js';
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

  render() {
    return ce('div', null,
      ce(UserFormComponent, {
        title: 'Login',
        submitLabel: 'Login',
        onSubmit: this.props.onLoginFormSubmit }),
      ce(UserFormComponent, {
        title: 'Register',
        submitLabel: 'Register',
        onSubmit: this.props.onRegisterFormSubmit }),
    );
  }
}
