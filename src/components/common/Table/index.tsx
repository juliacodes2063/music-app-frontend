import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import PaginationControls from './PaginationControls';
import { useMemo } from 'react';
import TableHeader from './TableHeder';
import TableBody from './TableBody';

interface TableProps<T extends { id: string }> {
    data: T[];
    columns: ColumnDef<T, unknown>[];
    totalPages: number;
    currentPage: number;
    onPageChange: (pageIndex: number) => void;
    onFilterChange: (filters: Record<string, string>) => void; 
    onSortChange: (sorting: SortingState) => void;            
    sorting: SortingState;
    filters: Record<string, string>;
    playingTrackId: string | null;
}

const Table = <T extends { id: string },>({
    data,
    columns,
    totalPages,
    currentPage,
    onPageChange,
    onFilterChange,
    onSortChange,
    sorting,
    filters,
    playingTrackId
}: TableProps<T>) => {

    const columnFilters = useMemo<ColumnFiltersState>(
        () =>
            Object.entries(filters).map(([id, value]) => ({
                id,
                value,
            })),
        [filters]
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        
        },
        manualPagination: true,
        onSortingChange: (newSorting) => {
            const resolvedSorting =
                typeof newSorting === 'function' ? newSorting(table.getState().sorting) : newSorting;

            onSortChange(resolvedSorting);
           
        },
     
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),

    });

    return (
        <div className="w-[750px] h-[605px] border rounded flex flex-col overflow-hidden">
            <div className="flex-grow overflow-auto">
                <table className="min-w-full divide-y divide-gray-200 table-fixed w-full ">
                    <TableHeader
                        headerGroups={table.getHeaderGroups()}
                        filters={filters}
                        onFilterChange={onFilterChange}
                    />
                    <TableBody 
                        rows={table.getPaginationRowModel().rows} 
                        playingTrackId={playingTrackId}
                    />

                </table>
            </div>

            <PaginationControls
                table={table}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default Table;
