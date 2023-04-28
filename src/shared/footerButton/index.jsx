import styled from 'styled-components'
import { Switch } from '../switch'
import { useEffect, useState } from 'react'

export const FooterButton = ({
    Icon = null,
    danger = false,
    border = false,
    text,
    type = true,
    onClick,
    toggled,
}) => {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        onClick(!isToggled)
    }

    useEffect(() => {
        toggle(toggled)
    }, [toggled])

    return (
        <Main type={type} border={border} onClick={type ? onClick : callback}>
            <Block>
                <IconBlock danger={danger}>
                    {Icon !== null ? <Icon /> : <></>}
                </IconBlock>
                <Text>{text}</Text>
            </Block>
            {!type ? <Switch toggled={isToggled} /> : <></>}
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    gap: 15px;
    align-items: center;
    border-radius: ${({ theme }) => theme.sizes.borderRadius}px;
    border: 1px solid
        ${({ theme, border }) => (border ? theme.colors.stroke : 'transparent')};
    &:hover {
        background-color: ${({ theme, type }) =>
            type ? theme.colors.hovered : 'transparent'};
        cursor: pointer;
    }
`

const Block = styled.div`
    display: flex;
    align-items: center;
`

const Text = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
`

const IconBlock = styled.span`
    color: ${({ danger, theme }) =>
        danger ? theme.colors.danger : theme.colors.font};
    display: flex;
    align-items: center;
`
