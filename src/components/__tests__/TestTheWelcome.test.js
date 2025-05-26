// src/components/__tests__/TestTheWelcome.test.js
import { render } from '@testing-library/vue'
import TheWelcome from '@/components/TheWelcome.vue'
import { expect, test } from 'vitest'

// Erstelle ein globales Mock für die Vue-Router-Komponente
const global = {
  components: {
    'router-link': {
      template: '<a><slot /></a>' // Stellt den router-link als einfaches <a>-Element dar
    }
  }
};

test('renders TheWelcome component', () => {
  const { getByText } = render(TheWelcome, {
    global, // Verwende die global-Einstellung für globale Mocked-Komponenten
    props: { title: 'Willkommen auf der HTW-WebTech-KlubWM-Website' }
  })
  expect(getByText('Willkommen auf der HTW-WebTech-KlubWM-Website')).toBeTruthy()
})

