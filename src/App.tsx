import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import ImageLink from './components/ImageLink'
import { HOME_LINKS } from './constants'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export default function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count => count + 1)
  }

  return (
    <Root>
      <div>
        {
          HOME_LINKS.map(imageLink => (
            <StyledImageLink key={imageLink.alt} {...imageLink} />
          ))
        }
      </div>
      <h1>Developed with Vite, React, Styled Components, and Vitest, complemented by TypeScript.</h1>
      <Card>
        <button type="button" onClick={handleClick}>
          count is
          {' '}
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </Card>
      <ReadTheDocs>
        Click on the logos to learn more about the technologies used in this template
      </ReadTheDocs>
      <div>
        <p>
          Use this
          {' '}
          <a href="https://github.com/nyxb/vite-template-react" target="_blank" rel="noreferrer">template</a>
        </p>
        <p>
          Follow me at
          {' '}
          <a href="https://github.com/nyxb" target="_blank" rel="noreferrer">github</a>
        </p>
        <p>
          Look at my other projects at
          {' '}
          <a href="https://nyxb.nexus/projects" target="_blank" rel="noreferrer">nyxb</a>
        </p>
      </div>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  min-height: 100vh;
`

const StyledImageLink = styled(ImageLink)`
  img {
    height: 6em; // Stellt sicher, dass alle Bilder diese Höhe haben
  }
  padding: 1.5em;
  will-change: filter;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }

  &:nth-child(4) img {
    animation: ${spin} infinite 20s linear;
  }
`

const Card = styled.div`
  padding: 2em;
`

const ReadTheDocs = styled.p`
  color: #888;
`
