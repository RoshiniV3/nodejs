// dnsResolver.js
const dns = require('dns');

/**
 * Resolves an IPv4 address for a given hostname.
 * @param {string} hostname - The hostname to resolve.
 * @returns {Promise<string>} - A promise that resolves to the IP address.
 */
async function resolveDNS(hostname) {
  return new Promise((resolve, reject) => {
    dns.resolve4(hostname, (err, addresses) => {
      if (err) {
        reject(err);
      } else {
        resolve(addresses[0]); // Return the first IP address
      }
    });
  });
}

module.exports = { resolveDNS };
