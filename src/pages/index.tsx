import Head from 'next/head';
import { Card, Col, Container, Row, Text, Button } from '@nextui-org/react';
import CreateRocketForm from '@/components/rocket-form/CreateRocketForm.component';
import { ReactElement } from 'react';
import RocketList from '@/components/rocket-list/RocketList.component';
import { RocketProvider } from "@/contexts/rockets.context";

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
          <Container gap={1} css={{ marginTop: 10 }} responsive={false}>
            <Row>
              <Col>
                <Card css={{ $$cardColor: '#fefefe' }}>
                  <Card.Body>
                    <RocketList />
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card css={{ $$cardColor: '#fefefe' }}>
                  <Card.Body>
                    <CreateRocketForm />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </RocketProvider>
      </main>
    </>
  )
}
