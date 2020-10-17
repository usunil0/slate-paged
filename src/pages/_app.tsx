import { AppProps } from 'next/app'
import React from 'react'

import { ThemeProvider } from 'theme-ui'

import { getTheme } from '../shared/theme-utils'

import '../assets/theme.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={getTheme()}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
