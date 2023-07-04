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
            <td><a href =""read.html?pageno=${c.no}">${c.name}</a></td>
            <td>${c.address}</td>
            <td>${c.tel}</td>
        </tr>    
        `;
        $tbody.append(html);
    }
}
