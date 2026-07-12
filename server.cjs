const http = require('http')
const fs = require('fs')
const path = require('path')
const { pipeline } = require('stream')

const PORT = 3456
const DIST = path.join(__dirname, 'dist')

const mime = {
  html: 'text/html; charset=utf-8', css: 'text/css', js: 'application/javascript',
  svg: 'image/svg+xml', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
  mp4: 'video/mp4', webm: 'video/webm', json: 'application/json', ico: 'image/x-icon',
  woff2: 'font/woff2', woff: 'font/woff',
}

http.createServer((req, res) => {
  let fp = path.join(DIST, req.url === '/' ? 'index.html' : req.url.split('?')[0])
  // Normalize path
  fp = path.normalize(fp)
  if (!fp.startsWith(DIST)) { res.writeHead(403); res.end('Forbidden'); return }

  fs.stat(fp, (err, stats) => {
    if (err) { res.writeHead(404); res.end('404 Not Found'); return }

    const ext = path.extname(fp).slice(1).toLowerCase()
    const contentType = mime[ext] || 'application/octet-stream'

    // Video/audio: support Range requests
    if (['mp4', 'webm'].includes(ext) && req.headers.range) {
      const range = req.headers.range
      const parts = range.replace('bytes=', '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1
      const chunkSize = end - start + 1

      res.writeHead(206, {
        'Content-Type': contentType,
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
      })
      fs.createReadStream(fp, { start, end }).pipe(res)
      return
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      ...(['mp4', 'webm'].includes(ext) ? { 'Accept-Ranges': 'bytes' } : {}),
    })
    fs.createReadStream(fp).pipe(res)
  })
}).listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
