import React, { useState } from 'react'
import styled from 'styled-components'
import NumericCSSPropertyEditor from './NumericDropdownCSSPropertyEditor'
import {
  createDirectionalDropdownProps,
  Direction,
  DIRECTIONS,
} from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import { DropdownSelect, ColorPicker, Toggle } from '../../../Inputs'
import Flex from '../../../Flex'
import AccordionMenu from '../../../AccordionMenu'
import EditorTitle from '../EditorTitle'
import PropertyTitle from '../PropertyTitle'
import KeyboardShortcut from '../../../KeyboardShortcut'

export interface BorderProperties {
  borderStyle?: string
  borderWidth?: string
  borderColor?: string
}

interface BorderTypeEditorProps {
  onChange: (values: BorderProperties) => void
  type?: Direction
}

type BorderProp = 'Style' | 'Color' | 'Width'

const BorderTypeEditor = ({ onChange, type }: BorderTypeEditorProps) => {
  const [borderProperties, setBorderProperties] = useState({
    borderStyle: 'none',
    borderColor: 'transparent',
    borderWidth: '0px',
  })

  const handleChange = (prop: BorderProp, value: string) => {
    const nextBorderProperties = {
      ...borderProperties,
      [`border${prop}`]: value,
    }
    setBorderProperties(nextBorderProperties)
    onChange(nextBorderProperties)
  }

  const handleBorderWidthChange = (value: string) =>
    handleChange('Width', value)
  const handleBorderStyleChange = (value: string) =>
    handleChange('Style', value)
  const handleBorderColorChange = (value: string) =>
    handleChange('Color', value)

  return (
    <Flex column reverse overflow="visible" padding="12px">
      <Flex height="20px" overflow="visible">
        <PropertyTitle>style</PropertyTitle>
        <DropdownSelect
          options={[
            { value: 'none', label: 'none' },
            { value: 'solid', label: 'solid' },
            { value: 'dotted', label: 'dotted' },
            { value: 'dashed', label: 'dashed' },
            { value: 'double', label: 'double' },
            { value: 'groove', label: 'groove' },
            { value: 'ridge', label: 'ridge' },
            { value: 'inset', label: 'inset' },
            { value: 'outset', label: 'outset' },
          ]}
          defaultValue="none"
          onChange={handleBorderStyleChange}
        />
      </Flex>
      <ColorPicker initialValue="#fff" onChange={handleBorderColorChange} />
      <NumericCSSPropertyEditor
        displayName="width"
        dropdownProps={createDirectionalDropdownProps(type)}
        onChange={handleBorderWidthChange}
      />
    </Flex>
  )
}

const DIRECTION_INDICES = {
  top: 0,
  right: 1,
  bottom: 2,
  left: 3,
} as const

export interface BorderEditorProps {
  onChange: (values: BorderProperties) => void
  zIndex?: number
}

const BorderEditor = ({ onChange, zIndex = 0 }: BorderEditorProps) => {
  const [_borderStyle, setBorderStyle] = useState([
    'none',
    'none',
    'none',
    'none',
  ])
  const [_borderColor, setBorderColor] = useState([
    'transparent',
    'transparent',
    'transparent',
    'transparent',
  ])
  const [_borderWidth, setBorderWidth] = useState(['0px', '0px', '0px', '0px'])

  const handleChange = (type: Direction, values: BorderProperties) => {
    const index = DIRECTION_INDICES[type]
    const { borderColor, borderStyle, borderWidth } = values

    const nextBorderColor = [..._borderColor]
    nextBorderColor[index] = borderColor

    const nextBorderStyle = [..._borderStyle]
    nextBorderStyle[index] = borderStyle

    const nextBorderWidth = [..._borderWidth]
    nextBorderWidth[index] = borderWidth

    setBorderColor(nextBorderColor)
    setBorderStyle(nextBorderStyle)
    setBorderWidth(nextBorderWidth)

    const nextValues = {
      borderColor: nextBorderColor.join(' '),
      borderStyle: nextBorderStyle.join(' '),
      borderWidth: nextBorderWidth.join(' '),
    }
    onChange(nextValues)
  }

  return (
    <AccordionMenu
      zIndex={zIndex}
      title={({ toggleIsOpen, setIsOpen, isOpen }) => (
        <EditorTitle
          shortcut={
            <KeyboardShortcut
              shortcut={{
                key: 'B',
                callback: toggleIsOpen,
                options: { meta: true },
              }}
            />
          }
          onClick={toggleIsOpen}
          tabIndex={0}
          onFocus={() => {
            if (isOpen) return
            setIsOpen(true)
          }}
        >
          Border
        </EditorTitle>
      )}
    >
      <AccordionMenu
        startOpen
        title={({ toggleIsOpen }) => <Toggle onChange={toggleIsOpen} />}
      >
        <BorderTypeEditor
          type="top"
          onChange={borderProperties => handleChange('top', borderProperties)}
        />
      </AccordionMenu>
      {DIRECTIONS.map((direction, index) => (
        <AccordionMenu
          key={`border-${direction}-editor`}
          zIndex={DIRECTIONS.length - index}
          title={({ toggleIsOpen, setIsOpen, isOpen }) => (
            <EditorTitle
              size="sm"
              onClick={toggleIsOpen}
              tabIndex={0}
              onFocus={() => {
                if (isOpen) return
                setIsOpen(true)
              }}
            >
              {direction}
            </EditorTitle>
          )}
          arrow={{ size: 8, position: { top: 9, right: 12 } }}
        >
          <BorderTypeEditor
            type={direction}
            onChange={borderProperties =>
              handleChange(direction, borderProperties)
            }
          />
        </AccordionMenu>
      ))}
    </AccordionMenu>
  )
}

export default BorderEditor
