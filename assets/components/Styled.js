import styled from 'styled-components'

export const Wrapper = styled.div`
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.bgColor};
`

export const A = styled.a`
  color: ${props => props.theme.anchorColor};

  &:hover {
    color: ${props => props.theme.hoverColor};
  }
`

export const H1 = styled.h1`
  color: ${props => props.theme.textColor};
`
