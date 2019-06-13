import React from 'react'
import {
  DropdownSelect,
  DropdownSelectProps,
} from '../../../Inputs/DropdownSelect'
import PropertyTitle from './PropertyTitle'
import Flex, { FlexProps } from '../../../Flex/Flex'

interface DropdownCSSPropertyEditorProps<D extends (d: string) => string>
  extends FlexProps {
  displayName: string
  dropdownProps: DropdownSelectProps<D>
}

const DropdownCSSPropertyEditor = <D extends (d: string) => string>({
  displayName,
  dropdownProps,
  ...flexProps
}: DropdownCSSPropertyEditorProps<D>) => (
  <Flex overflow="visible" flex={1} {...flexProps}>
    <PropertyTitle>{displayName}</PropertyTitle>
    <Flex flex={1} height="20px" overflow="visible">
      <DropdownSelect {...dropdownProps} />
    </Flex>
  </Flex>
)

export default DropdownCSSPropertyEditor
