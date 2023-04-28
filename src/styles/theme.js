const baseTheme = {
    media: {
        extraLarge: '(max-width: 1140px)',
        large: '(max-width: 960px)',
        medium: '(max-width: 720px)',
        small: '(max-width: 540px)',
    },

    // in px
    sizes: {
        sideBar: { width: 300 },
        borderRadius: 7,
        main: { height: window.innerHeight },
    },
}

export const darkTheme = {
    colors: {
        primary: '#1C1F37',
        purple: '#5841D9',
        dark: '0F172A',
        hovered: '#252A43',
        hovered2: '#2C216E',
        danger: '#F94C4C ',
        stroke: '#252626',

        popup: '#252A43',
        bgMain: '#141627',
        bgMessage: '#141627',
        bgSideBar: '#141627',
        font: '#FFFFFF',
        menuFont: '#ECECEC',
    },
    ...baseTheme,
}

export const lightTheme = {
    colors: {
        primary: '#fff',
        purple: '#5990FF',
        dark: '0F172A',
        hovered: '#C0C0C0',
        hovered2: '#C0C0C0',
        danger: '#F94C4C ',
        stroke: '#ADADAD',

        popup: '#fff',
        bgMain: '#E5E5E5',
        bgMessage: '#FFFFFF',
        bgSideBar: '#FFFFFF',
        font: '#0F172A',
        menuFont: '#64748B',
    },
    ...baseTheme,
}
