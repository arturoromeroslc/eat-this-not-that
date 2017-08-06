import React from 'react'
import AutoComplete from './AutoComplete'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

global.requestAnimationFrame = function(callback) {
  setTimeout(callback);
};

test('AutoComplete snapshot test', () =>{
	const component = shallow(<AutoComplete />)
	const tree = shallowToJson(component);
	expect(tree).toMatchSnapshot()
})