import { ce } from '../react-common.js';
import UserFormComponent from './UserFormComponent.js';

export default class AuthenticationComponent extends React.Component {
  onLoginFormSubmit(e, username, password) {
    console.log('Login Pressed');
    console.log(e, username, password);
  }

  onRegisterFormSubmit(e, username, password) {
    console.log('Register Pressed');
    console.log(e, username, password);
  }

  render() {
    return ce('div', null,
      ce(UserFormComponent, {
        title: 'Login',
        submitLabel: 'Login',
        onSubmit: this.onLoginFormSubmit }),
      ce(UserFormComponent, {
        title: 'Register',
        submitLabel: 'Register',
        onSubmit: this.onRegisterFormSubmit }),
    );
  }
}
