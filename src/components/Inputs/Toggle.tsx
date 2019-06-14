import React, { useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../constants'
import Flex, { FlexProps } from '../Flex/Flex'

export interface ToggleProps extends FlexProps {
  initialValue?: boolean
  onChange: (value: boolean) => void
}

export const Toggle = ({
  initialValue = false,
  onChange,
  ...flexProps
}: ToggleProps) => {
  const [isToggled, setIsToggled] = useState(initialValue)

  const handleClick = () => {
    const nextValue = !isToggled
    setIsToggled(nextValue)
    onChange(nextValue)
  }

  return (
    <Container onClick={handleClick} isToggled={isToggled} {...flexProps}>
      <Switch />
    </Container>
  )
}

const Switch = styled(Flex)`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background: #fff;
`

const Container = styled(Flex)<{ isToggled: boolean }>`
  cursor: pointer;
  width: 75px;
  height: 20px;
  border-radius: 10px;
  padding: 3px;
  transition: background-color 0.2s;
  background: ${({ isToggled }) => (isToggled ? COLORS.blue : COLORS.lightGrey)};
  ${Switch} {
    transition: transform 0.2s;
    transform: translateX(${({ isToggled }) => (isToggled ? 55 : 0)}px);
  }
`
