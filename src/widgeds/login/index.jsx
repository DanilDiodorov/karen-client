import styled from 'styled-components'
import { Input } from '../../shared/input'
import { Button } from '../../shared/button'
import {
    browserLocalPersistence,
    browserSessionPersistence,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { useRef, useState } from 'react'
import { auth } from '../../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { Error } from '../../shared/Error'
import { MdMenu } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { openMenu } from '../../store/slices/userSlice'

export const Login = () => {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const clickHandler = () => {
        const email = emailRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        if (email !== '' && password !== '') {
            setLoading(true)
            setPersistence(
                auth,
                remember ? browserLocalPersistence : browserSessionPersistence
            )
                .then(async () => {
                    return signInWithEmailAndPassword(auth, email, password)
                        .then(() => {
                            setLoading(false)
                            return navigate('/')
                        })
                        .catch((e) => {
                            setLoading(false)
                            console.log(e)
                            setError('Неверные данные')
                        })
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })
        } else {
            setError('Заполните все поля')
        }
    }

    return (
        <Main>
            <Header>
                <HeaderLeft onClick={() => dispatch(openMenu())}>
                    <MdMenu />
                </HeaderLeft>
                <HeaderRight>
                    <Link to="/signin">Регистрация</Link>
                </HeaderRight>
            </Header>
            <Form>
                <Title>Вход</Title>
                {error !== '' ? <Error>{error}</Error> : <></>}
                <Input
                    type="email"
                    required
                    ref={emailRef}
                    placeholder="E-mail"
                />
                <Input
                    required
                    type="password"
                    ref={passwordRef}
                    placeholder="Пароль"
                />
                <Button
                    color="primary"
                    onClick={() => clickHandler()}
                    loading={loading}
                    active={!loading}
                >
                    Войти
                </Button>
                <Block>
                    <CheckboxBlock>
                        <Checkbox
                            type="checkbox"
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        Запомнить меня
                    </CheckboxBlock>
                    <RegBlock>Забыл пароль</RegBlock>
                </Block>
                <FooterBlock>
                    <Link to="/signin">Регистрация</Link>
                </FooterBlock>
            </Form>
        </Main>
    )
}

const Main = styled.div`
    background-color: ${({ theme }) => theme.colors.bgMain};
    flex-basis: 100%;
    padding: 0 0 20px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;

    @media ${({ theme }) => theme.media.large} {
        width: 100vw;
        height: 100vh;
        padding: 0px;
        flex-direction: column;
        justify-content: flex-start;
    }
`

const Header = styled.div`
    display: none;
    width: 100%;
    height: 70px;
    align-items: center;
    font-size: 40px;
    justify-content: space-between;

    @media ${({ theme }) => theme.media.large} {
        display: flex;
    }
`

const HeaderLeft = styled.div`
    margin-left: 10px;
`

const HeaderRight = styled.div`
    margin-right: 10px;
    font-size: 18px;
`

const Form = styled.div`
    display: flex;
    gap: 15px;
    flex-direction: column;
    width: 400px;

    @media ${({ theme }) => theme.media.large} {
        width: 90%;
        margin-top: 20%;
    }
`

const Title = styled.div`
    text-align: center;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
`

const Block = styled.div`
    display: flex;
    justify-content: space-between;
`
const RegBlock = styled.div``

const FooterBlock = styled.div`
    display: flex;
    justify-content: center;

    @media ${({ theme }) => theme.media.large} {
        display: none;
    }
`
const Checkbox = styled.input`
    width: 20px;
    height: 20px;
`
const CheckboxBlock = styled.label`
    display: flex;
    align-items: center;
    gap: 5px;
`
