import React, { Fragment, cloneElement, ReactElement, useState, useCallback } from 'react'
import get from 'lodash/get'
import Expandable, { ExpandableProps, ExpandableRenderProps } from './Expandable';

export interface AccordionMenuProps {
  children: React.ReactNode
  title?: React.ReactElement
  onOpen?: ExpandableProps['onOpen']
  onClose?: ExpandableProps['onClose']
  onChangeContentHeight?: ExpandableProps['onChangeContentHeight']
  zIndex?: number
}

const AccordionMenu = ({ children, title, onChangeContentHeight, onOpen, onClose, zIndex }: AccordionMenuProps) => {
  const [titleHeight, setTitleHeight] = useState(null)
  const measuredContentRef = useCallback(node => {
    if (node !== null) {
      setTitleHeight(node.getBoundingClientRect().height)
    }
  }, [])

  const transformedChildren = ({ setContentHeight, contentHeight }: ExpandableRenderProps) =>
  React.Children.map(children, child => {
    const type: string | 'AccordionMenu' = get(child, 'type.name') || get(child, 'type')
    return type === 'AccordionMenu'
      ? cloneElement(child as ReactElement<AccordionMenuProps>, {
          onOpen: (diff: number) => setContentHeight(contentHeight + diff),
          onClose: (diff: number) => setContentHeight(contentHeight + diff),
          onChangeContentHeight: (diff: number) => setContentHeight(contentHeight + diff),
        })
      : child
  })

  return <Expandable zIndex={zIndex} closedHeight={titleHeight || 0} onChangeContentHeight={onChangeContentHeight} onOpen={onOpen} onClose={onClose}>
    {expandable => (
      <Fragment>
        {title}
        {transformedChildren(expandable)}
      </Fragment>
    )}
  </Expandable>
}

export default AccordionMenu
