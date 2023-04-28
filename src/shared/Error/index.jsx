import styled from 'styled-components'

export const Error = styled.div`
    color: white;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.danger};
    border-radius: ${({ theme }) => theme.sizes.borderRadius}px;
`
