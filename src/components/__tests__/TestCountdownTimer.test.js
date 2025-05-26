// src/components/__tests__/TestCountdownTimer.test.js
import { render } from '@testing-library/vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import { describe, test, expect } from 'vitest'

describe('CountdownTimer Component', () => {
  test('renders CountdownTimer component and displays countdown', () => {
    const { getByText } = render(CountdownTimer, {
      props: { title: 'Countdowns zur FIFA Klub-WM' }
    })

    expect(getByText('Countdowns zur FIFA Klub-WM')).toBeTruthy()

  })
})
