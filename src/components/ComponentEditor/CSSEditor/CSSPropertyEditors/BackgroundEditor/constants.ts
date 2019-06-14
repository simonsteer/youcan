import { DropdownSelectProps } from '../../../../Inputs/DropdownSelect'

interface BackgroundPropertyConfig {
  displayName: string
  dropdownProps: Omit<DropdownSelectProps<any>, 'onChange'>
}

export const BACKGROUND_PROPERTY_EDITORS: BackgroundPropertyConfig[] = [
  {
    displayName: 'image',
    dropdownProps: {
      options: [
        { label: 'none', value: 'none' },
        { label: 'upload image to app', value: 'upload' },
        { label: 'select image from app', value: 'select' },
      ],
      defaultValue: 'none',
    },
  },
  {
    displayName: 'position',
    dropdownProps: {
      options: [
        { label: 'left top', value: 'left top' },
        { label: 'left center', value: 'left center' },
        { label: 'left bottom', value: 'left bottom' },
        { label: 'right top', value: 'right top' },
        { label: 'right center', value: 'right center' },
        { label: 'right bottom', value: 'right bottom' },
        { label: 'center top', value: 'center top' },
        { label: 'center center', value: 'center center' },
        { label: 'center bottom', value: 'center bottom' },
      ],
      defaultValue: 'left top',
    },
  },
  {
    displayName: 'size',
    dropdownProps: {
      options: [
        { label: 'original', value: 'auto' },
        { label: 'fill container', value: 'cover' },
        { label: 'fit to container', value: 'contain' },
      ],
      defaultValue: 'auto',
    },
  },
  {
    displayName: 'repeat',
    dropdownProps: {
      options: [
        { label: 'repeat', value: 'repeat' },
        { label: 'repeat horizontally', value: 'repeat-x' },
        { label: 'repeat vertically', value: 'repeat-y' },
        { label: "don't repeat", value: 'no-repeat' },
      ],
      defaultValue: 'no-repeat',
    },
  },
  {
    displayName: 'attachment',
    dropdownProps: {
      options: [
        { label: 'scroll with page', value: 'scroll' },
        { label: 'fixed', value: 'fixed' },
      ],
      defaultValue: 'scroll',
    },
  },
]
