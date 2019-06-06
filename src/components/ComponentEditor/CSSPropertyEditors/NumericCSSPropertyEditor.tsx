import React, { useState } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { NumericInput, NumericInputProps } from "../../Inputs/NumericInput"
import { DropdownSelect, DropdownSelectProps } from "../../Inputs/DropdownSelect"
import Flex from '../../Flex'
import { COLORS } from '../../constants';

interface NumericCSSPropertyEditorProps<N extends (n: number) => any, D extends (d: any) => any> {
  numericProps?: Pick<NumericInputProps<N>, Exclude<keyof NumericInputProps<N>, 'onChange'>>
  dropdownProps: Pick<DropdownSelectProps<D>, Exclude<keyof DropdownSelectProps<D>, 'onChange'>>
  property: string
  displayName: string
  transformValue: (numericValue: any, dropdownValue: any) => string
  onChange: (property: { [key: string]: string }) => void
}

const NumericCSSPropertyEditor = <N extends (n: number) => string, D extends (d: string) => string>({ numericProps, dropdownProps, transformValue, onChange, property, displayName }: NumericCSSPropertyEditorProps<N, D>) => {
  const [numericValue, setNumericValue] = useState(get(numericProps, 'start') || 0)
  const [dropdownValue, setDropdownValue] = useState(get(dropdownProps, 'defaultValue') || get(dropdownProps, `options[0].value`))

  const handleChange = (nextValue: any, type: 'numeric' | 'dropdown') => {
    let value = transformValue(numericValue, dropdownValue)
    if (type === 'numeric') {
      setNumericValue(nextValue)
      value = transformValue(nextValue, dropdownValue)
    } else {
      setDropdownValue(nextValue)
      value = transformValue(numericValue, nextValue)
    }
    onChange({ [property]: value })
  }


  return (
    <Flex overflow="visible" flex={1}>
      <Title>{displayName}</Title>
      <NumericInput {...numericProps} onChange={n => handleChange(n, 'numeric')} />
      <Flex flex={3} height="20px" overflow="visible">
        <DropdownSelect {...dropdownProps} onChange={d => handleChange(d, 'dropdown')} />
      </Flex>
    </Flex>
  )
} 

export default NumericCSSPropertyEditor

const Title = styled.p`
  font-size: 12px;
  color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 5px;
  width: 100px;
`