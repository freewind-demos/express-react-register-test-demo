import React, {Component} from 'react';
import request from 'superagent';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return <form id="form" onSubmit={this._onSubmit.bind(this)}>
      <div>
        <h1>Register</h1>
      </div>
      <div>
        <input id="username" type="text" placeholder="username" onChange={event => {
          this.setState({username: event.target.value})
        }}/>
      </div>
      <div>
        <input id="password" type="password" placeholder="password" onChange={event => {
          this.setState({password: event.target.value})
        }}/>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  }

  _onSubmit(event) {
    event.preventDefault();

    request
      .post('/api/users')
      .send({
        username: this.state.username,
        password: this.state.password
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
          if (res.statusCode === 400) {
            return window.alert('提交数据格式有误：' + res.text);
          }
          if (res.statusCode === 409) {
            return window.alert('注册失败：' + res.text);
          }
          return window.alert('未知错误：' + res.statusCode);
        }
        window.alert('注册成功：' + res.text);
      })
  }

}