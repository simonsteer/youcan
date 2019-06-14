import React, { useState } from 'react'
import Expandable, { ExpandableProps } from '../../../../Expandable'
import EditorTitle from '../EditorTitle'
import Flex from '../../../../Flex'
import DropdownCSSPropertyEditor from '../DropdownCSSPropertyEditor'
import { ColorPicker } from '../../../../Inputs'
import KeyboardShortcut from '../../../../KeyboardShortcut'
import { BACKGROUND_PROPERTY_EDITORS } from './constants'

export interface BackgroundProperties {
  background?: string
}

export interface BackgroundEditorProps
  extends Omit<ExpandableProps, 'children'> {
  onChange: (properties: BackgroundProperties) => void
  zIndex?: number
}

const BackgroundEditor = ({
  onChange,
  ...expandableProps
}: BackgroundEditorProps) => {
  const [background, setBackground] = useState({
    color: 'transparent',
    image: 'none',
    position: 'left top',
    size: 'auto',
    repeat: 'no-repeat',
    attachment: 'scroll',
  })

  const handleChange = (property: { [key: string]: string }) => {
    const nextBackground = { ...background, ...property }
    setBackground(nextBackground)

    const { color, image, position, size, repeat, attachment } = nextBackground
    const backgroundString = `${image} ${position}/${size} ${repeat} ${attachment} ${color}`
    onChange({ background: backgroundString })
  }

  return (
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
          zIndex={BACKGROUND_PROPERTY_EDITORS.length + 1}
          initialValue="#fff"
          onChange={color => handleChange({ color })}
        />
        {BACKGROUND_PROPERTY_EDITORS.map(
          ({ dropdownProps, ...editor }, index) => (
            <DropdownCSSPropertyEditor
              key={`background-editor-${index}`}
              zIndex={BACKGROUND_PROPERTY_EDITORS.length - index}
              {...editor}
              dropdownProps={{
                ...dropdownProps,
                onChange: value => handleChange({ [editor.displayName]: value }),
              }}
            />
          )
        )}
      </Flex>
    </Expandable>
  )
}

export default BackgroundEditor
