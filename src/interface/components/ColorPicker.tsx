import React, { useState } from 'react'
import styled from 'styled-components'
import Slider from './Slider'

const Div = styled.div`
  width: 100%'
`

const ColorPicker = () => {
  const [hue, setHue] = useState(180)
  const [saturation, setSaturation] = useState(50)
  const [lightness, setLightness] = useState(50)
  const [alpha, setAlpha] = useState(1)

  return (
    <Div>
      <Slider min={0} max={360} start={hue} onChange={setHue} />
      <Slider min={0} max={100} start={saturation} onChange={setSaturation} />
      <Slider min={0} max={100} start={lightness} onChange={setLightness} />
      <Slider min={0} max={1} step={0.01} start={alpha} onChange={setAlpha} />
    </Div>
  )
}

export default ColorPicker
