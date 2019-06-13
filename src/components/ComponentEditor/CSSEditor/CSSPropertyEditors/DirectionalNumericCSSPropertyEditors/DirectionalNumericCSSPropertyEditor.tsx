import React, { useState } from 'react'
import NumericCSSPropertyEditor from '../NumericDropdownCSSPropertyEditor'
import Flex from '../../../../Flex'
import Expandable from '../../../../Expandable'
import EditorTitle from '../../EditorTitle'
import { FlexProps } from '../../../../Flex/Flex'
import KeyboardShortcut from '../../../../KeyboardShortcut'

export const DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const

export type Direction = 'top' | 'right' | 'bottom' | 'left'

interface DirectionEditorProps<T> extends FlexProps {
  onChange: (value: { type: T; value: string }) => void
  type: T
}

export interface DirectionalNumericCSSPropertyEditorProps extends FlexProps {
  onChange: (value: string) => void
  title: string
  zIndex?: number
  shortcutKey?: string
}

const DirectionEditor = <T extends Direction>({
  onChange,
  type,
  ...flexProps
}: DirectionEditorProps<T>) => (
  <NumericCSSPropertyEditor
    {...flexProps}
    displayName={type}
    dropdownProps={createDirectionalDropdownProps(type)}
    onChange={value => onChange({ type, value })}
  />
)

const DirectionalNumericCSSPropertyEditor = ({
  title,
  onChange,
  shortcutKey = '',
  ...flexProps
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
    <Expandable
      {...flexProps}
      title={({ toggleIsOpen }) => (
        <EditorTitle
          shortcut={(
            <KeyboardShortcut
              shortcut={{
                key: shortcutKey,
                callback: toggleIsOpen,
                options: { meta: true },
              }}
            />
)}
          onClick={toggleIsOpen}
        >
          {title}
        </EditorTitle>
      )}
    >
      <Flex column overflow="visible" padding="12px">
        {DIRECTIONS.map((type, index) => (
          <DirectionEditor
            key={`${title}-${type}`}
            zIndex={DIRECTIONS.length - index}
            type={type}
            onChange={handleChange}
          />
        ))}
      </Flex>
    </Expandable>
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
