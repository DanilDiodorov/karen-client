import styled from 'styled-components'
import Loader from '../loader'

export const Button = ({
    children,
    color,
    width,
    marginTop = 0,
    marginLeft = 0,
    active = true,
    onClick,
    loading = false,
}) => {
    return (
        <Main
            color={color}
            width={width}
            marginTop={marginTop}
            marginLeft={marginLeft}
            active={active}
            onClick={onClick}
        >
            {loading ? <Loader /> : children}
        </Main>
    )
}

const Main = styled.button`
    background-color: ${({ theme, color, active }) =>
        active
            ? color === 'primary'
                ? theme.colors.purple
                : 'transparent'
            : theme.colors.hovered2};
    color: ${({ theme, color }) =>
        color === 'primary' ? 'white' : theme.colors.font};
    width: ${({ width }) => (width ? width + 'px' : '100%')};
    padding: 10px 0;
    border: none;
    border-radius: ${({ theme }) => theme.sizes.borderRadius}px;
    transition: all 0.1s ease-in-out;
    margin-top: ${({ marginTop }) => marginTop}px;
    margin-left: ${({ marginLeft }) => marginLeft}px;
    pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: ${({ theme, color }) =>
            color === 'primary' ? theme.colors.hovered2 : 'transparent'};
        cursor: pointer;
    }
`
