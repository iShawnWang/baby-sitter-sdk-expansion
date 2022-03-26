import type { NextPage } from "next";
import Script from "next/script";
import { useState } from "react";
import { SourceMapConsumer, NullableMappedPosition } from "source-map";

declare var sourceMap: {
  SourceMapConsumer: typeof SourceMapConsumer & { initialize: any };
};

export const sourceMapDeal = async (
  rawSourceMap: any,
  line: number,
  column: number
) => {
  // 通过sourceMap库转换为sourceMapConsumer对象
  const result = await sourceMap.SourceMapConsumer.with(
    rawSourceMap,
    null,
    async (consumer) => {
      const sm = consumer.originalPositionFor({
        line,
        column,
      });
      return sm;
    }
  );
  console.log(result);
  return result;
};

const Home: NextPage = () => {
  const [state, setState] = useState<{
    sourceMap: any;
    line: string;
    column: string;
  }>({ sourceMap: null, line: "", column: "" });
  const [result, setResult] = useState<NullableMappedPosition | null>(null);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
      }}
    >
      <Script
        onLoad={() => {
          sourceMap.SourceMapConsumer.initialize({
            "lib/mappings.wasm":
              "https://unpkg.com/source-map@0.7.3/lib/mappings.wasm",
          });
        }}
        src="https://unpkg.com/source-map@0.7.3/dist/source-map.js"
      ></Script>
      <input
        type={"file"}
        style={{ marginBottom: 24, width: "24vw" }}
        onChange={(e) => {
          if ((e?.currentTarget?.files?.length || 0) <= 0) {
            return;
          }
          const file = e?.currentTarget?.files?.[0];
          var reader = new FileReader();

          reader.onload = function (evt) {
            if (evt.target?.readyState != 2) return;
            if (evt.target?.error) {
              alert("Error while reading file");
              return;
            }

            if (evt.target.result) {
              setState({
                ...state,
                sourceMap: JSON.parse(evt.target.result as string),
              });
            }
          };

          if (!file) {
            return;
          }
          reader.readAsText(file);
        }}
      ></input>
      <div style={{ display: "flex", marginBottom: 24 }}>
        <input
          placeholder="行"
          style={{ width: "11vw" }}
          onChange={(e) => {
            setState({ ...state, line: e.currentTarget.value });
          }}
        ></input>
        <input
          placeholder="列"
          style={{ marginLeft: "2vw", width: "11vw" }}
          onChange={(e) => {
            setState({ ...state, column: e.currentTarget.value });
          }}
        ></input>
      </div>
      <button
        style={{ width: "8vw" }}
        onClick={async () => {
          if (!state.sourceMap || !state.line || !state.column) {
            alert("Please fill the infomation ~");
            return;
          }

          const result = await sourceMapDeal(
            state.sourceMap,
            Number(state.line),
            Number(state.column)
          );
          setResult(result);
        }}
      >
        Go
      </button>
      {result && (
        <pre style={{ marginTop: "6vh" }}>
          <code>{JSON.stringify(result, null, 4)}</code>
        </pre>
      )}
    </div>
  );
};

export default Home;
