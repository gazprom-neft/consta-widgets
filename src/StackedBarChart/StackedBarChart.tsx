import React from 'react'

import {
  getGroupsDomain,
  getValuesDomain,
  isShowReversed,
} from '@/__private__/components/CoreBarChart/helpers'
import { defaultRenderGroup } from '@/__private__/components/CoreBarChart/renders'
import {
  CoreBarChart,
  OnMouseEventColumn,
  Threshold,
} from '@/__private__/components/CoreBarChart/CoreBarChart'
import { FormatGroupName, FormatValue } from '@/__private__/types'
import { getMaxOfArray } from '@/BarChart/helpers'

import {
  getColumnsLengthArray,
  getMaxNumberGroupsArray,
  transformGroupsToCommonGroups,
} from './helpers'

export type ColumnItem = {
  value: number | undefined
  color: string
}

export type Column = readonly ColumnItem[]

export type Group = {
  groupName: string
  values: ReadonlyArray<Column | undefined | null>
}

type Props = {
  groups: readonly Group[]
  unit?: string
  showValues?: boolean
  isHorizontal?: boolean
  threshold?: Threshold
  formatValueForLabel?: FormatValue
  formatValueForTooltip?: FormatValue
  formatGroupName?: FormatGroupName
  isXAxisLabelsSlanted?: boolean
  min?: number
  max?: number
  showGrid?: boolean
  showGuide?: boolean
  showGroupsLabels?: boolean
  limitMinimumStepSize?: boolean
  gridConfig?: number
  onMouseClickColumn?: OnMouseEventColumn
}

export const StackedBarChart: React.FC<Props> = props => {
  const { groups, threshold, showValues, min, max, formatGroupName, ...rest } = props

  const commonGroups = transformGroupsToCommonGroups(groups)
  const showReversed = isShowReversed({ groups: commonGroups, threshold: props.threshold })
  const groupsDomain = getGroupsDomain(commonGroups)
  const valuesDomain = getValuesDomain({
    groups: commonGroups,
    min,
    max,
    threshold: props.threshold,
  })

  const groupTotalArray = getColumnsLengthArray(commonGroups)
  const maxGroupTotalLength = getMaxOfArray(groupTotalArray)

  const maxNumberGroupsArray = getMaxNumberGroupsArray(commonGroups)
  const maxNumberGroups = getMaxOfArray(maxNumberGroupsArray)

  return (
    <CoreBarChart
      {...rest}
      groups={commonGroups}
      groupsDomain={groupsDomain}
      valuesDomain={valuesDomain}
      showValues={showValues}
      showReversed={showReversed}
      threshold={threshold}
      renderGroup={defaultRenderGroup}
      maxNumberGroups={maxNumberGroups}
      maxColumnLength={maxGroupTotalLength}
      formatGroupName={formatGroupName}
    />
  )
}
