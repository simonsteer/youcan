import React, { useState, MouseEvent } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import tinycolor from 'tinycolor2'
import Flex from '../Flex'
import Expandable from '../Expandable'

interface ColorPickerProps {
  onChange: (color: string) => void
  initialValue: string
}

export const ColorPicker = ({
  initialValue = '#a3a3a3',
  onChange,
}: ColorPickerProps) => {
  const [value, setValue] = useState(initialValue)
  const [displayValue, setDisplayValue] = useState(initialValue)

  const handleMouseMove = (e: MouseEvent) => {
    const { offsetX, offsetY, target } = e.nativeEvent

    const gradientWidth = get(target, 'clientWidth') || 1
    const gradientHeight = get(target, 'clientHeight') || 1

    const hue = Math.round((offsetX / gradientWidth) * 360)
    const lightness = Math.round(Math.max((offsetY / gradientHeight) * 100, 0))

    const value = tinycolor(`hsl(${hue},100,${lightness})`)
    setDisplayValue(value.toHexString())
  }

  const handleMouseOut = (e: MouseEvent) => {
    setDisplayValue(value)
  }

  return (
    <Flex height="20px" overflow="visible">
      <Expandable title={<ColorPreview width="100%" height="20px" background={displayValue || value} />} closeOnBlur>
        {({ setIsOpen }) => {
          const handleClick = () => {
            setValue(displayValue)
            onChange(displayValue)
            setIsOpen(false)
          }

          return (
            <div>
              <ColorMap
                column
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseOut={handleMouseOut}
                width="100%"
                height="75px"
              >
                <LightnessMap flex={1} />
                <DarknessMap flex={1} />
              </ColorMap>
            </div>
          )
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
const ColorMap = styled(Flex)<ColorMapProps>`
  background: -webkit-linear-gradient(
    left,
    #f00 0%,
    #ff0 16.66%,
    #0f0 33.33%,
    #0ff 50%,
    #00f 66.66%,
    #f0f 83.33%,
    #f00 100%
  );
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
