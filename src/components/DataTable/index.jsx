import useApi from "../../hooks/useApi";
import { useState, useEffect } from "react";
import { Container, Dropdown, DropdownButton, Pagination, Spinner, Table } from "react-bootstrap";
import EditModal from "../EditForm/EditModal";

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
    const { loading, get } = useApi();



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
                                <td key={header}>{formattedData(item, header)}</td>
                            ))}
                            <td><EditModal item={item} fetchData={fetchData}/></td>
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
