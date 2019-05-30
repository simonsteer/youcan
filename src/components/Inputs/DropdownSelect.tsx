import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import Flex from '../Flex'
import { COLORS } from '../constants'

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
  const [open, setOpen] = useState(false)
  const dropdown = useRef(null)
  const [items, setItems] = useState(
    sortBy(options, ({ value }) => value !== defaultValue)
  )

  useEffect(() => {
    const handler: EventListener = ({ target }) => {
      const current = (get(dropdown, 'current') as unknown) as Node
      if (!current.isSameNode(get(target, 'parentNode') as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  const handleChange = (val: string) => {
    if (open) {
      const nextValue = transformValue ? transformValue(val) : val
      onChange(nextValue)
      setItems(sortBy(options, ({ value }) => value !== val))
    }
    setOpen(!open)
  }

  return (
    <List ref={dropdown} numItems={items.length} open={open}>
      {items.map(({ value, label }) => (
        <Item as="li" align="center" onClick={() => handleChange(value)}>
          {label}
        </Item>
      ))}
    </List>
  )
}

const Item = styled(Flex)`
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
  }
`

const List = styled.ul<{ open: boolean; numItems: number }>`
  background: ${COLORS.black};
  overflow: hidden;
  border: none;
  border-radius: 0px;
  height: ${({ open, numItems }) => (open ? `${numItems * 20}px` : '20px')};
  transition: height 0.2s;
`
