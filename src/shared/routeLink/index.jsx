import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const RouteLink = styled(Link)`
    color: ${({ theme }) => theme.colors.font};
    text-decoration: none;
`
