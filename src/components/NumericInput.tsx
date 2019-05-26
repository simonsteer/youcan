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
}

const NumericInput = ({
  min = 0,
  max = Infinity,
  start = min,
  name,
  transformValue = n => n,
  onChange = () => {},
}: NumericInputProps) => {
  const [value, setValue] = useState(`${start}`)

  const handleChange = (value: string) => {
    setValue(value)
    const transformedValue = transformValue(value)
    onChange(transformedValue)
  }

  return (
    <Flex style={styles.container}>
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
        style={styles.input}
      />
      <Flex column style={{ height: '100%' }}>
        <View
          as="input"
          type="button"
          value="+"
          style={styles.button}
          onClick={() => handleChange(`${Math.min(Number(value) + 1, max)}`)}
        />
        <View
          as="input"
          type="button"
          value="-"
          style={[styles.button, { borderTopWidth: '0px' }]}
          onClick={() => handleChange(`${Math.max(Number(value) - 1, min)}`)}
        />
      </Flex>
    </Flex>
  )
}

export default NumericInput

const styles = {
  container: {
    width: '50px',
    height: '30px',
  },
  input: {
    border: '1px solid #a3a3a3',
    borderRightWidth: '0px',
    padding: '0px 0px 0px 5px',
    width: '50px',
    _webkitInnerSpinButton: {
      display: 'none',
      margin: '0px',
    },
  },
  button: {
    width: '15px',
    height: '15px',
    background: '#fff',
    border: '1px solid #a3a3a3',
    padding: '0px',
    lineHeight: '10px',
    fontSize: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    _hover: {
      backgroundColor: '#d8d8d8',
    },
  },
}
