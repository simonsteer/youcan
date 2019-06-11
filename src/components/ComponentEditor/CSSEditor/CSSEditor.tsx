import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants'
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
import BackgroundEditor, {
  BackgroundProperties,
} from './CSSPropertyEditors/BackgroundEditor'

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
  | BackgroundProperties

export interface CSSEditorProps {
  onChange: (properties: CSSPropertyChanges) => void
}

const CSS_EDITORS = [
  DimensionEditor,
  BackgroundEditor,
  BorderEditor,
  PaddingEditor,
  MarginEditor,
]

const CSSEditor = ({ onChange }: CSSEditorProps) => (
  <SideBar>
    {CSS_EDITORS.map((Editor, index) => (
      <Editor
        key={`css-editor-${index}`}
        onChange={onChange}
        zIndex={CSS_EDITORS.length - index}
      />
    ))}
  </SideBar>
)

export default CSSEditor

const SideBar = styled.aside`
  font-family: sans-serif;
  background: ${COLORS.black};
  width: 300px;
  height: 100vh;
  overflow-y: scroll;
  position: absolute;
  right: 0;
  top: 0;
`
