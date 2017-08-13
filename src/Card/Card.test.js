import React from 'react'
import Card from './Card'
import renderer from 'react-test-renderer'

test('Card snapshot test', () =>{
	const component = renderer.create(<Card />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot()
})
