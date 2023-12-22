import React from 'react';

function TopProducts({items}) {
    let results = [];
    let i = 5;
    {
        items.map((item, index) => {
            if (index < i) {
                results.push(
                    <tr>
                        <td> {index + 1}</td>
                        <td> {item.ItemName}</td>
                        <td> ${item.TotalSales}</td>
                    </tr>
                )}
        })
    }
    return results;
}

export default TopProducts;