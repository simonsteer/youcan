import styled from 'styled-components'
import { COLORS } from '../constants'

interface ArrowProps {
  rotate?: number
  size?: number
}

const Arrow = styled.button<ArrowProps>`
  width: 0;
  height: 0;
  padding: 0px;
  margin-right: 5px;
  border-top: ${({ size }) => `${size || 2}px solid ${COLORS.black}`};
  border-left: ${({ size }) => `${size || 2}px solid ${COLORS.black}`};
  border-bottom: ${({ size }) => `${size || 2}px solid ${COLORS.white}`};
  border-right: ${({ size }) => `${size || 2}px solid ${COLORS.white}`};
  transform: rotate(${({ rotate }) => `${rotate || 0}deg`});
`

export default Arrow
