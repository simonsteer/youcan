import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../Flex'
import { COLORS } from '../constants'
import MarginEditor, {
  MarginProperties,
} from './CSSPropertyEditors/MarginEditor'
import PaddingEditor, {
  PaddingProperties,
} from './CSSPropertyEditors/PaddingEditor'
import BorderEditor, {
  BorderProperties,
} from './CSSPropertyEditors/BorderEditor'
import DimensionEditor, {
  DimensionsProperties,
} from './CSSPropertyEditors/DimensionsEditor'

export interface CSSProperties
  extends MarginProperties,
    PaddingProperties,
    BorderProperties {
  [property: string]: string
}

export type CSSPropertyChanges =
  | MarginProperties
  | PaddingProperties
  | BorderProperties
  | DimensionsProperties

export interface ComponentEditorProps {
  onChange: (properties: CSSPropertyChanges) => void
}

const ComponentEditor = ({ onChange }: ComponentEditorProps) => (
  <Root column reverse justify="end">
    <PaddingEditor onChange={onChange} />
    <MarginEditor onChange={onChange} />
    <BorderEditor onChange={onChange} />
    <DimensionEditor onChange={onChange} />
  </Root>
)

export default ComponentEditor

const Root = styled(Flex)`
  font-family: sans-serif;
  background: ${COLORS.black};
  width: 300px;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
`
