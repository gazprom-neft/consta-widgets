import { Data } from '@/__private__/components/CoreDonutChart/helpers'

import {
  DUMMY_ARC_NAME,
  filterComputedData,
  getComputedData,
  getDiffsByTotalFromCircles,
  getTotalByCircle,
} from '../helpers'

describe('filterComputedData', () => {
  it('фильтрует генерируемые данные', () => {
    const received = filterComputedData({
      name: DUMMY_ARC_NAME,
      color: 'green',
      value: 0,
    })

    expect(received).toBeFalse()
  })

  it('не фильтрует обычные данные', () => {
    const received = filterComputedData({
      name: 'Item 1',
      color: 'red',
      value: 0,
    })

    expect(received).toBeTrue()
  })
})

describe('getComputedData', () => {
  const BASE_ITEMS: readonly Data[] = [
    {
      name: 'Item 1',
      color: 'red',
      values: [1, 2, 3],
    },
  ]

  it('получение вычисляемых данных', () => {
    const received = getComputedData(BASE_ITEMS)

    expect(received).toEqual(BASE_ITEMS)
  })

  it('получение вычисляемых данных с пустыми максимальными значениями кругов', () => {
    const received = getComputedData(BASE_ITEMS, [])

    expect(received).toEqual(BASE_ITEMS)
  })

  it('получение вычисляемых данных с максимальными значениями кругов', () => {
    const received = getComputedData(BASE_ITEMS, [2])

    expect(received).toEqual([
      ...BASE_ITEMS,
      {
        name: DUMMY_ARC_NAME,
        color: 'var(--color-control-bg-disable)',
        values: [1, 0, 0],
      },
    ])
  })
})

describe('getDiffsByTotalFromCircles', () => {
  it('получение различий в значениях если данные и максимальные значения пустые', () => {
    const received = getDiffsByTotalFromCircles([], [])

    expect(received).toEqual([])
  })

  it('получение различий в значениях между данными и максимальными значениями', () => {
    const received = getDiffsByTotalFromCircles([5, 2], [1, 4])

    expect(received).toEqual([0, 2])
  })
})

describe('getTotalByCircle', () => {
  it('получение максимальных значений по кругам', () => {
    const received = getTotalByCircle([
      { name: 'Item 1', color: 'red', values: [null, 2, 3] },
      { name: 'Item 3', color: 'blue', values: [4, 5, 6] },
      { name: 'Item 4', color: 'green', values: [7, 8, 9] },
    ])

    expect(received).toEqual([11, 15, 18])
  })
})
