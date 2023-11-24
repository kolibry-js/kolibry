import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ImageLink from './ImageLink'

const dummyImageLink = {
  src: '/vite.svg',
  href: 'https://vitejs.dev/',
  alt: 'Vite logo',
}

describe('image Link Test', () => {
  it('should render vite image', () => {
    render(<ImageLink {...dummyImageLink} />)

    const image = screen.getByAltText('Vite logo')
    expect(image).toBeInTheDocument()
  })
})
