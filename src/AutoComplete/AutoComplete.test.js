import { describe } from 'pm2'

global.requestAnimationFrame = function(callback) {
  setTimeout(callback)
}

describe('AutoComplete snapshot test', () => {
  expect(1 + 1).toBe(2)
})
