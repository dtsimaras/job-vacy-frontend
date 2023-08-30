import { useState, useEffect } from "react";
import { Container, Dropdown, DropdownButton, Pagination, Spinner, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import useApi from "../../../hooks/useApi";

const defaultDataFormatter = (element, header) => {
    if (typeof element[header] === "boolean") {
        return element[header] ? "Yes" : "No";
    }
    if (Array.isArray(element[header])) {
        const arr = [...element[header]].reverse();
        return arr.join(", ");
    }
    return element[header];
}

const DataTable = ({ dataUrl, formatter }) => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { loading, get, post } = useApi();

    const fetchData = async () => {
        try {
            const res = await get(
                `${dataUrl}?pageNo=${currentPage}&pageSize=${pageSize}`
            );
            if (res.data.content !== undefined) {
                setData(res.data.content);
                setCurrentPage(res.data.currentPage);
                setTotalPages(res.data.pages);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);

    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    const formattedData = (element, header) => {
        if (!formatter) {
            return defaultDataFormatter(element, header);
        }
        return formatter(element, header);
    };

    const loader = (
        <Spinner className="d-flex" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );

    const showStatus = (header, item) => {
        return (
            <td key={header}>
                <DropdownButton variant="light" title={item.status}>
                    <Dropdown.Item onClick={() => handleStatusChange(item.user_id, item.id, "APPROVED")}>APPROVED</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(item.user_id, item.id, "PENDING")}>PENDING</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(item.user_id, item.id, "DENIED")}>DENIED</Dropdown.Item>
                </DropdownButton>
            </td>
        )
    }

    const handleStatusChange = (user_id, request_id, status) => {
        try {
            post(`manager/members/${user_id}/request/${request_id}`, status)
                .then(fetchData());
        } catch (error) {
            console.error("Error changing status:", error);
        }
    };

    const table = (
        <Container>
            <Table responsive>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {headers.map((header) => (
                                <>
                                    {header === 'status'
                                        ? showStatus(header, item)
                                        : <td key={header}>{formattedData(item, header)}</td>
                                    }
                                </>
                            ))}
                            <td><FaEdit /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination className="justify-content-center">
                <DropdownButton variant="light" title={pageSize}>
                    <Dropdown.Item onClick={() => setPageSize(10)}>10</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPageSize(20)}>20</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPageSize(50)}>50</Dropdown.Item>
                </DropdownButton>

                <Pagination.First
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(1)}
                />
                <Pagination.Prev
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                />
                <Pagination.Next
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
                <Pagination.Last
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                />
            </Pagination>
        </Container>
    );

    return <>
        {loading ? loader :
            data.length == 0 ? <h3>No Data</h3> : table}
    </>;
};

export default DataTable;
