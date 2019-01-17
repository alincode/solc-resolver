const match = /^(https?:\/\/?(.*))$/;

module.exports = {
  getSource: index,
  type: 'https',
  match,
};

async function index(importPath) {
  const [, url] = match.exec(importPath);
  return await getSource(url);
}

/**
 * 
 * @param {string} url: 'https://ooo.xxx/SafeMath.sol'
 * @param {string} cleanUrl: 'ooo.xxx/SafeMath.sol'
 */
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