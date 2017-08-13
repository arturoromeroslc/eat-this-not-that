import React from 'react'
import List from './List'
import renderer from 'react-test-renderer'

test('List snapshot test', () =>{
	const component = renderer.create(<List />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot()
})
