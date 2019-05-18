import React, { useState } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

const Input = styled.input`
  appearance: none;
  width: 100%;
  height: 0.5vw;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  margin: 1vw 0;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1.5vw;
    height: 1.5vw;
    border-radius: 10px;
    background: black;
  }
`

interface SliderProps {
  min: number
  max: number
  start: number
  step?: number
  onChange: (value: number) => any
}

const Slider = ({ min, max, start, onChange, step }: SliderProps) => {
  const [value, setValue] = useState(start)

  return (
    <Input
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={event => {
        const value = Number(get(event, 'target.value'))
        setValue(value)
        onChange(value)
      }}
    />
  )
}

export default Slider
