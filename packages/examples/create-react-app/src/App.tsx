import { Button, Page, Code, Grid } from "@geist-ui/core";
function App() {
  return (
    <Page
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid.Container gap={2} justify="center">
        <Grid>
          <pre>
            <Code>throw new Error("[example] throw new Error");</Code>
          </pre>
        </Grid>
        <Grid alignItems="center" style={{ display: "flex" }}>
          <Button
            onClick={() => {
              throw new Error("[example] throw new Error");
            }}
          >
            produce
          </Button>
        </Grid>
      </Grid.Container>
    </Page>
  );
}

export default App;
