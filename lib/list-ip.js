const os = require("os");
const ifaces = os.networkInterfaces();

function list() {
  let ipArray = [];
  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach(function (iface) {
      // console.log(`==>>${iface.family}, ${iface.internal}`)
      if ("IPv4" !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      ipArray.push(iface.address);
    });
  });

  ipArray.forEach((ip) => {
    console.log(`${ip}`);
  });

  return ipArray
}

module.exports = {
//   run() {
//     console.log(`ip list:`);
//     list().forEach((ip) => {
//       console.log(`${ip}`);
//     });
//   },
  list,
};
