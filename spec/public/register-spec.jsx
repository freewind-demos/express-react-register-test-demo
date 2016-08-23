"use strict";
import superagent from 'superagent';
import nock from 'nock';
import RegisterForm from '../../public/register-form.jsx';
import {shallow, mount} from 'enzyme';
import React from 'react';
import jsdomGlobal from 'jsdom-global';
jsdomGlobal();

function _inputAndSubmitForm(wrapper) {
  wrapper.find('#username').simulate('change', {target: {value: 'freewind'}});
  wrapper.find('#password').simulate('change', {target: {value: '123456'}});
  wrapper.find('#form').simulate('submit');
}

describe('RegisterForm', () => {

  beforeEach(() => {
    nock.cleanAll();
  });

  describe('send register request', () => {
    it('successfully', (done) => {
      nock(/.*/)
        .post('/api/users', {
          username: 'freewind',
          password: '123456'
        })
        .reply(201, "ok");

      spyOn(window, 'alert');
      const wrapper = mount(<RegisterForm />);
      _inputAndSubmitForm(wrapper);

      setTimeout(() => {
        expect(window.alert).toHaveBeenCalledWith('注册成功：ok');
        done();
      }, 100);
    });

    fit('failed', (done) => {
      nock(/.*/)
        .post('/api/users', {
          username: 'freewind',
          password: '123456'
        })
        .reply(409, "already exists");

      spyOn(window, 'alert');
      const wrapper = mount(<RegisterForm />);
      _inputAndSubmitForm(wrapper);

      setTimeout(() => {
        expect(window.alert).toHaveBeenCalledWith('注册失败：already exists');
        done();
      }, 100);
    })
  });

});