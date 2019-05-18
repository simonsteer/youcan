import React from 'react'
import Requester, { RequesterProps } from './Requester'

export default Requester

interface CustomRequesterProps
  extends Pick<RequesterProps, Exclude<keyof RequesterProps, 'method'>> {}

export const Deleter = (props: CustomRequesterProps) => (
  <Requester method="delete" {...props} />
)

export const Getter = (props: CustomRequesterProps) => (
  <Requester method="get" {...props} />
)

export const Putter = (props: CustomRequesterProps) => (
  <Requester method="put" {...props} />
)

export const Poster = (props: CustomRequesterProps) => (
  <Requester method="post" {...props} />
)

export const Patcher = (props: CustomRequesterProps) => (
  <Requester method="patch" {...props} />
)
