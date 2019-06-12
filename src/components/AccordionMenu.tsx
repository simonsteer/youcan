import React, { cloneElement, ReactElement, Fragment } from 'react'
import get from 'lodash/get'
import Expandable, {
  ExpandableProps,
  ExpandableRenderProps,
} from './Expandable'
import { Arrow, DropdownArrowProps } from './Inputs/DropdownSelect'
import { FlexProps } from './Flex/Flex'

export interface AccordionMenuProps extends FlexProps {
  children: ExpandableProps['children']
  title?: ExpandableProps['title']
  onOpen?: ExpandableProps['onOpen']
  onClose?: ExpandableProps['onClose']
  arrow?: Pick<DropdownArrowProps, 'position' | 'size'>
  startOpen?: boolean
}

const AccordionMenu = ({
  children,
  title,
  onOpen,
  onClose,
  arrow,
  startOpen,
  ...flexProps
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
    <Expandable
      {...flexProps}
      title={title}
      onOpen={onOpen}
      onClose={onClose}
      startOpen={startOpen}
    >
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
