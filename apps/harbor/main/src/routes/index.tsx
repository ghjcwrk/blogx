// apps/harbor/main/src/routes/index.tsx

import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { App } from '../components/$app'

export const routes = new Hono()
  .use('/*', serveStatic({ root: './dist' }))
  .get('/', c => {
    return c.render(<App />)
  })

export default routes

export type Routes = typeof routes
