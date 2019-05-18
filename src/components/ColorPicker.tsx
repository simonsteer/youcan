import React, { useState } from 'react'
import View from './View/View'
import Slider from './Slider'

export interface ColorPickerProps {
  onChange: (color: string) => void
  [key: string]: any
}

const ColorPicker = ({
  onChange,
  style = {},
  ...restProps
}: ColorPickerProps) => {
  const [hue, setHue] = useState(180)
  const [saturation, setSaturation] = useState(0)
  const [lightness, setLightness] = useState(50)
  const [alpha, setAlpha] = useState(1)

  const HSLA = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
  const HSL = `hsl(${hue}, ${saturation}%, ${lightness}%)`

  onChange(HSLA)
  const handleChange = (value: number, setter: typeof setHue) => {
    setter(value)
  }

  return (
    <View style={[styles.container, style]} as="aside" {...restProps}>
      <Slider
        label="Hue"
        min={0}
        max={360}
        step={1}
        start={hue}
        onChange={value => handleChange(value, setHue)}
        style={{ marginBottom: '8px' }}
      />
      <Slider
        label="Saturation"
        min={0}
        max={100}
        step={1}
        start={saturation}
        onChange={value => handleChange(value, setSaturation)}
        style={{ marginBottom: '8px' }}
      />
      <Slider
        label="Lightness"
        min={0}
        max={100}
        step={1}
        start={lightness}
        onChange={value => handleChange(value, setLightness)}
        style={{ marginBottom: '8px' }}
      />
      <Slider
        label="Opacity"
        min={0}
        max={1}
        step={0.01}
        start={alpha}
        onChange={value => handleChange(value, setAlpha)}
        style={{ marginBottom: '8px' }}
      />
      <View
        style={styles.colorBlock}
        inlineStyle={{ background: `${HSLA}`, border: `1px solid ${HSL}` }}
      />
    </View>
  )
}

export default ColorPicker

const styles = {
  container: {
    padding: '8px 16px 16px',
    border: '1px solid #a3a3a3',
    display: 'inline-block',
  },
  colorBlock: {
    width: '100%',
    height: '100px',
    marginTop: '16px',
  },
}
