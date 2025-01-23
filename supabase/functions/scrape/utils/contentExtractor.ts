import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

export const extractContent = (html: string, searchQuery?: string): string => {
  const document = new DOMParser().parseFromString(html, "text/html");
  let content = '';

  if (searchQuery) {
    console.log('Applying search query:', searchQuery);
    const elements = document.getElementsByTagName('*');
    const matchingContent = Array.from(elements)
      .filter(el => el.textContent?.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(el => el.textContent)
      .filter(Boolean);
    
    content = matchingContent.join('\n\n');
  } else {
    console.log('Extracting main content');
    const article = document.getElementsByTagName('article')[0];
    const main = document.getElementsByTagName('main')[0];
    
    if (article) {
      content = article.textContent || '';
    } else if (main) {
      content = main.textContent || '';
    } else {
      const body = document.getElementsByTagName('body')[0];
      content = body?.textContent || '';
    }
  }

  return content.trim()
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n');
};

export const extractImages = (html: string): string[] => {
  const document = new DOMParser().parseFromString(html, "text/html");
  const images = document.getElementsByTagName('img');
  const imageUrls: string[] = [];
  
  Array.from(images).forEach((img) => {
    const src = img.getAttribute('src');
    if (src && (src.startsWith('http') || src.startsWith('https'))) {
      imageUrls.push(src);
    }
  });

  return imageUrls;
};

export const extractTitle = (html: string, url: string): string => {
  const document = new DOMParser().parseFromString(html, "text/html");
  const titleElement = document.getElementsByTagName('title')[0];
  return titleElement?.textContent || url;
};