import styled from 'styled-components'
import { ProfileInfo } from '../../shared/profileInfo'
import { FiSettings } from 'react-icons/fi'
import { MdDarkMode } from 'react-icons/md'
import { BiLogOut, BiLogIn } from 'react-icons/bi'

import { FooterButton } from '../../shared/footerButton'
import { useDispatch, useSelector } from 'react-redux'
import { RouteLink } from '../../shared/routeLink'
import { closeMenu, setDark } from '../../store/slices/userSlice'
import { auth } from '../../firebase'
import { ConfirmPopup } from '../../shared/confirmPopup'
import { useState } from 'react'

export const SidebarFooter = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [popupActive, setPopupActive] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const darkState = (state) => {
        if (typeof state == 'boolean') dispatch(setDark(state))
    }

    const exitHandler = () => {
        setPopupActive(true)
    }

    const confirmDelete = async () => {
        setDeleteLoading(true)
        await auth.signOut()
        setDeleteLoading(false)
        setPopupActive(false)
    }

    const onCancel = () => {
        setPopupActive(false)
    }

    return (
        <Main>
            <ConfirmPopup
                text={'Вы действительно хотите выйти?'}
                onOk={() => confirmDelete()}
                title="Выход"
                active={popupActive}
                onCancel={() => onCancel()}
                loading={deleteLoading}
            />
            <ProfileInfo
                def={user.ava === null ? true : false}
                ava={user.ava}
                name={user.name}
                text={user.statusText}
            />
            <Block>
                {user.logged ? (
                    <FooterButton
                        Icon={FiSettings}
                        text={'Настройки'}
                        type={true}
                    />
                ) : (
                    <></>
                )}

                <FooterButton
                    Icon={MdDarkMode}
                    text={'Темный режим'}
                    type={false}
                    onClick={darkState}
                    toggled={user.dark}
                />
                {user.logged ? (
                    <FooterButton
                        onClick={() => exitHandler()}
                        Icon={BiLogOut}
                        text={'Выйти'}
                        type={true}
                    />
                ) : (
                    <RouteLink
                        to="/login"
                        onClick={() => dispatch(closeMenu())}
                    >
                        <FooterButton
                            Icon={BiLogIn}
                            text={'Войти'}
                            type={true}
                        />
                    </RouteLink>
                )}
            </Block>
        </Main>
    )
}

const Main = styled.section`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #c0c0c0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;

    @media ${({ theme }) => theme.media.large} {
        padding: 20px 10px 0 10px;
    }
`

const Block = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
