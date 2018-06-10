import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme';
import App from './App'

describe('Login', () => {
  const wrapper = mount(<App show />)
  const loginButton = wrapper.find('[data-testid="login"]')
  const registerButton = wrapper.find('[data-testid="register"]')

  describe('Default Unauthenticated', () => {
    it('render a login button and register button', () => {
      expect(loginButton.text()).toEqual('Login');
      expect(registerButton.text()).toEqual('Register');
    })

    it('render a logout button after authenticating', () => {
      loginButton.simulate('click');

      expect(wrapper.find('[data-testid="logout"]').text()).toEqual('Logout');
    })
  })

  describe('Authenticated', () => {
    loginButton.simulate('click');
    const logoutButton = wrapper.find('[data-testid="logout"]')

    it('render login button when logging out ', () => {
      logoutButton.simulate('click')

      expect(wrapper.find('[data-testid="login"]').text()).toEqual('Login');
    })
  })
});
