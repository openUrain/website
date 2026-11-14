import type { APIRoute } from 'astro';
import { productPath, products } from '../data/products';
import { productsPath } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const paths = ['/', productsPath, ...products.map(({ id }) => productPath(id))];
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  return new Response(sitemap, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
