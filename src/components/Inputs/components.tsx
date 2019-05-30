import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../constants'

interface ArrowProps {
  rotate: number
}
export const Arrow = styled.button<ArrowProps>`
  width: 0;
  height: 0;
  padding: 0px;
  margin-right: 5px;
  border-top: 2px solid ${COLORS.white};
  border-left: 2px solid ${COLORS.white};
  border-bottom: 2px solid ${COLORS.black};
  border-right: 2px solid ${COLORS.black};
  transform: rotate(${({ rotate }) => `${rotate}deg`});
`
