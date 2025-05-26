// src/components/__tests__/TestClubList.test.js
import { render, fireEvent } from '@testing-library/vue'
import ClubList from '@/components/ClubList.vue'
import { expect, test } from 'vitest'

// Mocking: falls router-link oder eine andere Komponente notwendig ist
const global = {
  components: {
    'router-link': {
      template: '<a><slot /></a>'
    }
  }
};

test('renders ClubList component and allows for club search', async () => {
  const { getByPlaceholderText } = render(ClubList, {
    global,
    props: { title: 'Teilnehmende Vereine an der FIFA Klub-WM 2025' }
  })

  // Überprüfen, ob das Eingabefeld für die Suche vorhanden ist
  const input = getByPlaceholderText('Verein suchen...')
  expect(input).toBeTruthy()

  // Füge einen Eingabeereignistest hinzu, um die Filterung zu simulieren
  await fireEvent.update(input, 'Bayern')
  expect(input.value).toBe('Bayern')
})
