import React, { useState } from 'react'
import styled from 'styled-components'
import sortBy from 'lodash/sortBy'
import Flex from '../Flex'
import { COLORS } from '../constants'
import Expandable from '../Expandable';

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
    <Flex height="20px" flex={1} overflow="visible">
      <Expandable closedHeight={20} showArrow closeOnBlur>
        {({ setIsOpen, isOpen }) => items.map(({ value, label }, index) => (
          <Item
          key={index}
          index={index}
          align="center"
          onClick={() => {
            handleChange(isOpen, value)
            setIsOpen(!isOpen)
          }}
          >
            {label}
          </Item>
        ))}
      </Expandable>
    </Flex>
  )
}

const Item = styled(Flex)<{ index: number }>`
  position: relative;
  font-size: 10px;
  height: 20px;
  padding-left: 5px;
  background: ${COLORS.black};
  color: ${COLORS.white};
  border: none;
  border-radius: 0px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background: ${COLORS.grey};
    button {
      border-bottom-color: ${COLORS.grey};
      border-right-color: ${COLORS.grey};
    }
  }
`