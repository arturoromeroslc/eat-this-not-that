const sum = (x, y) => x + y

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3)
  expect(sum(2, 2)).toEqual(4)
})
