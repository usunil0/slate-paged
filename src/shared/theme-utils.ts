const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#0cf'
      }
    }
  }
}

export const getTheme = () => {
  return theme
}
