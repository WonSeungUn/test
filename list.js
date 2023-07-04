const API = 'http://sample.bmaster.kro.kr/contacts';

function getPageno() {
    const params = new URLSearchParams(location.search);
    return params.get('pageno') === null? 1: params.get('pageno');
};

async function fetch (pageno, pagesize = 10) {
    const url = `${API}?pageno=${pageno}&pagesize=${pagesize}`;
    try {
        return await $.ajax(url);
    } catch (error) {
        console.log(error);
        return null;
    };
};

function printContacts({contacts}) {
    const $tbody = $('#tbody');
    for(const c of contacts) {
        const html = `
        <tr>
            <td>${c.no}</td>
            <td><a href ="listread.html?no=${c.no}">${c.name}</a></td>
            <td>${c.address}</td>
            <td>${c.tel}</td>
        </tr>    
        `;
        $tbody.append(html);
    }
};

function getPagination({pageno, pagesize, totalcount, blocksize=5}) {
    const countOfpage = Math.ceil(totalcount/pagesize);
   
    const prev = Math.floor((pageno-1)/blocksize) * blocksize ;
    const start = prev + 1;
    let end = prev + blocksize;
    let next = end + 1;
    if(end >=countOfpage) {
        end = countOfpage;
        next = 0;
    }
    return {prev, start, end, next, pageno};

};

// 구조분해할당
function printPagination ({prev, start, end, next, pageno}) {
    const $pagination = $('#pagination');
    if(prev > 0) {
        const html = `
        <li class="page-item">
        <a class="page-link" href="list.html?pageno=${prev}">Previous</a>
        </li>
        `;
        $pagination.append(html);
    };

    for(let i =start ; i <= end ; i++) {
        let li_class = i===pageno? 'page-item active' : 'page-item';
        const html =`
        <li class="${li_class}">
        <a class="page-link" href="list.html?pageno=${i}">${i}</a>
        </li>
        `;
        $pagination.append(html);
    };

    if(next >0) {
        const html = `
        <li class="page-item">
        <a class="page-link" href="list.html?pageno=${next}">Next</a>
        </li>
        `;
        $pagination.append(html);
    };
};