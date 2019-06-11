import React from 'react'
import AccordionMenu from '../../../AccordionMenu'
import EditorTitle from '../EditorTitle'
import Flex from '../../../Flex'
import DropdownCSSPropertyEditor from './DropdownCSSPropertyEditor'
import { ColorPicker } from '../../../Inputs'

export interface BackgroundProperties {
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: string
}

export interface BackgroundEditorProps {
  onChange: (properties: BackgroundProperties) => void
  zIndex?: number
}

const BackgroundEditor = ({ onChange, zIndex = 0 }: BackgroundEditorProps) => (
  <AccordionMenu zIndex={zIndex} title={<EditorTitle>Background</EditorTitle>}>
    <Flex column reverse overflow="visible" padding="12px">
      <DropdownCSSPropertyEditor
        displayName="size"
        options={[
          { label: 'fill container', value: 'cover' },
          { label: 'fit to container', value: 'contain' },
        ]}
        defaultValue="none"
        onChange={backgroundSize => onChange({ backgroundSize })}
      />
      <DropdownCSSPropertyEditor
        displayName="image"
        options={[
          { label: 'none', value: 'none' },
          { label: 'upload image to app', value: 'upload' },
          { label: 'select image from app', value: 'upload' },
        ]}
        defaultValue="none"
        onChange={background => onChange({ backgroundImage: `${background}` })}
      />
      <ColorPicker
        initialValue="#fff"
        onChange={backgroundColor => onChange({ backgroundColor })}
      />
    </Flex>
  </AccordionMenu>
)

export default BackgroundEditor
