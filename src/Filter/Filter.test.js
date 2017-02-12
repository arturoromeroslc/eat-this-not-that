import React from 'react'
import Filter from './Filter'
import {shallow} from 'enzyme'

let sum = (x, y) => x + y 

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3)
  expect(sum(2, 2)).toEqual(4)
})

test('isFilterItemSelected()', () => {
  const component = shallow(
    <Filter show={true}></Filter>
  )

  console.log(Filter)

})