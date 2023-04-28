import styled from 'styled-components'

export const Switch = ({ toggled = false }) => {
    return (
        <Main>
            <Input type="checkbox" checked={toggled} />
            <Span />
        </Main>
    )
}

const Main = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
`

const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;

    &:checked + span {
        background-color: ${({ theme }) => theme.colors.purple};
    }

    :checked + span:before {
        transform: translateX(29px);
    }
`

const Span = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.hovered};
    transition: 0.3s;
    border-radius: 30px;

    &::before {
        position: absolute;
        content: '';
        height: 25px;
        width: 25px;
        left: 3px;
        bottom: 2.6px;
        background-color: #fff;
        border-radius: 50%;
        transition: 0.3s;
    }
`
