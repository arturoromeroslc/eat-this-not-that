import React from 'react'
import List from './List'
import renderer from 'react-test-renderer'

test('List snapshot test', () =>{
	const component = renderer.create(<List />)
	console.log(component)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot()
})
