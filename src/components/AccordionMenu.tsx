import React, { cloneElement, ReactElement, Fragment } from 'react'
import get from 'lodash/get'
import Expandable, {
  ExpandableProps,
  ExpandableRenderProps,
} from './Expandable'
import { Arrow, DropdownArrowProps } from './Inputs/DropdownSelect'

export interface AccordionMenuProps {
  children: ExpandableProps['children']
  title?: ExpandableProps['title']
  onOpen?: ExpandableProps['onOpen']
  onClose?: ExpandableProps['onClose']
  zIndex?: number
  arrow?: Pick<DropdownArrowProps, 'position' | 'size'>
}

const AccordionMenu = ({
  children,
  title,
  onOpen,
  onClose,
  zIndex,
  arrow,
}: AccordionMenuProps) => {
  const transformedChildren = ({
    setContentHeight,
    contentHeight,
  }: ExpandableRenderProps) =>
    React.Children.map(children, child => {
      const type: string | 'AccordionMenu' =
        get(child, 'type.name') || get(child, 'type')
      return type === 'AccordionMenu'
        ? cloneElement(child as ReactElement<AccordionMenuProps>, {
            onOpen: (diff: number) => setContentHeight(contentHeight + diff),
            onClose: (diff: number) => setContentHeight(contentHeight + diff),
          })
        : child
    })

  return (
    <Expandable zIndex={zIndex} title={title} onOpen={onOpen} onClose={onClose}>
      {expandable => (
        <Fragment>
          {transformedChildren(expandable)}
          {!!arrow && <Arrow isOpen={expandable.isOpen} {...arrow} />}
        </Fragment>
      )}
    </Expandable>
  )
}

export default AccordionMenu
