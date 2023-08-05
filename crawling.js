import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const categoryUrl = 'https://www.cntmart.com/api/category';
const getItemURL = ({url,code})=> `https://www.cntmart.com/api/item?categoryUrl=${url}&categoryCode=${code}&orderBy=SALES_ORDERING&sort=ASC&page=1&fcIds=&itemsPerPage=10000`;

const prisma = new PrismaClient();

(async () =>{
    const categories = (await axios.get(categoryUrl)).data.list[0].groups[0].categories.map((item)=>({url:item.url, code: item.code, name: item.name}));
    categories.forEach(async (category)=>{
        const items = (await axios.get(getItemURL(category))).data.content;
        const data = items.map((item) => {
            return {
                name: item.descArea.title,
                brand: item.descArea.brand,
                itemCode: item.itemUserCode,
                price: item.descArea.price,
                image: item.thumbnailArea.itemThumbnail,
                category: category.name,
                tag: []
            }
        });
        const result = await prisma.goods.createMany({
            data: data
        });
        console.log(result);
    });
})();
