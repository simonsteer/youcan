import React from 'react'
import { useShortcut, ShortcutParams } from '../hooks/useShortcut'

const KeyboardShortcut = ({ shortcut }: { shortcut: ShortcutParams }) => (
  <span>{useShortcut(shortcut)}</span>
)

export default KeyboardShortcut
