import React, { useState } from 'react'
import { COLORS } from './constants'
import Flex from './Flex'
import { Toggle, ToggleProps } from './Inputs/Toggle'
import { Paragraph } from './Text'

export interface BinaryModeIndicatorProps<M extends string>
  extends Omit<ToggleProps, 'onChange'> {
  modes: M[]
  onChange: (mode: M) => void
}

const BinaryModeIndicator = <M extends string>({
  modes,
  onChange,
  initialValue,
  ...flexProps
}: BinaryModeIndicatorProps<M>) => {
  const [indicatorValue, setIndicatorValue] = useState(initialValue)
  const handleChange = (nextValue: boolean) => {
    const mode = modes.find((_, i) => Boolean(i) === nextValue)
    onChange(mode)
    setIndicatorValue(nextValue)
  }

  return (
    <Flex color={COLORS.black} {...flexProps}>
      <Toggle
        onChange={handleChange}
        initialValue={initialValue}
        margin="0 12px 0 0"
      />
      <Paragraph size="sm" center>
        {indicatorValue ? modes[1] : modes[0]}
      </Paragraph>
    </Flex>
  )
}

export default BinaryModeIndicator
