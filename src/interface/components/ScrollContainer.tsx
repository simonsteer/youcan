import React from 'react'

interface ScrollContainerProps {
  horizontal?: boolean
  children?: any
}

const ScrollContainer = ({
  horizontal = false,
  children,
  ...restProps
}: ScrollContainerProps) => <div {...restProps}>{children}</div>

export default ScrollContainer
