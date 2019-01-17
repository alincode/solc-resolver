const match = /^(bzz[ri]?:\/\/?(.*))$/;

module.exports = {
  getSource: index,
  type: 'swarm',
  match
};

async function index(importPath) {
  const [, url,] = match.exec(importPath);
  return await getSource(url);
}

const swarmgw = swarmgwMaker();

async function getSource(url) {
  try {
    let content = await swarmgw.get(url);
    return content;
  } catch (error) {
    throw error;
  }
}

async function getFile(gateway, url) {
  const httpsURL = gateway + '/' + url;
  try {
    const response = await fetch(httpsURL, { method: 'GET' });
    const data = await response.text();
    if (!response.ok || response.status !== 200) throw Error(data);
    return data;
  } catch (error) {
    throw error;
  }
}

function swarmgwMaker(opts) {
  opts = opts || {};
  var gateway;
  if (opts.gateway) {
    gateway = opts.gateway;
  } else if (opts.mode === 'http') {
    gateway = 'http://swarm-gateways.net';
  } else {
    gateway = 'https://swarm-gateways.net';
  }
  return {
    get: async function (url) {
      return await getFile(gateway, url);
    }
  };
}
