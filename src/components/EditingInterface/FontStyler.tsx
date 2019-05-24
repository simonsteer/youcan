import React from 'react'
import View from '../View'
import Slider, { SliderProps } from '../Slider'

interface FontStylerProps {
  onChange: SliderProps['onChange']
}

const FontStyler = ({ onChange }: FontStylerProps) => {
  return (
    <View style={{ padding: '16px' }}>
      <Slider
        label="Font Size"
        min={8}
        max={100}
        step={1}
        start={14}
        onChange={onChange}
      />
    </View>
  )
}

export default FontStyler
