export const config = {
  matcher: [
    '/database/pdf-viewer',
    '/database/pdf-viewer.html',
    '/database/view',
    '/database/view.html',
    '/database/youtube-content',
    '/database/youtube-content.html',
    '/database/folder-content',
    '/database/folder-content.html'
  ]
};

export default function middleware(request) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title');
  
  if (title) {
    let page = 'view';
    if (url.pathname.includes('pdf-viewer')) page = 'pdf-viewer';
    else if (url.pathname.includes('youtube-content')) page = 'youtube-content';
    else if (url.pathname.includes('folder-content')) page = 'folder-content';
    
    // Rewrite to our API function
    url.pathname = '/api/dynamic-og';
    url.searchParams.set('page', page);
    
    // In Vercel Edge Middleware, return Response.rewrite
    return fetch(url.toString());
  }
}
