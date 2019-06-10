import React, { useState } from 'react'
import styled from 'styled-components'
import NumericCSSPropertyEditor from '../NumericCSSPropertyEditor'
import {
  createDirectionalDropdownProps,
  Direction,
  DIRECTIONS,
} from '../DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import { DropdownSelect, ColorPicker } from '../../../Inputs'
import Flex from '../../../Flex'
import { COLORS } from '../../../constants'
import AccordionMenu from '../../../AccordionMenu'
import EditorTitle from '../../EditorTitle'

interface BorderProperties {
  borderStyle: string
  borderWidth: string
  borderColor: string
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
    <Flex column reverse overflow="visible">
      <Flex height="20px" overflow="visible">
        <Title>type</Title>
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
      <Flex overflow="visible">
        <Title>color</Title>
        <ColorPicker initialValue="#fff" onChange={handleBorderColorChange} />
      </Flex>
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
}

const BorderEditor = ({ onChange }: BorderEditorProps) => {
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
    <AccordionMenu title={<EditorTitle title="border" size="lg" />}>
      {DIRECTIONS.map((direction, index) => (
        <AccordionMenu zIndex={DIRECTIONS.length - index} title={<EditorTitle title={direction} size="md" />}>
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

const Title = styled.p`
  font-size: 12px;
  color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 5px;
  width: 100px;
`
