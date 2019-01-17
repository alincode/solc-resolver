const match = /^(http?:\/\/?(.*))$/;

module.exports = {
  getSource: index,
  type: 'http',
  match
};

async function index(importPath) {
  const [, url, ] = match.exec(importPath);
  return await getSource(url);
}

async function getSource(url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.text();
    if (!response.ok || response.status !== 200) throw Error('Content ' + data);
    return data;
  } catch (error) {
    throw error;
  }
}