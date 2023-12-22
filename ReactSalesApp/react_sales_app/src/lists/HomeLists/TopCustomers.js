import React from 'react';

function TopCustomers({customers}) {
    let results = [];
    let i = 5;
    {
        customers.map((customer, index) => {
            if (index < i) {
            results.push(
                <tr>
                    <td> {index + 1}</td>
                    <td> {customer.CustomerName}</td>
                    <td> ${customer.TotalSales}</td>
                </tr>
            )}
        })
    }
    return results;
}

export default TopCustomers;