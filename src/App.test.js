import { render, waitForElement } from 'react-testing-library'
import React from 'react'
import App from './App'
import { debug } from 'util'

test('waiting for an element', async () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('app-title'))
    .text()
    .toEqual('sdf')
})
