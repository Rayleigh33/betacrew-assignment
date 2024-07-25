const net = require("net");
const fs = require("fs");
const PORT = 3000;
const HOST = "localhost";

let BUFFER_COLLECTOR = Buffer.alloc(0);

const handlePackets = (buffer, collectedData) => {
  while (buffer.length >= 22) {
    const packet = {};
    packet.symbol = buffer.toString("ascii", 0, 4).replace(/\0/g, "");
    packet.buysellindicator = buffer.toString("ascii", 4, 5);
    packet.quantity = buffer.readUInt32BE(5);
    packet.price = buffer.readUInt32BE(9);
    packet.packetSequence = buffer.readUInt32BE(13);
    collectedData.push(packet);
    buffer = buffer.slice(22);
  }
  return buffer;
};

const client = new net.Socket();
const collectedData = [];

client.connect(PORT, HOST, () => {
  console.log("Connected to the server");

  const requestBuffer = Buffer.from([0x01, 0x00]);
  client.write(requestBuffer);
});

client.on("data", (data) => {
  BUFFER_COLLECTOR = Buffer.concat([BUFFER_COLLECTOR, data]);
  BUFFER_COLLECTOR = handlePackets(BUFFER_COLLECTOR, collectedData);
});

client.on("end", () => {
  console.log("Disconnected from the server");
  collectedData.sort((a, b) => a.packetSequence - b.packetSequence);
  fs.writeFileSync("stock_data.json", JSON.stringify(collectedData, null, 2));
  console.log("Data written to stock_data.json");
});

client.on("error", (err) => {
  console.error(`Error: ${err.message}`);
});
