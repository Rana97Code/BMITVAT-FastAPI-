import React from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';



const rowData = [
    {
        serial: 1,
        hsCode: 'S00110',
        description: 'নন এসি হোটেল',
        cd: 0.00,
        sd: 0.00,
        vat: 7.50,
        at: 0.00,
        year: 2022,
    },
    {
        serial: 2,
        hsCode: 'S00111',
        description: 'এসি হোটেল',
        cd: 0.00,
        sd: 0.00,
        vat: 15.00,
        at: 0.00,
        year: 2022,
    },
    
];

const col = ['serial', ' hsCode', 'description', 'cd', 'sd', 'vat', 'at', 'year' ];

const index = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Export Table'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'serial'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'serial', direction: 'asc' });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item: any) => {
                return (
                    item.serial.toString().includes(search.toLowerCase()) ||
                    item.hsCode.toLowerCase().includes(search.toLowerCase()) ||
                    item.description.toLowerCase().includes(search.toLowerCase()) ||
                    item.cd.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.sd.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.vat.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.at.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.year.toString().toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);
    const header = ['Serial', 'HS-Code', 'Description', 'CD', 'SD', 'VAT', 'AT','Year' ];

    return (
        <div>
           <div className="panel flex items-center justify-between flex-wrap gap-4 text-black">
                <h2 className="text-xl font-bold">HS-CODE</h2>   
            </div>

            <div className="panel mt-6">

                <div className="datatables">
                <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'serial', title: 'Serial', sortable: true },
                            { accessor: 'hsCode', title: 'HS-Code', sortable: true },
                            { accessor: 'description', title: 'Description', sortable: true },
                            { accessor: 'cd', title: 'CD', sortable: true },
                            { accessor: 'sd', title: 'SD', sortable: true },
                            { accessor: 'vat', title: 'CD', sortable: true },
                            { accessor: 'cd', title: 'VAT', sortable: true },
                            { accessor: 'at', title: 'AT', sortable: true },
                            { accessor: 'year', title: 'Year', sortable: true },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default index;
