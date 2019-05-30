import React, { useState, SyntheticEvent } from 'react'
import get from 'lodash/get'
import View from './View'
import Flex from './Flex'
import Text from './Text'

interface NumericInputProps {
  max?: number
  min?: number
  start?: number
  name: string
  transformValue?: (value: string) => any
  onChange?: (value?: any) => void
  onFocus?: () => void
}

const NumericInput = ({
  min = 0,
  max = Infinity,
  start = min,
  name,
  transformValue = n => n,
  onChange = () => {},
  onFocus = () => {},
}: NumericInputProps) => {
  const [value, setValue] = useState(`${start}`)

  const handleChange = (value: string) => {
    setValue(value)
    const transformedValue = transformValue(value)
    onChange(transformedValue)
  }

  return (
    <View
      as="input"
      type="number"
      name={name}
      min={min}
      max={max}
      value={value}
      onChange={({ target }: SyntheticEvent) =>
        handleChange(get(target, 'value') || min)
      }
      onFocus={onFocus}
      style={styles.input}
    />
  )
}

export default NumericInput

const styles = {
  input: {
    width: '50px',
    height: '30px',
    border: '1px solid #a3a3a3',
    padding: '0px 0px 0px 5px',
    _webkitInnerSpinButton: {
      margin: '0px',
    },
  },
}
