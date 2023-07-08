// Todo :  Turn this hook later with auth options depending on role

type PageInfo = { [key: string]: string };

export const PAGES: { [key: string]: PageInfo } = {
  HOME: { name: 'Home', path: '/' },
  ABOUT: { name: 'About', path: '/about' },
  CONTACT: { name: 'Contact', path: '/contact' },
  BLOG: { name: 'Blog', path: '/blog' },
  SHOP: { name: 'Shop', path: '/shop' },
  CHECKOUTS: { name: 'Checkouts', path: '/checkouts' },
  PRODUCTS: { name: 'Products', path: '/products' },
  IYZICO_CALLBACK: { name: 'Iyzico Callback', path: '/orders/callback' },
  ORDERS: { name: 'Orders', path: '/orders' },
};
