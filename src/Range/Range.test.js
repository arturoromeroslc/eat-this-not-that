import React from 'react'
import Range from './Range'
import renderer from 'react-test-renderer'

test('Range snapshot test', () =>{
	const component = renderer.create(<Range />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot()
})