import React, { useState } from 'react'
import NumericDropdownCSSPropertyEditor from './NumericDropdownCSSPropertyEditor'
import {
  createDirectionalDropdownProps,
  Direction,
  DIRECTIONS,
} from './DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import { DropdownSelect, ColorPicker } from '../../../Inputs'
import EditorTitle from './EditorTitle'
import PropertyTitle from './PropertyTitle'
import KeyboardShortcut from '../../../KeyboardShortcut'
import Flex, { FlexProps } from '../../../Flex/Flex'
import Expandable from '../../../Expandable'
import BinaryModeIndicator from '../../../BinaryModeIndicator';

export interface BorderProperties {
  borderStyle?: string
  borderWidth?: string
  borderColor?: string
}

interface BorderTypeEditorProps extends Omit<FlexProps, 'children'> {
  onChange: (values: BorderProperties) => void
  type?: Direction
}

type BorderProp = 'Style' | 'Color' | 'Width'

const BorderTypeEditor = ({
  onChange,
  type,
  ...flexProps
}: BorderTypeEditorProps) => {
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

  const handleBorderWidthChange = (value: string) => handleChange('Width', value)
  const handleBorderStyleChange = (value: string) => handleChange('Style', value)
  const handleBorderColorChange = (value: string) => handleChange('Color', value)

  return (
    <Flex column overflow="visible" padding="12px" {...flexProps}>
      <NumericDropdownCSSPropertyEditor
        zIndex={2}
        displayName="width"
        dropdownProps={createDirectionalDropdownProps(type)}
        onChange={handleBorderWidthChange}
      />
      <ColorPicker
        zIndex={1}
        initialValue="#fff"
        onChange={handleBorderColorChange}
      />
      <Flex height="20px" width="100%" overflow="visible">
        <PropertyTitle>style</PropertyTitle>
        <DropdownSelect
          flex={1}
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
    </Flex>
  )
}

const DIRECTION_INDICES = {
  top: 0,
  right: 1,
  bottom: 2,
  left: 3,
} as const

export interface BorderEditorProps extends Omit<FlexProps, 'children'> {
  onChange: (values: BorderProperties) => void
}

const BorderEditor = ({ onChange, ...flexProps }: BorderEditorProps) => {
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
  const [isIndividualMode, setIsIndividualMode] = useState(false)

  const handleChange = (type: Direction, values: BorderProperties) => {
    const { borderColor, borderStyle, borderWidth } = values

    let nextBorderColor
    let nextBorderStyle
    let nextBorderWidth
    if (type === 'all') {
      nextBorderColor = [borderColor, borderColor, borderColor, borderColor]
      nextBorderStyle = [borderStyle, borderStyle, borderStyle, borderStyle]
      nextBorderWidth = [borderWidth, borderWidth, borderWidth, borderWidth]
    } else {
      const index = DIRECTION_INDICES[type]

      nextBorderColor = [..._borderColor]
      nextBorderColor[index] = borderColor

      nextBorderStyle = [..._borderStyle]
      nextBorderStyle[index] = borderStyle

      nextBorderWidth = [..._borderWidth]
      nextBorderWidth[index] = borderWidth
    }

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
    <Expandable
      {...flexProps}
      title={({ toggleIsOpen }) => (
        <EditorTitle
          shortcut={(
            <KeyboardShortcut
              shortcut={{
                key: 'B',
                callback: toggleIsOpen,
                options: { meta: true },
              }}
            />
)}
          onClick={toggleIsOpen}
        >
          Border
        </EditorTitle>
      )}
    >
      <BinaryModeIndicator
        modes={['all', 'individual']}
        onChange={mode => setIsIndividualMode(mode === 'individual')}
        initialValue={isIndividualMode}
        justify="between"
        padding={isIndividualMode ? '12px' : '12px 12px 0 12px'}
      />
      {isIndividualMode ? (
        DIRECTIONS.map((direction, index) => (
          <Expandable
            key={`border-${direction}-editor`}
            zIndex={DIRECTIONS.length - index}
            title={({ toggleIsOpen }) => (
              <EditorTitle size="sm" onClick={toggleIsOpen}>
                {direction}
              </EditorTitle>
            )}
            arrow={{ size: 8, position: { top: 9, right: 12 } }}
          >
            <BorderTypeEditor
              type={direction}
              onChange={borderProperties => handleChange(direction, borderProperties)
              }
            />
          </Expandable>
        ))
      ) : (
        <BorderTypeEditor
          type="all"
          onChange={borderProperties => handleChange('all', borderProperties)}
        />
      )}
    </Expandable>
  )
}

export default BorderEditor
