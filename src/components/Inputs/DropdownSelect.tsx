import React, { useState } from 'react'
import styled from 'styled-components'
import sortBy from 'lodash/sortBy'
import Flex from '../Flex'
import { COLORS } from '../constants'
import Expandable from '../Expandable'

export interface DropdownSelectProps<T extends (n: string) => any> {
  options: { value: string; label: string }[]
  defaultValue?: string
  onChange: (value: ReturnType<T>) => void
  transformValue?: T
}

export const DropdownSelect = <F extends (n: string) => any>({
  options,
  defaultValue,
  onChange,
  transformValue,
}: DropdownSelectProps<F>) => {
  const [items, setItems] = useState(
    sortBy(options, ({ value }) => value !== defaultValue)
  )

  const handleChange = (isOpen: boolean, val: string) => {
    if (isOpen) {
      const nextValue = transformValue ? transformValue(val) : val
      onChange(nextValue)
      setItems(sortBy(options, ({ value }) => value !== val))
    }
  }

  return (
    <Flex height="20px" flex={1} overflow="visible" position="relative">
      <Expandable closedHeight={20} closeOnBlur>
        {({ setIsOpen, isOpen }) =>
          items.map(({ value, label }, index) => (
            <Item
              isOpen={isOpen}
              key={index}
              index={index}
              align="center"
              justify="end"
              onClick={() => {
                handleChange(isOpen, value)
                setIsOpen(!isOpen)
              }}
            >
              {index === 0 && <Arrow isOpen={isOpen} size={6} />}
              {label}
            </Item>
          ))
        }
      </Expandable>
    </Flex>
  )
}

const Arrow = styled.div<{ size: number | string; isOpen: boolean }>`
  ${({ size, isOpen }) => {
    const dimensions =
      typeof size === 'number'
        ? `width: ${size}px; height: ${size}px;`
        : `width: ${size}; height: ${size};`

    return `
      pointer-events: none;
      ${dimensions}
      transform: rotate(${isOpen ? 0 : 90}deg);
      right: 5px;
      top: 6px;
      clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
      position: absolute;
      transition: transform 0.2s, background-color 0.2s;
      background: ${COLORS.white};
      `
  }}
`

const Item = styled(Flex)<{ index: number; isOpen: boolean }>`
  position: relative;
  font-size: 10px;
  height: 20px;
  padding-right: 20px;
  background: ${({ isOpen }) => (isOpen ? COLORS.grey : COLORS.black)};
  color: ${COLORS.white};
  border: none;
  border-radius: 0px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background: ${({ isOpen }) => (isOpen ? COLORS.white : COLORS.grey)};
    color: ${({ isOpen }) => (isOpen ? COLORS.black : COLORS.white)};
    ${Arrow} {
      background: ${({ isOpen }) => (isOpen ? COLORS.black : COLORS.white)};
    }
  }
`
