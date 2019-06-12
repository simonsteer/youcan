import React, { useState } from 'react'
import NumericCSSPropertyEditor from '../NumericDropdownCSSPropertyEditor'
import Flex from '../../../../Flex'
import AccordionMenu from '../../../../AccordionMenu'
import EditorTitle from '../../EditorTitle'

export const DIRECTIONS = ['left', 'bottom', 'right', 'top'] as const

export type Direction = 'top' | 'right' | 'bottom' | 'left'

interface DirectionEditorProps<T> {
  onChange: (value: { type: T; value: string }) => void
  type: T
}

export interface DirectionalNumericCSSPropertyEditorProps {
  onChange: (value: string) => void
  title: string
  zIndex?: number
  shortcutKey?: string
}

const DirectionEditor = <T extends Direction>({
  onChange,
  type,
}: DirectionEditorProps<T>) => (
  <NumericCSSPropertyEditor
    displayName={type}
    dropdownProps={createDirectionalDropdownProps(type)}
    onChange={value => onChange({ type, value })}
  />
)

const DirectionalNumericCSSPropertyEditor = ({
  title,
  onChange,
  zIndex = 0,
  shortcutKey = '',
}: DirectionalNumericCSSPropertyEditorProps) => {
  const [values, setValues] = useState({
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  })
  const { top, right, bottom, left } = values
  const [, setValue] = useState(`${top} ${right} ${bottom} ${left}`)

  const handleChange = ({
    type,
    value,
  }: {
    type: Direction
    value: string
  }) => {
    const nextValues = { ...values, [type]: value }
    setValues(nextValues)

    const { top, right, bottom, left } = nextValues
    const nextValue = `${top} ${right} ${bottom} ${left}`
    setValue(nextValue)
    onChange(nextValue)
  }

  return (
    <AccordionMenu
      zIndex={zIndex}
      title={({ toggleIsOpen, setIsOpen, isOpen }) => (
        <EditorTitle
          shortcut={{
            key: shortcutKey,
            callback: toggleIsOpen,
            options: { meta: true },
          }}
          onClick={toggleIsOpen}
          tabIndex={0}
          onFocus={() => {
            if (isOpen) return
            setIsOpen(true)
          }}
        >
          {title}
        </EditorTitle>
      )}
    >
      <Flex column reverse overflow="visible" padding="12px">
        {DIRECTIONS.map(type => (
          <DirectionEditor
            key={`${title}-${type}`}
            type={type}
            onChange={handleChange}
          />
        ))}
      </Flex>
    </AccordionMenu>
  )
}

export default DirectionalNumericCSSPropertyEditor

export const createDirectionalDropdownProps = (type: Direction | 'all') => ({
  options: [
    { value: 'vw', label: '% window width' },
    { value: 'vh', label: '% window height' },
    { value: 'px', label: 'pixels' },
    {
      value: '%',
      label: `% container ${
        type === 'bottom' || type === 'top' ? 'height' : 'width'
      }`,
    },
  ],
  defaultValue: 'px',
})
