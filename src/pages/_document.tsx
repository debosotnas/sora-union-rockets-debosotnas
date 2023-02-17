import { Html, Head, Main, NextScript } from 'next/document';
import CssBaselineMUI from '@mui/material/CssBaseline';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <CssBaselineMUI />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}