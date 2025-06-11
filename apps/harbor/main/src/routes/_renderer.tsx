// apps/harbor/main/src/routes/_renderer.tsx

import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'
import { template } from 'radashi'
import { s } from 'tss'

export default jsxRenderer(({ children }) => {
  return (
    <Html>
      <Html.Head lang='ja'>
        <Html.Head.Meta charset='utf-8' />
        <Html.Head.Meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <Html.Head.Style />
        <Html.Head.Script />
      </Html.Head>
      <Html.Body>{children}</Html.Body>
    </Html>
  )
})

const Html = Object.assign(
  ({ children }: PropsOf<'html'>) => <html class={s.parse(styled.html.root)}>{children}</html>,
  {
    Body: ({ children }: PropsOf<'body'>) => <body class={s.parse(styled.body.root)}>{children}</body>,
    Head: Object.assign(
      ({ children }: PropsOf<'head'>) => <head>{children}</head>,
      {
        Meta: (props: PropsOf<'meta'>) => <meta {...props} />,
        Script: () => {
          return (
            <>
              {import.meta.env.DEV
                ? (
                  <>
                    <Script src='/src/client.ts' />
                    {/* bugfix patches/@hono%2Fvite-dev-server@0.19.0.patch */}
                    <script src='/@vite/client' type='module' />
                  </>
                )
                : (
                  <script src={template('/{{client}}', { client: cache.client() })} type='module' />
                )}
            </>
          )
        },
        Style: () => <Style />
      }
    )
  }
)

const styled = s.define({
  body: s.object({
    root: s.style({ m: '0', w: '100%' })
  }),
  html: s.object({
    root: s.style({
      ff: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      w: '100%'
    })
  })
})

namespace cache {
  export function client() {
    if (import.meta.env.DEV) return '/src/client.ts'
    const manifest = Object.values(
      import.meta.glob('/dist/.vite/manifest.json', { eager: true, import: 'default' })
    )[0] as Record<string, { file: string }> | undefined
    return manifest?.['src/client.ts']?.file ?? 'client.js'
  }
}
