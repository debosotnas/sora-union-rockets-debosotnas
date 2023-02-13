import { ReactElement } from 'react';
import Head from 'next/head';
import { Grid } from '@nextui-org/react';
import CreateRocketForm from '@/components/rocket-form/CreateRocketForm.component';
import RocketListContainer from '@/components/rocket-list/RocketListContainer.component';
import { RocketProvider } from "@/contexts/rockets.context";
import styles from '@/styles/Home.module.scss';

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
        <RocketProvider>
          <Grid.Container className={styles.gridContainer} justify="center" wrap='wrap-reverse'>
              <Grid className={styles.leftGridContainer} xs={10} sm={6}>
                  <RocketListContainer />
              </Grid>
              <Grid className={styles.rightGridContainer} xs={10} sm={4}>
                  <CreateRocketForm />
              </Grid>
          </Grid.Container>
        </RocketProvider>
      </main>
    </>
  )
}
