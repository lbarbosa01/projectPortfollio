import React from 'react';

function TopSales({sales}) {
    let results = [];
    let i = 5;
    // const orderedSales = sales.fetchAllStats();
    {
        sales.map((sale, index) => {
            if (index < i) {
                results.push(
                    <tr>
                        <td> {index + 1}</td>
                        <td> {sale.Date}</td>
                        <td> ${sale.TotalSales}</td>
                    </tr>
                )}
        })
    }
    return results;
}
export default TopSales;