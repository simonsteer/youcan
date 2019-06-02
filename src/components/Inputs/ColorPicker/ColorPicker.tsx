import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../Flex';
import Expandable from '../../Expandable';

interface ColorPickerProps {
  onChange: (color: string) => void
  initialValue: string
}

const ColorPicker = ({ initialValue = '#a3a3a3' }: ColorPickerProps) => {
  const [value, setValue] = useState(initialValue)
  const [tempValue, setTempValue] = useState(initialValue)

  return (
    <Flex height="20px" overflow="visible">
      <Expandable closedHeight={20} closeOnBlur showArrow>
        {(setIsOpen, isOpen) => {
          const toggleIsOpen = () => setIsOpen(!isOpen)

          return <div>
            <Flex width="100%" height="20px" background={value} onClick={toggleIsOpen} />
            <ColorMap column onClick={toggleIsOpen} onMouseOver={console.log} width="75px" height="75px">
              <LightnessMap flex={1} />
              <DarknessMap flex={1} />
            </ColorMap>
          </div>
        }}
      </Expandable>
    </Flex>
  )
}

export default ColorPicker

interface ColorMapProps {
  onMouseOver: (e: any) => void
}
const ColorMap = styled(Flex) <ColorMapProps>`
  background: -webkit-linear-gradient(left, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%, #00F 66.66%, #F0F 83.33%, #F00 100%);
  cursor: crosshair;
`

const LightnessMap = styled(Flex)`
  background: -webkit-linear-gradient(top, black 5%, transparent);
  mix-blend-mode: multiply;
`

const DarknessMap = styled(Flex)`
  background: -webkit-linear-gradient(bottom, white 5%, transparent);
  mix-blend-mode: screen;
`