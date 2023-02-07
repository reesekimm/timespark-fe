import { base } from 'grommet-icons'

type Global = { global: { colors: { [key: string]: string } } }
type Icon = { icon: { size: { [key: string]: string } } }
type Source = Global | Icon | (Global & Icon)
type Merged = Global & Icon

export function isObject(item: unknown) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function deepMerge(target: typeof base, ...sources: Source[]): Merged {
  if (!sources.length) {
    return target
  }

  // making sure to not change target (immutable)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output = { ...target } as any

  sources.forEach((source) => {
    if (isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key as keyof Source])) {
          if (!output[key]) {
            output[key] = source[key as keyof Source]
          } else {
            output[key] = deepMerge(output[key], source[key as keyof Source])
          }
        } else {
          output[key] = source[key as keyof Source]
        }
      })
    }
  })

  return output
}
