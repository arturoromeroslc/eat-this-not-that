import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from './AutoComplete'

global.requestAnimationFrame = function(callback) {
  setTimeout(callback);
};

test('AutoComplete snapshot test', () => {
  // const component = shallow(<AutoComplete />)
})
