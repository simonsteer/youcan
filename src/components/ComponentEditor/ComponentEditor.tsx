import React from 'react'
import styled from 'styled-components'
import Flex from '../Flex'
import { COLORS } from '../constants'
import MenuItem from './MenuItem';
import { PaddingEditor } from './CSSPropertyEditors/PaddingEditor';

const ComponentEditor = () => <Root column reverse justify="end">
  <PaddingEditor onChange={console.log} />
  <PaddingEditor onChange={console.log} />
</Root>

export default ComponentEditor

const Root = styled(Flex)`
  font-family: sans-serif;
  background: ${COLORS.black};
  width: 300px;
  height: 100vh;
  padding: 0px 12px;
`
