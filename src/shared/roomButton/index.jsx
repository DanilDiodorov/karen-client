import styled from 'styled-components'
import { BsChatLeft } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

export const RoomButton = ({
    children,
    canEdit,
    active,
    onClickDelete,
    onClickEdit,
    onClick,
}) => {
    return (
        <Main
            canEdit={canEdit}
            active={active}
            className="roomButtonMain"
            onClick={onClick}
        >
            <Block>
                <BsChatLeft />
                <Text>{children}</Text>
            </Block>
            <Actions canEdit={canEdit}>
                <EditIcon>
                    <AiFillEdit onClick={onClickEdit} />
                </EditIcon>
                <DeleteIcon>
                    <AiFillDelete onClick={onClickDelete} />
                </DeleteIcon>
            </Actions>
        </Main>
    )
}

const Main = styled.div`
    padding: 0 10px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    border-radius: ${({ theme }) => theme.sizes.borderRadius}px;
    border-left: 3px solid transparent;
    transition: all 0.1s ease-in-out;
    color: ${({ theme }) => theme.colors.font};

    background-color: ${({ theme, active }) =>
        active ? theme.colors.hovered : 'transparent'};
    border-left: 3px solid
        ${({ theme, active }) => (active ? theme.colors.purple : 'transparent')};

    &:hover {
        background-color: ${({ theme }) => theme.colors.hovered};
        cursor: pointer;
        border-left: 3px solid ${({ theme }) => theme.colors.purple};
    }

    &:hover span {
        display: ${({ canEdit }) => (canEdit ? 'flex' : 'none')};
        opacity: 1;
    }
`

const Text = styled.div`
    margin-left: 10px;
    text-decoration: none;
`

const Block = styled.div`
    display: flex;
    align-items: center;
`

const Actions = styled.span`
    display: none;
    align-items: center;
    opacity: 0;
    gap: 10px;

    @media ${({ theme }) => theme.media.large} {
        display: ${({ canEdit }) => (canEdit ? 'flex' : 'none')};
        opacity: 1;
        font-size: 20px;
    }
`

const DeleteIcon = styled.div`
    color: ${({ theme }) => theme.colors.danger};

    &:hover {
        color: ${({ theme }) => theme.colors.purple};
    }
`

const EditIcon = styled.div`
    &:hover {
        color: ${({ theme }) => theme.colors.purple};
    }
`
