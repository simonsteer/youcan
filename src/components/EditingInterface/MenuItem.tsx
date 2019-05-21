import React, { useState } from 'react'
import View, { Style } from '../View'

export interface MenuItemProps {
  title: string
  style?: Style
  [key: string]: any
}

const MenuItem = ({
  title,
  style = {},
  children,
  ...restProps
}: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <View
      style={[
        isOpen ? { flex: 1 } : { height: '27px' },
        styles.container,
        style,
      ]}
      as="aside"
      {...restProps}
    >
      <View onClick={() => setIsOpen(!isOpen)} style={styles.title}>
        {title}
      </View>
      <View style={{ height: '100%', padding: '16px', overflowY: 'scroll' }}>
        {children}
      </View>
    </View>
  )
}

export default MenuItem

const styles = {
  container: {
    border: '1px solid #a3a3a3',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    cursor: 'pointer',
    background: 'rgb(244, 244, 244)',
    height: '11px',
    padding: '8px',
    fontSize: '11px',
    fontFamily: 'sans-serif',
    transition: 'background-color 0.2s',
    _hover: { background: 'rgb(236, 236, 236)' },
  },
}
