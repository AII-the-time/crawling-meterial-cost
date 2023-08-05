import http from 'http';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

const server = http.createServer((req, res) => {
    if(req.url.startsWith('/api/goods') && req.method === 'GET'){
        const category = req.url.replace('/api/goods/', '');
        if(category === 'all'){
            prisma.goods.findMany({
                where: {
                    category: {
                        in: ["차", "음료/탄산수", "음료베이스", "시럽/소스", "파우더", "베이커리", "푸드", "테이크아웃"]
                    }
                }
            }).then((data)=>{
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
            });
        } else {
            prisma.goods.findMany({
                where: {
                    category: decodeURI(category)
                }
            }).then((data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
            });
        }
    } else if (req.url.startsWith('/api/search/') && req.method === 'GET'){
        const query = req.url.split('?')[1].split('&');
        const keywords = query[0].split('=')[1];
        const brand = query[1].split('=')[1];
        prisma.goods.findMany({
            where: {
                AND: [
                    ... decodeURI(keywords).split(' ').map((keyword)=>{
                        return {
                            name: {
                                contains: keyword
                            }
                        }
                    }),
                    {
                        brand: {
                            contains: decodeURI(brand)
                        }
                    },
                    {
                        category: {
                            in: ["차", "음료/탄산수", "음료베이스", "시럽/소스", "파우더", "베이커리", "푸드", "테이크아웃"]
                        }
                    }
                ]
            }
        }).then((data)=>{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        });
    } else if(req.url.startsWith('/api/goods/') && req.method === 'PATCH'){
        const id = req.url.split('/')[3];
        let body = '';
        req.on('data', (chunk)=>{
            body += chunk;
        });
        req.on('end', ()=>{
            prisma.goods.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    ...JSON.parse(body)
                }
            }).then((data)=>{
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
            });
        });
    }
    else if(req.url?.includes('.js') || req.url?.includes('.css')){
        fs.readFile(`./front/build${req.url}`, (err, data)=>{
            if(err){
                res.statusCode = 404;
                res.end('Not Found');
            }else{
                res.end(data);
            }
        });
    }else{
        fs.readFile('./front/build/index.html', (err, data)=>{
            if(err){
                res.statusCode = 404;
                res.end('Not Found');
            }else{
                res.end(data);
            }
        });
    }
});

server.listen(8888);
