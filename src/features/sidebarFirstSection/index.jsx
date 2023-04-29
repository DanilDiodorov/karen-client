import styled from 'styled-components'
import { Button } from '../../shared/button'
import { useSelector } from 'react-redux'
import { AddRoomPopup } from '../addRoomPopup'
import { useState } from 'react'

export const SidebarFirstSection = () => {
    const [popupActive, setPopupActive] = useState(false)
    const user = useSelector((state) => state.user)
    return (
        <Main>
            {user.logged ? (
                <>
                    <AddRoomPopup
                        active={popupActive}
                        setActive={setPopupActive}
                    />
                    <Text>Новый чат</Text>
                    <Button
                        color="primary"
                        marginTop={20}
                        onClick={() => setPopupActive(true)}
                    >
                        Добавить чат
                    </Button>
                </>
            ) : (
                <></>
            )}
        </Main>
    )
}

const Main = styled.section`
    margin-top: 20px;

    @media ${({ theme }) => theme.media.large} {
        padding: 0 10px;
    }
`

const Text = styled.div``
