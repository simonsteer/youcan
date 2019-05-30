import React, { useState, SyntheticEvent } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import { COLORS } from '../constants'
import Flex from '../Flex'

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

  return (
    <Container>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Flex center column>
        <Arrow onClick={() => handleChange(Number(value + 1))} rotate={45} />
        <Arrow onClick={() => handleChange(Number(value - 1))} rotate={225} />
      </Flex>
    </Container>
  )
}

const Container = styled(Flex)`
  width: 75px;
  height: 20px;
  background: ${COLORS.black};
  font-size: 12px;
`

const Input = styled.input`
  color: ${COLORS.white};
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

interface ArrowProps {
  rotate: number
}
const Arrow = styled.button<ArrowProps>`
  width: 0;
  height: 0;
  padding: 0px;
  margin-right: 5px;
  border-top: 2px solid ${COLORS.white};
  border-left: 2px solid ${COLORS.white};
  border-bottom: 2px solid ${COLORS.black};
  border-right: 2px solid ${COLORS.black};
  transform: rotate(${({ rotate }) => `${rotate}deg`});
`
