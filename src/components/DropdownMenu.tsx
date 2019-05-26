import React, { useState, SyntheticEvent } from 'react'
import get from 'lodash/get'
import View from './View'

interface DropdownMenuProps {
  options: string[]
  transformValue?: (option: string) => any
  onChange?: (option?: string) => void
  name: string
}

const DropdownMenu = ({
  options,
  transformValue = o => o,
  onChange = () => {},
  name,
}: DropdownMenuProps) => {
  const [value, setValue] = useState(options[0])

  const handleChange = ({ target }: SyntheticEvent) => {
    const option = get(target, 'value') || value
    setValue(option)
    const transformedValue = transformValue(option)
    onChange(transformedValue)
  }

  return (
    <View style={{ position: 'relative' }}>
      <View
        as="select"
        name={name}
        style={{ _webkitAppearance: 'none' }}
        onChange={handleChange}
        value={value}
      >
        {options.map((option, index) => (
          <View key={`option-${index}`} as="option" value={option}>
            {option}
          </View>
        ))}
      </View>
    </View>
  )
}

export default DropdownMenu
