const env = require("./env");
const WebSocket = require("ws");
const fs = require('fs');
// console.log(env.KUBERNETES_HOST)

let token="" // set your test token
exports.connect = (pod, container,namespace,shell) => {
  // podUrl = `wss://${env.KUBERNETES_HOST}/api/v1/namespaces/${env.KUBERNETES_NAMESPACE}/pods/${pod}/exec?command=sh&stdin=true&stdout=true&tty=true`;
  console.log(`pod is ${pod}, ${container}, ns=${namespace}, shell=${shell}`)

  podUrl = `wss://127.0.0.1:58400/api/v1/namespaces/${namespace}/pods/${pod}/exec?command=${shell}&stdin=true&stdout=true&tty=true`;

  if(container){
    podUrl = `${podUrl}&container=${container}`
  }

  return new WebSocket(podUrl, {
    ca: fs.readFileSync('/tmp/kind.crt'), // 传入 CA 证书数组
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

exports.stdin = (characters) => {
  return Buffer.from(`\x00${characters}`, "utf8");
};
