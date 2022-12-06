import nats from "node-nats-streaming";
const client = nats.connect("post", "auth", {
  url: "http://localhost:4222",
});
client.on("connect", () => {
  console.log("publisher connected");
});