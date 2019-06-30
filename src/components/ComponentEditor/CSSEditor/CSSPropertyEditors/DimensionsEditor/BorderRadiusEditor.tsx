import React, { useState } from 'react'
import words from 'lodash/words'
import Flex from '../../../../Flex/Flex'
import BinaryModeIndicator from '../../../../BinaryModeIndicator'
import { ToggleProps } from '../../../../Inputs/Toggle'
import NumericDropdownCSSPropertyEditor from '../NumericDropdownCSSPropertyEditor'
import { createDirectionalDropdownProps } from '../DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import Expandable from '../../../../Expandable'
import EditorTitle from '../EditorTitle'
import { RADIUS_DIRECTION_INDICES } from '../../constants'

const BORDER_RADIUS_DIRECTIONS = {
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomRight: 'bottom-right',
  bottomLeft: 'bottom-left',
} as const

type RadiusDirection = keyof typeof BORDER_RADIUS_DIRECTIONS

export interface BorderRadiusProperties {
  borderRadius?: string
}

export interface BorderRadiusEditorProps extends Omit<ToggleProps, 'onChange'> {
  onChange: (values: BorderRadiusProperties) => void
}

const BorderRadiusEditor = ({
  initialValue = false,
  onChange,
  ...flexProps
}: BorderRadiusEditorProps) => {
  const [isEachCornerMode, setIsEachCornerMode] = useState(initialValue)
  const [_borderRadius, setBorderRadius] = useState([
    '0px',
    '0px',
    '0px',
    '0px',
  ])

  const handleChange = (
    type: RadiusDirection | 'all',
    { borderRadius }: BorderRadiusProperties
  ) => {
    let nextBorderRadius
    if (type === 'all') {
      nextBorderRadius = Array(4).fill(borderRadius)
    } else {
      const index = RADIUS_DIRECTION_INDICES[type]
      nextBorderRadius = [..._borderRadius]
      nextBorderRadius[index] = borderRadius
    }

    setBorderRadius(nextBorderRadius)
    onChange({ borderRadius: nextBorderRadius.join(' ') })
  }

  return (
    <Expandable
      overflow="visible"
      title={({ toggleIsOpen }) => (
        <EditorTitle onClick={toggleIsOpen} size="sm">
          Corner Rounding
        </EditorTitle>
      )}
      arrow={{ size: 8, position: { top: 9, right: 12 } }}
      {...flexProps}
    >
      <Flex column overflow="visible" padding="12px">
        <BinaryModeIndicator
          initialValue={initialValue}
          onChange={mode => setIsEachCornerMode(mode === 'each corner')}
          modes={['all corners', 'each corner']}
          margin="0 0 12px 0"
        />
        {isEachCornerMode ? (
          (Object.keys(BORDER_RADIUS_DIRECTIONS) as RadiusDirection[]).map(
            (direction, index, d) => (
              <NumericDropdownCSSPropertyEditor
                key={`border-radius-editor-${index}`}
                zIndex={d.length - index}
                onChange={borderRadius => handleChange(direction, { borderRadius })
                }
                displayName={words(direction)
                  .map(s => s.toLowerCase())
                  .join(' ')}
                dropdownProps={{
                  options: [
                    { label: 'pixels', value: 'px' },
                    { label: '% window height', value: 'vh' },
                    { label: '% window width', value: 'vw' },
                  ],
                }}
              />
            )
          )
        ) : (
          <NumericDropdownCSSPropertyEditor
            onChange={borderRadius => handleChange('all', { borderRadius })}
            displayName="all"
            dropdownProps={createDirectionalDropdownProps('all')}
          />
        )}
      </Flex>
    </Expandable>
  )
}

export default BorderRadiusEditor
