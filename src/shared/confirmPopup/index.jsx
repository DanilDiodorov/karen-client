import { Popup } from '../popup'

export const ConfirmPopup = ({
    onOk,
    text,
    active,
    title,
    onCancel,
    loading,
}) => {
    return (
        <Popup
            active={active}
            title={title}
            onOk={onOk}
            type={'confirm'}
            loading={loading}
            onCancel={() => onCancel()}
        >
            <div>{text}</div>
        </Popup>
    )
}
