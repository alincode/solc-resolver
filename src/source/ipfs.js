const match = /^(ipfs:\/\/?.+)/;

module.exports = {
  getSource: index,
  type: 'ipfs',
  match
};

async function index(importPath) {
  const [, url] = match.exec(importPath);
  return await getSource(url);
}

async function getSource(url) {
  // replace ipfs:// with /ipfs/
  url = url.replace(/^ipfs:\/\/?/, 'ipfs/');
  url = 'https://gateway.ipfs.io/' + url;

  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.text();
    if (!response.ok || response.status !== 200) throw Error(data);
    return data;
  } catch (error) {
    throw error;
  }
}