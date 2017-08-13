import React from 'react'
import list from './list'
import renderer from 'react-test-renderer'

test('list snapshot test', () =>{
	const component = renderer.create(<list />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot()
})
