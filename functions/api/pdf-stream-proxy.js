/**
 * Cloudflare Pages Function — PDF Stream Proxy
 * Route: GET /api/pdf-stream-proxy?id=<googleDriveFileId>
 *
 * Purpose:
 *   - Fetch PDF from Google Drive and stream back with CORS headers
 *   - Allows client-side pdf-lib watermarking (needs CORS-accessible bytes)
 *   - Runs on Cloudflare Edge (solmates.in) — ZERO Render/backend load
 */

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const fileId = url.searchParams.get('id');

  if (!fileId || !/^[a-zA-Z0-9_-]{10,}$/.test(fileId)) {
    return new Response('Missing or invalid id', {
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }

  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  // Try drive.usercontent.google.com first (modern, direct, faster)
  const urls = [
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
    `https://drive.google.com/uc?export=download&id=${fileId}&confirm=t`,
  ];

  for (const driveUrl of urls) {
    try {
      const driveRes = await fetch(driveUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/pdf,application/octet-stream,*/*',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        redirect: 'follow',
      });

      const contentType = driveRes.headers.get('Content-Type') || '';

      // Skip if Google returned a confirmation HTML page
      if (!driveRes.ok || contentType.includes('text/html')) continue;

      return new Response(driveRes.body, {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/pdf',
          'Cache-Control': 'public, max-age=86400',
          'X-Solmates-Cache': 'CF-PAGES-EDGE',
        },
      });
    } catch (_) {
      continue;
    }
  }

  return new Response('Could not fetch PDF from Google Drive', {
    status: 502,
    headers: CORS_HEADERS,
  });
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
