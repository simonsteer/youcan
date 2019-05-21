import React, { useState, Dispatch, SetStateAction } from 'react'
import omitBy from 'lodash/omitBy'
import View from '../View'
import Slider from '../Slider'
import MenuItem from './MenuItem'

export interface ColorPickerProps {
  onChange: (color: string) => void
  [key: string]: any
}

type GetColor = (values: number[]) => string
const getColor: GetColor = values =>
  `hsla(${values[0]},${values[1]}%,${values[2]}%,${values[3]})`

const createSliders = (
  values: number[],
  setValues: Dispatch<SetStateAction<number[]>>,
  setColor: Dispatch<SetStateAction<string>>,
  onChange: (color: string) => void
) => {
  const handleChange = ({
    hue,
    saturation,
    lightness,
    alpha,
  }: {
    hue?: number
    saturation?: number
    lightness?: number
    alpha?: number
  } = {}) => {
    const changedValues = Object.values({
      hue,
      saturation,
      lightness,
      alpha,
    })
    const nextValues = changedValues.map(
      (updatedValue, index) => updatedValue || values[index]
    )
    const nextColor = getColor(nextValues)
    onChange(nextColor)
    setColor(nextColor)
    setValues(nextValues)
  }

  const sliderProps = [
    ['Hue', 0, 360, 1, values[0]] as const,
    ['Saturation', 0, 100, 1, values[1]] as const,
    ['Lightness', 0, 100, 1, values[2]] as const,
    ['Alpha', 0, 1, 0.01, values[3]] as const,
  ].map(([label, min, max, step, start]) => ({
    label,
    min,
    max,
    step,
    start,
    style: { marginBottom: '8px' },
    onChange: (value: number) => handleChange({ [label.toLowerCase()]: value }),
  }))

  return sliderProps
}

const ColorPicker = ({
  onChange,
  style = {},
  ...restProps
}: ColorPickerProps) => {
  const [values, setValues] = useState([180, 0, 50, 1])
  const [color, setColor] = useState(getColor(values))

  const cutOff = color.lastIndexOf('%') + 1
  const borderColor = color.slice(0, cutOff) + ',1)'

  const sliders = createSliders(values, setValues, setColor, onChange)

  return (
    <MenuItem as="aside" title="Color" style={style} {...restProps}>
      {sliders.map((slider, index) => (
        <Slider key={`slider-${index}`} {...slider} />
      ))}
      <View
        style={styles.colorBlock}
        inlineStyle={{
          background: `${color}`,
          border: `1px solid ${borderColor}`,
        }}
      />
    </MenuItem>
  )
}

export default ColorPicker

const styles = {
  colorBlock: {
    width: '100%',
    height: '100px',
    marginTop: '16px',
  },
}
