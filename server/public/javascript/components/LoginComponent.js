import { ce } from '../react-common.js';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onLoginFormSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    console.log('Login form submitted.');
    console.log(`Username: ${username}, Password: ${password}`);
  }

  render() {
    return ce('div', null,
      ce('h1', null, 'Login'),
      ce('form', { onSubmit: (e) => this.onLoginFormSubmit(e) },
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
        ce('input', { type: 'submit', value: 'Login' }),
      ),
    );
  }
}
