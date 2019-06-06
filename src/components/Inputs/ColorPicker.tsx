import React, { useState, MouseEvent } from 'react'
import styled from 'styled-components'
import tinycolor from 'tinycolor2'
import Flex from '../Flex';
import Expandable from '../Expandable';

interface ColorPickerProps {
  onChange: (color: string) => void
  initialValue: string
}

export const ColorPicker = ({ initialValue = '#a3a3a3', onChange }: ColorPickerProps) => {
  const [value, setValue] = useState(initialValue)
  const [displayValue, setDisplayValue] = useState(initialValue)

  const handleMouseMove = (e: MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent

    const hue = Math.round((offsetX / 75) * 360)
    const lightness = Math.round(Math.max((offsetY / 75) * 100, 0))

    const value = tinycolor(`hsl(${hue},100,${lightness})`)
    setDisplayValue(value.toHexString())
  }

  const handleMouseOut = (e: MouseEvent) => {
    setDisplayValue(value)
  }

  return (
    <Flex height="20px" overflow="visible">
      <Expandable closedHeight={20} closeOnBlur>
        {({ setIsOpen, isOpen }) => {
          const handleClick = () => {
            setValue(displayValue)
            onChange(displayValue)
            setIsOpen(false)
          }

          return <div>
            <ColorPreview width="100%" height="20px" style={{ background: displayValue }} onClick={() => setIsOpen(!isOpen)} />
            <ColorMap column onClick={handleClick} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} width="75px" height="75px">
              <LightnessMap flex={1} />
              <DarknessMap flex={1} />
            </ColorMap>
          </div>
        }}
      </Expandable>
    </Flex>
  )
}

const ColorPreview = styled(Flex)`
  cursor: pointer;
`

interface ColorMapProps {
  onMouseMove: (e: any) => void
}
const ColorMap = styled(Flex) <ColorMapProps>`
  background: -webkit-linear-gradient(left, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%, #00F 66.66%, #F0F 83.33%, #F00 100%);
  cursor: crosshair;
`

const LightnessMap = styled(Flex)`
  background: -webkit-linear-gradient(top, black 5%, transparent);
  mix-blend-mode: multiply;
  pointer-events: none;
`

const DarknessMap = styled(Flex)`
  background: -webkit-linear-gradient(bottom, white 5%, transparent);
  mix-blend-mode: screen;
  pointer-events: none;
`