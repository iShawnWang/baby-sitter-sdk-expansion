import { Button, Page, Code, Grid, Divider, Text } from "@geist-ui/core";

interface SampleBlockProps {
  title: string;
  code: string;
  onProduce: () => void;
}

const SampleBlock = ({ title, code, onProduce }: SampleBlockProps) => {
  return (
    <Grid xs={24} justify="center" alignItems="center">
      <Grid xs={4}>{title}</Grid>
      <Grid xs={8}>
        <pre>
          <Code>{code}</Code>
        </pre>
      </Grid>
      <Grid xs={2} alignItems="center" style={{ display: "flex" }}>
        <Button onClick={onProduce}>produce</Button>
      </Grid>
    </Grid>
  );
};

const App = () => {
  return (
    <Page
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid.Container gap={2} direction="column" justify="center">
        <Text h2>JS</Text>
        <Divider />
        <SampleBlock
          title="function call"
          code="NotExistFunc();"
          onProduce={() => {
            NotExistFunc();
          }}
        ></SampleBlock>
        <SampleBlock
          title="throw error"
          code="throw new Error('[example] throw new Error');"
          onProduce={() => {
            throw new Error("[example] throw new Error");
          }}
        ></SampleBlock>
        <SampleBlock
          title={"Try Catch"}
          code={`try {
  NotExistFunc();
} catch (error) {
  //TODO
  // Monitor.captureError(error)
}`}
          onProduce={() => {
            try {
              NotExistFunc();
            } catch (error) {
              // TODO
              // Monitor.captureError(error)
              console.error(error);
            }
          }}
        ></SampleBlock>
        <SampleBlock
          title={"Try Catch"}
          code={`Promise.reject("[example] Rejected Promise");`}
          onProduce={() => {
            Promise.reject("[example] Rejected Promise");
          }}
        ></SampleBlock>
        <Text h2>网络</Text>
        <Divider />
        <SampleBlock
          title={"200"}
          code={`fetch("https://httpstat.us/200");`}
          onProduce={() => {
            fetch("https://httpstat.us/200");
          }}
        ></SampleBlock>
        <SampleBlock
          title={"404"}
          code={`fetch("https://httpstat.us/404");`}
          onProduce={() => {
            fetch("https://httpstat.us/404");
          }}
        ></SampleBlock>
        <SampleBlock
          title={"500"}
          code={`fetch("https://httpstat.us/500");`}
          onProduce={() => {
            fetch("https://httpstat.us/500");
          }}
        ></SampleBlock>
        <SampleBlock
          title={"CORS"}
          code={`fetch("https://mock.codes/200", { method: "POST" });`}
          onProduce={() => {
            fetch("https://mock.codes/200", { method: "POST" });
          }}
        ></SampleBlock>
        <SampleBlock
          title={"Timeout"}
          code={`Promise.reject("[example] Rejected Promise");`}
          onProduce={() => {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), 2000);
            fetch("https://httpstat.us/200?sleep=5000", {
              signal: controller.signal,
            });
          }}
        ></SampleBlock>
        <Divider />
        <SampleBlock
          title={"XMLHttpRequest 200"}
          code={`var oReq = new XMLHttpRequest();
oReq.open("GET", "https://httpstat.us/200");
oReq.send();`}
          onProduce={() => {
            var oReq = new XMLHttpRequest();
            oReq.open("GET", "https://httpstat.us/200");
            oReq.send();
          }}
        ></SampleBlock>
        <SampleBlock
          title={"XMLHttpRequest Timeout"}
          code={`var oReq = new XMLHttpRequest();
oReq.timeout = 2000;
oReq.open("GET", "https://httpstat.us/200?sleep=5000");
oReq.send();`}
          onProduce={() => {
            var oReq = new XMLHttpRequest();
            oReq.timeout = 2000;
            oReq.open("GET", "https://httpstat.us/200?sleep=5000");
            oReq.send();
          }}
        ></SampleBlock>
        <SampleBlock
          title={"XMLHttpRequest Timeout"}
          code={`new WebSocket("ws://notexist");`}
          onProduce={() => {
            new WebSocket("ws://notexist");
          }}
        ></SampleBlock>
        <Text h2>资源</Text>
        <Divider />
        <SampleBlock
          title={"Script"}
          code={`const script = document.createElement("script");
script.src = "https://a.com/a.js";
document.body.append(script);`}
          onProduce={() => {
            const script = document.createElement("script");
            script.src = "https://a/notexist.js";
            document.body.append(script);
          }}
        ></SampleBlock>
        <SampleBlock
          title={"Link"}
          code={`const css = document.createElement("link");
css.type = "text/css";
css.rel = "stylesheet";
css.href = "/notexist.css";
document.head.appendChild(css);`}
          onProduce={() => {
            const css = document.createElement("link");
            css.type = "text/css";
            css.rel = "stylesheet";
            css.href = "https://a/notexist.css";
            document.head.appendChild(css);
          }}
        ></SampleBlock>
        <SampleBlock
          title={"img"}
          code={`const img = document.createElement("img");
img.src = "https://a/a.png";
document.body.appendChild(img);`}
          onProduce={() => {
            const img = document.createElement("img");
            img.src = "https://a/a.png";
            img.onerror = () => {
              img.parentNode?.removeChild(img);
            };
            document.body.appendChild(img);
          }}
        ></SampleBlock>
        <SampleBlock
          title={"iframe"}
          code={`const iframe = document.createElement("iframe");
iframe.src = "https://a.com";
document.body.appendChild(iframe);`}
          onProduce={() => {
            const iframe = document.createElement("iframe");
            iframe.src = "https://a.com";
            iframe.onload = (e) => {
              // 如何判断 iframe 加载失败 ? 如 404
              iframe.parentNode?.removeChild(iframe);
            };
            document.body.appendChild(iframe);
          }}
        ></SampleBlock>
      </Grid.Container>
    </Page>
  );
};

export default App;

declare function NotExistFunc(): () => void;
