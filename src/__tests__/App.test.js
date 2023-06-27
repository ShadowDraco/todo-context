import React from 'react'
import App from '../App'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

//* */ mock api calls with MSw
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const mockData = {
  message: 'hi',
  status: 200,
}

const server = setupServer(
  rest.get('/hi', async (req, res, ctx) => {
    return res(ctx.json(mockData))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
//* */ end MSW setup

it('works', () => {
  expect(true).toBeTruthy()
})
