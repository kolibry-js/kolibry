import { render, screen } from '@testing-library/react'
import Avatar from './Avatar'

describe('avatar Tests', () => {
  it('should render avatar', () => {
    render(<Avatar />)

    const element = screen.getByText('Avatar')
    expect(element.textContent).toBe('Avatar')
  })
})
