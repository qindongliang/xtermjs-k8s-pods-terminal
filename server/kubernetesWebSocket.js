const env = require("./env");
const WebSocket = require("ws");
const fs = require('fs');
// console.log(env.KUBERNETES_HOST)

let token="eyJhbGciOiJSUzI1NiIsImtpZCI6IlBBQ2FNYlA5eWFTQ2V5QlF0NkdicHIybTgzXzY5dkN1YXZaNmJXcUZFR3MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI3YzBjYjRiYS00ZTc4LTQ4NjMtYWJlNy01NmM2ZDM5MWE0ZGUiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.BC5AQGIcP9_TP1T4al8Tsr4apldMoiq453_GxnNz2eChYi3PwlDYZsgeIqizqal-eRSXb3PFyxOJxif6o51qrNhc5bXi4JSpnDyz3cB_JmWeFD93mZFpjcjpGImNmABSfMoNDYmO8K8C6Gmtu3apKVdg7ru-kjvQJzkOXhKGM8ZXztlrmxJ2CbyY_RzZU2rybOvh2ieTzr-zoJn6_ND54BR1rqdtqvrpfsOZjvxs7wy_POQenCnvg2QG2m8CUxW98RJYfexHorssoz8iRZ7KBlGjo9yS87RE_tuhuwR8DL_7ELUuqSURyJwPoLr3oIyH722h5Ni7a2Kf6TzxJdWjBA"
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
