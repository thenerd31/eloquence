const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const links = [
  { url: '/',  changefreq: 'daily', priority: 0.8 },
  { url: '/webcam',  changefreq: 'monthly',  priority: 0.6 },
  { url: '/why-we-do',  changefreq: 'monthly',  priority: 0.6 },
  { url: '/about-us', changefreq: 'monthly',  priority: 0.6 },
];

const sitemapStream = new SitemapStream({ hostname: 'https://www.eloquence.live' });

const writeStream = createWriteStream('./public/sitemap.xml');

sitemapStream.pipe(writeStream).on('finish', () => {
  console.log('Sitemap created successfully!');
});

links.forEach(link => {
  sitemapStream.write(link);
});

sitemapStream.end();
