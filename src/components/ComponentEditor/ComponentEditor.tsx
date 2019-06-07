import React from 'react'
import styled from 'styled-components'
import Flex from '../Flex'
import { COLORS } from '../constants'
import { PaddingEditor, MarginEditor } from './CSSPropertyEditors';

const ComponentEditor = () => <Root column reverse justify="end">
  <PaddingEditor onChange={console.log} />
  <MarginEditor onChange={console.log} />
</Root>

export default ComponentEditor

const Root = styled(Flex)`
  font-family: sans-serif;
  background: ${COLORS.black};
  width: 300px;
  height: 100vh;
  padding: 0px 12px;
`
