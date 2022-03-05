/** @type {import('next').NextConfig} */

async function redirects() {
  return [{
    source: '/',
    destination: '/user',
    permanent: true,
  }];
}

module.exports = {
  reactStrictMode: true,
  redirects: redirects,
};
