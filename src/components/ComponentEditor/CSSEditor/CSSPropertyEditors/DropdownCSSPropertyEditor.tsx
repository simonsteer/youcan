import React from 'react'
import styled from 'styled-components'
import {
  DropdownSelect,
  DropdownSelectProps,
} from '../../../Inputs/DropdownSelect'
import Flex from '../../../Flex'
import PropertyTitle from '../PropertyTitle'

interface DropdownCSSPropertyEditorProps<D extends (d: string) => string>
  extends DropdownSelectProps<D> {
  displayName: string
  onChange: (value: string) => void
}

const DropdownCSSPropertyEditor = <D extends (d: string) => string>({
  onChange,
  displayName,
  ...dropdownProps
}: DropdownCSSPropertyEditorProps<D>) => (
  <Flex overflow="visible" flex={1}>
    <PropertyTitle>{displayName}</PropertyTitle>
    <Flex flex={1} height="20px" overflow="visible">
      <DropdownSelect
        {...dropdownProps}
        onChange={nextValue => {
          onChange(nextValue)
        }}
      />
    </Flex>
  </Flex>
)

export default DropdownCSSPropertyEditor
