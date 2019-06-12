import { useEffect } from 'react'

interface ShortcutOptions {
  shift?: boolean
  alt?: boolean
  ctrl?: boolean
  meta?: boolean
}

export interface ShortcutParams {
  key: string
  callback: () => void
  options?: ShortcutOptions
}
type UseShortcut = (params: ShortcutParams) => string
export const useShortcut: UseShortcut = ({ key, callback, options = {} }) => {
  const { shift, alt, ctrl, meta } = options
  const handler = (e: KeyboardEvent) => {
    const keyMatches = String.fromCharCode(e.keyCode) === key
    if (
      !keyMatches ||
      (shift && !e.shiftKey) ||
      (alt && !e.altKey) ||
      (ctrl && !e.ctrlKey) ||
      (meta && !e.metaKey)
    ) {
      return
    }

    e.preventDefault()
    callback()
    e.stopPropagation()
  }

  useEffect(() => {
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handler])

  return getShortcutString(key, options)
}

const getShortcutString = (key: string, options: ShortcutOptions) => {
  const { ctrl, meta, shift, alt } = options
  const orderedShortcut = [shift, meta, ctrl, alt, key]
  return orderedShortcut
    .map((option, index) => {
      if (index === 0) {
        return option && '⇧'
      } else if (index === 1) {
        return option && '⌘'
      } else if (index === 2) {
        return option && '^'
      } else if (index === 3) {
        return option && 'alt'
      } else {
        return key
      }
    })
    .filter(Boolean)
    .join(' + ')
}
