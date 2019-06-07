import React, { useState } from 'react'
import NumericCSSPropertyEditor from '../NumericCSSPropertyEditor'
import MenuItem from '../../MenuItem'
import {
  createDirectionalDropdownProps,
  Direction,
} from '../DirectionalNumericCSSPropertyEditors/DirectionalNumericCSSPropertyEditor'
import { Toggle } from '../../../Inputs'
import Expandable from '../../../Expandable'

export interface BorderEditorProps {
  onChange: (values: {
    borderStyle?: string
    borderWidth?: string
    borderColor?: string
  }) => void
  type?: 'all' | Direction
}

const BorderEditor = ({ onChange, type = 'all' }: BorderEditorProps) => {
  const [borderProperties, setBorderProperties] = useState({
    borderStyle: 'none none none none',
    borderColor: 'transparent transparent transparent transparent',
    borderWidth: '0px 0px 0px 0px',
  })

  return (
    <MenuItem title="border">
      <NumericCSSPropertyEditor
        displayName="top"
        dropdownProps={createDirectionalDropdownProps('top')}
        onChange={() => {}}
      />
    </MenuItem>
  )
}

export default BorderEditor

{
  /* <NumericCSSPropertyEditor displayName="top" dropdownProps={createDirectionalDropdownProps('top')} onChange={onChange} /> */
}

// const AdvancedBorderEditorOptions = () => {
//   return (
//     <Expandable closedHeight={0}>

//     </Expandable>
//   )
// }
