import styled from 'styled-components'

export const TextArea = styled.textarea`
    padding: 13px 10px 0px 15px;
    height: ${({ height }) => height};
    flex-basis: 100%;
    resize: none;
    border: 1px solid ${({ theme }) => theme.colors.stroke};
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.sizes.borderRadius}px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.font};
    &:focus {
        outline: none;
    }
`
