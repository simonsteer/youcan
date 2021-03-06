import React, { useState } from 'react'
import NumericDropdownCSSPropertyEditor from '../NumericDropdownCSSPropertyEditor'
import Flex from '../../../../Flex'
import Expandable from '../../../../Expandable'
import EditorTitle from '../EditorTitle'
import { FlexProps } from '../../../../Flex/Flex'
import KeyboardShortcut from '../../../../KeyboardShortcut'
import BinaryModeIndicator from '../../../../BinaryModeIndicator'

export const DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const

export type Direction = 'top' | 'right' | 'bottom' | 'left' | 'all'

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
  <NumericDropdownCSSPropertyEditor
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
  const [isMultiMode, setIsMultiMode] = useState(false)
  const [, setValue] = useState(`${top} ${right} ${bottom} ${left}`)

  const handleChange = ({
    type,
    value,
  }: {
    type: Direction
    value: string
  }) => {
    const nextValues = type === 'all'
        ? { top: value, left: value, right: value, bottom: value }
        : { ...values, [type]: value }
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
        <BinaryModeIndicator
          margin="0 0 12px 0"
          modes={[`all ${title.toLowerCase()}`, `each ${title.toLowerCase()}`]}
          onChange={mode => setIsMultiMode(mode === `each ${title.toLowerCase()}`)
          }
        />
        {isMultiMode ? (
          DIRECTIONS.map((type, index) => (
            <DirectionEditor
              key={`${title}-${type}`}
              zIndex={DIRECTIONS.length - index}
              type={type}
              onChange={handleChange}
            />
          ))
        ) : (
          <DirectionEditor type="all" onChange={handleChange} />
        )}
      </Flex>
    </Expandable>
  )
}

export default DirectionalNumericCSSPropertyEditor

export const createDirectionalDropdownProps = (type: Direction) => ({
  options: [
    { value: 'vw', label: '% window width' },
    { value: 'vh', label: '% window height' },
    { value: 'px', label: 'pixels' },
    type !== 'all' && {
      value: '%',
      label: `% container ${
        type === 'bottom' || type === 'top' ? 'height' : 'width'
      }`,
    },
  ].filter(Boolean),
  defaultValue: 'px',
})
