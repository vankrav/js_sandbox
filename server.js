const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'src', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else {
        // Попытка обслужить статические файлы из папки public
        const filePath = path.join(__dirname, 'public', req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
                return;
            }
            // Определение MIME типа по расширению файла
            let contentType = 'text/html';
            switch (path.extname(filePath)) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                // Добавьте другие MIME типы по необходимости
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    }
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}. Откройте http://localhost:${PORT} в браузере.`);
});