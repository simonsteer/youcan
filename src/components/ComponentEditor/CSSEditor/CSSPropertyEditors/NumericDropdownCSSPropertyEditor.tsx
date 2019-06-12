import React, { useState } from 'react'
import get from 'lodash/get'
import { NumericInput, NumericInputProps } from '../../../Inputs/NumericInput'
import {
  DropdownSelect,
  DropdownSelectProps,
} from '../../../Inputs/DropdownSelect'
import Flex from '../../../Flex'
import PropertyTitle from '../PropertyTitle'
import { FlexProps } from '../../../Flex/Flex'

interface NumericDropdownCSSPropertyEditorProps<
  N extends (n: number) => any,
  D extends (d: any) => any
> extends FlexProps {
  numericProps?: Pick<
    NumericInputProps<N>,
    Exclude<keyof NumericInputProps<N>, 'onChange'>
  >
  dropdownProps: Pick<
    DropdownSelectProps<D>,
    Exclude<keyof DropdownSelectProps<D>, 'onChange'>
  >
  displayName: string
  transformValue?: (numericValue: any, dropdownValue: any) => string
  onChange: (value: string) => void
}

const NumericDropdownCSSPropertyEditor = <
  N extends (n: number) => string,
  D extends (d: string) => string
>({
  numericProps,
  dropdownProps,
  transformValue = (n, d) => `${n}${d}`,
  onChange,
  displayName,
  ...flexProps
}: NumericDropdownCSSPropertyEditorProps<N, D>) => {
  const [numericValue, setNumericValue] = useState(
    get(numericProps, 'start') || 0
  )
  const [dropdownValue, setDropdownValue] = useState(
    get(dropdownProps, 'defaultValue') || get(dropdownProps, `options[0].value`)
  )

  const handleChange = (nextValue: any, type: 'numeric' | 'dropdown') => {
    let value = transformValue(numericValue, dropdownValue)
    if (type === 'numeric') {
      setNumericValue(nextValue)
      value = transformValue(nextValue, dropdownValue)
    } else {
      setDropdownValue(nextValue)
      value = transformValue(numericValue, nextValue)
    }
    onChange(value)
  }

  return (
    <Flex {...flexProps} overflow="visible" flex={1}>
      <PropertyTitle>{displayName}</PropertyTitle>
      <NumericInput
        {...numericProps}
        onChange={n => handleChange(n, 'numeric')}
      />
      <Flex flex={3} height="20px" overflow="visible">
        <DropdownSelect
          {...dropdownProps}
          onChange={d => handleChange(d, 'dropdown')}
        />
      </Flex>
    </Flex>
  )
}

export default NumericDropdownCSSPropertyEditor
