import React from 'react'
import Expandable, { ExpandableProps } from '../../../Expandable'
import EditorTitle from '../EditorTitle'
import Flex from '../../../Flex'
import DropdownCSSPropertyEditor from './DropdownCSSPropertyEditor'
import { ColorPicker } from '../../../Inputs'
import KeyboardShortcut from '../../../KeyboardShortcut'

export interface BackgroundProperties {
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: string
}

export interface BackgroundEditorProps
  extends Pick<ExpandableProps, Exclude<keyof ExpandableProps, 'children'>> {
  onChange: (properties: BackgroundProperties) => void
  zIndex?: number
}

const BackgroundEditor = ({
  onChange,
  ...expandableProps
}: BackgroundEditorProps) => (
  <Expandable
    {...expandableProps}
    title={({ toggleIsOpen }) => (
      <EditorTitle
        shortcut={(
          <KeyboardShortcut
            shortcut={{
              key: 'G',
              callback: toggleIsOpen,
              options: { meta: true },
            }}
          />
)}
        onClick={toggleIsOpen}
      >
        Background
      </EditorTitle>
    )}
  >
    <Flex column overflow="visible" padding="12px">
      <ColorPicker
        zIndex={2}
        initialValue="#fff"
        onChange={backgroundColor => onChange({ backgroundColor })}
      />
      <DropdownCSSPropertyEditor
        zIndex={1}
        displayName="image"
        dropdownProps={{
          options: [
            { label: 'none', value: 'none' },
            { label: 'upload image to app', value: 'upload' },
            { label: 'select image from app', value: 'upload' },
          ],
          defaultValue: 'none',
          onChange: background => onChange({ backgroundImage: `${background}` }),
        }}
      />
      <DropdownCSSPropertyEditor
        displayName="size"
        dropdownProps={{
          options: [
            { label: 'fill container', value: 'cover' },
            { label: 'fit to container', value: 'contain' },
          ],
          defaultValue: 'none',
          onChange: backgroundSize => onChange({ backgroundSize }),
        }}
      />
    </Flex>
  </Expandable>
)

export default BackgroundEditor
