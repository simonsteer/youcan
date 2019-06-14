import React, { useState, SyntheticEvent } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { COLORS } from '../constants'
import Flex from '../Flex'
import Arrow from './Arrow'

export interface NumericInputProps<T extends (n: number) => any> {
  min?: number
  max?: number
  start?: number
  step?: number
  onChange: (value: ReturnType<T>) => void
  transformValue?: T
}

export const NumericInput = <D extends (n: number) => any>({
  min = 0,
  max = Infinity,
  start = 0,
  step = 1,
  onChange,
  transformValue,
}: NumericInputProps<D>) => {
  const [value, setValue] = useState(start)
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (param: SyntheticEvent | number) => {
    const val: number = Number(
      get(param, 'target') ? get(param, 'target.value') : param
    )

    if (val > max || val < min) {
      return
    }

    const nextValue = transformValue ? transformValue(val) : val

    setValue(nextValue)
    onChange(nextValue)
  }

  const focusHandlers = {
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  }

  return (
    <Container isFocused={isFocused}>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        {...focusHandlers}
      />
      <Flex center column>
        <Arrow
          {...focusHandlers}
          onClick={() => handleChange(Number(value + 1))}
          rotate={45}
        />
        <Arrow
          {...focusHandlers}
          onClick={() => handleChange(Number(value - 1))}
          rotate={225}
        />
      </Flex>
    </Container>
  )
}

const Container = styled(Flex)<{ isFocused: boolean }>`
  flex: 1;
  height: 20px;
  font-size: 12px;
  background: ${({ isFocused }) => (isFocused ? COLORS.white : 'transparent')};
  transition: background 0.2s;
  button {
    transition: border-color 0.2s;
    border-bottom-color: ${({ isFocused }) => (isFocused ? COLORS.white : COLORS.lightGrey)};
    border-right-color: ${({ isFocused }) => (isFocused ? COLORS.white : COLORS.lightGrey)};
  }
  &:hover {
    background: ${COLORS.white};
    button {
      border-bottom-color: ${COLORS.white};
      border-right-color: ${COLORS.white};
    }
  }
`

const Input = styled.input`
  color: ${COLORS.black};
  width: calc(100% - 10px);
  height: 100%;
  border: none;
  padding-left: 3px;
  background: none;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
  }
`
