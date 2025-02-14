import {RelativeTimeElement} from './relative-time-element.js'

const root = (typeof globalThis !== 'undefined' ? globalThis : window) as typeof window
try {
  root.RelativeTimeElement = RelativeTimeElement.define()
} catch (e: unknown) {
  if (
    !(root.DOMException && e instanceof DOMException && e.name === 'NotSupportedError') &&
    !(e instanceof ReferenceError)
  ) {
    throw e
  }
}

type JSXBase = JSX.IntrinsicElements extends {span: unknown}
  ? JSX.IntrinsicElements
  : Record<string, Record<string, unknown>>
declare global {
  interface Window {
    RelativeTimeElement: typeof RelativeTimeElement
  }
  interface HTMLElementTagNameMap {
    'relative-time': RelativeTimeElement
  }
}

// @ts-expect-error This is needed for consumers using React 19 and above but TypeScript complains because `react` isn't a dependency of the project.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ['relative-time']: JSXBase['span'] & Partial<Omit<RelativeTimeElement, keyof HTMLElement>>
    }
  }
}

export default RelativeTimeElement
export * from './relative-time-element.js'
