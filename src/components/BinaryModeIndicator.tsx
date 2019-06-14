import React, { useState } from 'react'
import styled from 'styled-components'
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
    <Flex color={COLORS.black} justify="between" {...flexProps}>
      <Toggle onChange={handleChange} initialValue={initialValue} />
      <Indicator size="sm" center indicatorValue={indicatorValue}>
        <Flex as="span">{modes[0]}</Flex>
        {modes[1]}
      </Indicator>
    </Flex>
  )
}

export default BinaryModeIndicator

const Indicator = styled(Paragraph)<{ indicatorValue: boolean }>`
  ${({ indicatorValue }) => `
transition: color 0.2s;
color: ${indicatorValue ? COLORS.black : COLORS.lightGrey}
${Flex} {
  margin-right: 8px;
  color: ${indicatorValue ? COLORS.lightGrey : COLORS.black};
}
`}
`
