import styled from 'styled-components'
import { AiOutlineClose } from 'react-icons/ai'
import { Button } from '../button'

export const Popup = ({
    active,
    title,
    children,
    loading = false,
    onOk,
    onCancel,
    type,
}) => {
    const clickHandler = (e) => {
        e.stopPropagation()
    }

    return (
        <PopupBG isActive={active} onClick={() => onCancel()}>
            <PopupMain type={type} onClick={clickHandler}>
                <PopupHeader>
                    <h3>{title}</h3>
                    <Icon onClick={() => onCancel()} loading={loading}>
                        <AiOutlineClose />
                    </Icon>
                </PopupHeader>
                <PopupContent>{children}</PopupContent>
                <PopupFooter>
                    <PopupCloseButton>
                        <PopupCloseButtonText
                            onClick={() => onCancel()}
                            loading={loading}
                        >
                            Отмена
                        </PopupCloseButtonText>
                    </PopupCloseButton>
                    <Button
                        width="100"
                        color="primary"
                        onClick={onOk}
                        active={!loading}
                        loading={loading}
                    >
                        Ok
                    </Button>
                </PopupFooter>
            </PopupMain>
        </PopupBG>
    )
}

const PopupBG = styled.div`
    z-index: 200;
    position: fixed;
    display: ${(props) => (props.isActive ? 'flex' : 'none')};
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-items: center;
    z-index: 100;
    pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};
`
const PopupMain = styled.div`
    width: ${({ type }) => (type === 'confirm' ? '650' : '800')}px;
    height: auto;
    background-color: ${({ theme }) => theme.colors.popup};
    border-radius: ${({ theme }) => theme.sizes.borderRadius}px;
    z-index: 250;

    @media ${({ theme }) => theme.media.large} {
        width: 90vw;
    }
`

const PopupCloseButton = styled.div`
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PopupCloseButtonText = styled.a`
    color: ${({ theme }) => theme.colors.font};
    text-decoration: none;
    pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};
    &:hover {
        cursor: ${({ loading }) => (loading ? 'auto' : 'pointer')};
        color: grey;
    }
`

const PopupHeader = styled.div`
    border-bottom: 1px solid grey;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${({ theme }) => theme.media.large} {
        padding: 0 10px;
    }
`
const Icon = styled.div`
    font-size: 20px;
    color: grey;
    margin-top: 8px;
    pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};
    &:hover {
        cursor: ${({ loading }) => (loading ? 'auto' : 'pointer')};
        color: grey;
    }
`
const PopupContent = styled.div`
    font-size: 18px;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media ${({ theme }) => theme.media.large} {
        padding: 20px 10px;
    }
`
const PopupFooter = styled.div`
    padding: 0 20px 20px 0;
    display: flex;
    justify-content: flex-end;

    @media ${({ theme }) => theme.media.large} {
        padding: 0 10px 10px 0;
    }
`
