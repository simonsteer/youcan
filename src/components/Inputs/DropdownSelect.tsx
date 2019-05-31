import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import Flex from '../Flex'
import { COLORS } from '../constants'
import Arrow from './Arrow'

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
  const [isOpen, setIsOpen] = useState(false)
  const dropdown = useRef(null)
  const [items, setItems] = useState(
    sortBy(options, ({ value }) => value !== defaultValue)
  )

  useEffect(() => {
    const handler: EventListener = ({ target }) => {
      const current = (get(dropdown, 'current') as unknown) as Node
      if (current && !current.isSameNode(get(target, 'parentNode') as Node)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  const handleChange = (val: string) => {
    if (isOpen) {
      const nextValue = transformValue ? transformValue(val) : val
      onChange(nextValue)
      setItems(sortBy(options, ({ value }) => value !== val))
    }
    setIsOpen(!isOpen)
  }

  return (
    <Flex height="20px" overflow="visible">
      <List ref={dropdown} numItems={items.length} isOpen={isOpen}>
        {items.map(({ value, label }, index) => (
          <Item
            key={index}
            index={index}
            as="li"
            align="center"
            onClick={() => handleChange(value)}
          >
            {index === 0 ? (
              <DropdownArrow
                onClick={() => setIsOpen(!isOpen)}
                rotate={isOpen ? -135 : -45}
              />
            ) : null}
            {label}
          </Item>
        ))}
      </List>
    </Flex>
  )
}

const DropdownArrow = styled(Arrow)`
  position: absolute;
  right: 0px;
  top: 7px;
  transition: all 0.2s;
`

const Item = styled(Flex)<{ index: number }>`
  position: relative;
  font-size: 12px;
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

const List = styled.ul<{ isOpen: boolean; numItems: number }>`
  background: ${COLORS.black};
  overflow: hidden;
  border: none;
  border-radius: 0px;
  width: 100%;
  transition: height 0.2s;
  height: ${({ isOpen, numItems }) => (isOpen ? `${numItems * 20}px` : '20px')};
`
