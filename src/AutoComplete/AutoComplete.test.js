import React, { Component } from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AutoComplete from './AutoComplete'

global.requestAnimationFrame = function(callback) {
  setTimeout(callback);
};

test('AutoComplete snapshot test', () => {
  const component = shallow(<AutoComplete />)
})
