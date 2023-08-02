import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';

function Table(items) {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState("id"); // or null or ""

    const headers = items.length > 0 ? Object.keys(items[0]) : [];
    const convertToDisplayValue = (value) => { return value ? 'Yes' : 'No'; };
    //TODO: diferent table for leave requests: pending-blue, approved-green, denied-red
    return (
        <> {/*Change <> to div, add class container, pretiffy it */}
            {/* Add a Generic search, in which I can also add filters e.x. firstname */}
            <Table responsive>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                            // Add React Icon for sorting and onclick setSortBy
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>
                            {headers.map((header) => (
                                <td key={header}>
                                    {typeof item[header] === 'boolean'
                                        ? convertToDisplayValue(item[header])
                                        : item[header]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button>1</Button>  {/* Buttons for pageNo. Must calculate max pages first? Or have next previous first last */}
            {/* DropDown for selecting pageSize */}
        </>
    )
}

export default Table