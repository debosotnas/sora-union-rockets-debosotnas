import { ReactElement } from 'react';
import Head from 'next/head';
// import { Grid } from '@nextui-org/react';
import CreateRocketForm from '@/components/rocket-forms/CreateRocketForm.component';
import RocketListContainer from '@/components/rocket-list/RocketListContainer.component';
import { RocketProvider } from "@/contexts/rockets.context";
import { Grid } from '@mui/material';
import { GlobalsProvider } from '@/contexts/globals.context';

export default function Home(): ReactElement {

  return (
    <>
      <Head>
        <title>Sora Take Home</title>
        <meta name="description" content="Sora Take Home App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <GlobalsProvider>
          <RocketProvider>
            <Grid container spacing={2} wrap='wrap-reverse' sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <RocketListContainer />
              </Grid>
              <Grid item xs={12} md={6}>
                <CreateRocketForm />
              </Grid>
            </Grid>
          </RocketProvider>
        </GlobalsProvider>
      </main>
    </>
  )
}
