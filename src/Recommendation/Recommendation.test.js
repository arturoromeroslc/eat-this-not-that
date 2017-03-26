import React from 'react'
import Recommendation from './Recommendation'
import renderer from 'react-test-renderer'

test('Recommendation snapshot test', () =>{
	const component = renderer.create(<Recommendation />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot()
})