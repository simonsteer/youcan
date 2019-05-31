import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../Flex'
import { COLORS } from '../constants'

export interface ToggleProps {
  initialValue?: boolean
  onChange: (value: boolean) => void
}

export const Toggle = ({ initialValue = false, onChange }: ToggleProps) => {
  const [isToggled, setIsToggled] = useState(initialValue)

  const handleClick = () => {
    const nextValue = !isToggled
    setIsToggled(nextValue)
    onChange(nextValue)
  }

  return (
    <Container onClick={handleClick} isToggled={isToggled}>
      <Switch />
    </Container>
  )
}

const Switch = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background: ${COLORS.white};
`

const Container = styled(Flex)<{ isToggled: boolean }>`
  width: 75px;
  height: 20px;
  border-radius: 10px;
  padding: 3px;
  transition: background-color 0.2s;
  background: ${({ isToggled }) => (isToggled ? '#22b573' : COLORS.grey)};
  ${Switch} {
    transition: transform 0.2s;
    transform: translateX(${({ isToggled }) => (isToggled ? 55 : 0)}px);
  }
`
