import React, { useState } from 'react'
import Flex from '../../../../Flex/Flex'
import BinaryModeIndicator from '../../../../BinaryModeIndicator'
import { ToggleProps } from '../../../../Inputs/Toggle'
import { ValueInObject } from '../../../../../../global.types'
import NumericDropdownCSSPropertyEditor from '../NumericDropdownCSSPropertyEditor'
import { createDirectionalDropdownProps } from '../DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import Expandable from '../../../../Expandable'
import { Title } from '../../../../Text'
import EditorTitle from '../EditorTitle'

const BORDER_RADIUS_DIRECTIONS = {
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomRight: 'bottom-right',
  bottomLeft: 'bottom-left',
} as const

type BorderRadiusDirection = ValueInObject<typeof BORDER_RADIUS_DIRECTIONS>

export interface BorderRadiusEditorProps
  extends Omit<ToggleProps, 'onChange'> {}

const BorderRadiusEditor = ({ initialValue = false, ...flexProps }) => {
  const [isEachCornerMode, setIsEachCornerMode] = useState(initialValue)
  return (
    <Expandable
      overflow="visible"
      title={({ toggleIsOpen }) => (
        <EditorTitle onClick={toggleIsOpen} size="sm">
          Border Radius
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
          Object.values(BORDER_RADIUS_DIRECTIONS).map((direction, index, d) => (
            <NumericDropdownCSSPropertyEditor
              zIndex={d.length - index}
              onChange={console.log}
              displayName={direction.replace('-', ' ')}
              dropdownProps={{
                options: [
                  { label: 'pixels', value: 'px' },
                  { label: '% window height', value: 'vh' },
                  { label: '% window width', value: 'vw' },
                ],
              }}
            />
          ))
        ) : (
          <NumericDropdownCSSPropertyEditor
            onChange={console.log}
            displayName="all"
            dropdownProps={createDirectionalDropdownProps('all')}
          />
        )}
      </Flex>
    </Expandable>
  )
}

export default BorderRadiusEditor
