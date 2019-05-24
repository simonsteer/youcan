import React, { useState, SyntheticEvent } from 'react'
import get from 'lodash/get'
import View, { Style } from './View'

export interface SliderProps {
  label: string
  min: number
  max: number
  start: number
  step?: number
  style?: Style
  onChange: (value: number) => any
}

const Slider = ({
  label,
  min,
  max,
  start,
  onChange,
  step,
  style = {},
}: SliderProps) => {
  const [value, setValue] = useState(start)
  const [text, setText] = useState(start)

  const handleChange = (nextValue: number) => {
    setText(nextValue)
    setValue(nextValue)
    onChange(nextValue)
  }

  return (
    <View style={[styles.container, style]}>
      <View as="label" style={styles.label}>
        {label}
      </View>
      <View
        style={{
          width: '100%',
          opacity: 0.5,
          _hover: { opacity: 1 },
          transition: 'opacity 0.2s',
        }}
      >
        <View
          as="input"
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={(event: SyntheticEvent) => {
            const nextValue = Number(get(event, 'target.value'))
            handleChange(nextValue)
          }}
          style={styles.slider}
        />
        <View
          as="input"
          type="text"
          onChange={(event: SyntheticEvent) => {
            const value = Number(get(event, 'target.value') || '0')
            const nextValue = Math.min(value, max)
            handleChange(nextValue)
          }}
          style={styles.box}
          value={text}
        />
      </View>
    </View>
  )
}

export default Slider

const styles = {
  container: {
    fontSize: '11px',
    fontFamily: 'sans-serif',
    lineHeight: 1,
    height: '32px',
  },
  label: {
    position: 'relative',
    top: '2px',
  },
  slider: {
    appearance: 'none',
    height: '4px',
    width: '160px',
    borderRadius: '2px',
    background: '#d3d3d3',
    outline: 'none',
    _webkitSliderThumb: {
      appearance: 'none',
      width: '12px',
      height: '12px',
      borderRadius: '6px',
      background: 'rgb(44,44,44)',
    },
  },
  box: {
    border: '1px solid #d3d3d3',
    display: 'inline-block',
    padding: '4px',
    width: '31px',
    marginLeft: '16px',
  },
}
