import React, { useState, useRef } from 'react'
import CSSEditor from './CSSEditor'
import Flex from '../Flex'
import CustomComponent from './CustomComponent'

const ComponentEditor = () => {
  const [componentStyle, setComponentStyle] = useState({
    width: '200px',
    height: '200px',
    background: 'cornflowerblue',
  })
  const [isSelected, setIsSelected] = useState(false)
  const ref = useRef(null)

  const cursor = isSelected ? 'auto' : 'pointer'

  return (
    <Flex as="main" center flex={1} height="100vh" overflow="scroll">
      <CSSEditor
        onChange={nextStyle => setComponentStyle({ ...componentStyle, ...nextStyle })
        }
      />
      <CustomComponent
        props={{
          onClick: () => {
            setIsSelected(!isSelected)
            console.log({ ref })
          },
          mergeStyleProps: false,
          cursor,
          after: isSelected
            ? {
                width: '100%',
                height: '100%',
                position: 'absolute',
                border: '3px dotted white',
                zIndex: 99,
                mixBlendMode: 'difference',
              }
            : undefined,
          ...componentStyle,
          position: 'relative',
        }}
      />
    </Flex>
  )
}

export default ComponentEditor
