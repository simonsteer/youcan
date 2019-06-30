import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import sortBy from 'lodash/sortBy'
import Flex, { FlexProps } from '../Flex/Flex'
import { COLORS } from '../constants'
import Expandable from '../Expandable'
import Text, { Paragraph } from '../Text'

export interface DropdownSelectProps<T extends (n: string) => any>
  extends FlexProps {
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
  ...flexProps
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

  const [firstItem, ...restItems] = items

  return (
    <Flex height="20px" flex={1} overflow="visible" {...flexProps}>
      <Expandable
        width="100%"
        closeOnBlur
        title={({ isOpen, setIsOpen }) => (
          <DropdownItem
            as="button"
            tabIndex={0}
            isOpen={isOpen}
            cursor="pointer"
            onKeyDown={e => {
              switch (e.keyCode) {
                case 38: {
                  console.log('up')
                  break
                }
                case 40: {
                  console.log('down')
                  break
                }
              }
            }}
            onClick={() => {
              handleChange(isOpen, firstItem.value)
              setIsOpen(!isOpen)
            }}
            >
            <Arrow isOpen={isOpen} size={6} position={{ top: 6, right: 5 }} />
            <Paragraph
              size="sm"
              height="20px"
              align="center"
              padding="0 0 0 5px"
              >
              {firstItem.label}
            </Paragraph>
          </DropdownItem>
        )}
        >
        {({ setIsOpen, isOpen }) => restItems.map(({ value, label }, index) => (
          <DropdownItem
          as="button"
          zIndex={restItems.length - index}
          tabIndex={0}
          isOpen={isOpen}
          key={`dropdown-item-${index + 1}`}
          cursor="pointer"
          onClick={() => {
            handleChange(isOpen, value)
            setIsOpen(!isOpen)
          }}
          >
            <Paragraph
              size="sm"
              height="20px"
              align="center"
              justify="end"
              padding="0 0 0 5px"
            >
              {label}
            </Paragraph>
          </DropdownItem>
          ))
        }
      </Expandable>
    </Flex>
  )
}

export interface DropdownArrowProps {
  size: number | string
  isOpen: boolean
  position?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
}

export const Arrow = styled.div<DropdownArrowProps>`
  ${({ size, isOpen, position = {} }) => {
    const dimensions = typeof size === 'number'
        ? `width: ${size}px; height: ${size}px;`
        : `width: ${size}; height: ${size};`

    return `
      pointer-events: none;
      ${dimensions}
      transform: rotate(${isOpen ? 0 : 90}deg);
      ${position.top ? `top: ${position.top}px;` : ''}
      ${position.right ? `right: ${position.right}px;` : ''}
      ${position.bottom ? `bottom: ${position.bottom}px;` : ''}
      ${position.left ? `left: ${position.left}px;` : ''}
      clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
      position: absolute;
      transition: transform 0.2s, background-color 0.2s;
      background: ${COLORS.black};
      `
  }}
`

const DropdownItem = styled(Flex)<{ isOpen: boolean }>`
  ${({ isOpen }) => `
    background: ${isOpen ? COLORS.grey : 'transparent'};
    transition: background-color 0.2s, color 0.2s;
    &:hover, &:focus {
      outline: none;
      background: ${isOpen ? COLORS.black : COLORS.white};
      color: ${isOpen ? COLORS.white : COLORS.black};
      ${Arrow} {
        background: ${isOpen ? COLORS.white : COLORS.black};
      }
      ${Text} {
        color: ${isOpen ? COLORS.white : COLORS.black};
      }
    }
    ${Text} {
      color: ${isOpen ? COLORS.white : COLORS.black};
      transition: color 0.2s;
    }
  `}
`
