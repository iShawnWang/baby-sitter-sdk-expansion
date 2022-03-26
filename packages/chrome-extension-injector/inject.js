const domScript = document.createElement("script");
domScript.src = chrome.runtime.getURL("monitor.js");
domScript.charset = "UTF-8";
domScript.onload = async () => {
  console.log("Seraph SDK Init Success !");
};

document.body.appendChild(domScript);
