import React from 'react'

import { Example } from '@/__private__/storybook'

import { Legend } from '../../Legend'

export const LegendExampleText = () => (
  <Example>
    <Legend
      direction="column"
      items={[
        {
          color: 'var(--color-bg-alert)',
          text: 'Эта линия красивая красная',
        },
        {
          color: 'var(--color-bg-normal)',
          text: 'Эта линия красивая синяя',
        },
        {
          color: 'var(--color-bg-warning)',
          text: 'Эта линия — вообще супер, и, кстати, она желтая',
        },
        {
          color: 'var(--color-bg-success)',
          text: 'Эта линия зеленая',
        },
      ]}
      icon="dot"
      size="s"
      getItemColor={item => item.color}
      getItemLabel={item => item.text}
    />
  </Example>
)
