import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import SearchInput from './SearchInput';

interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
}

const TableHeader = <T extends { id: string }>({ headerGroups, filters, onFilterChange }: TableHeaderProps<T>) => {
  return (
    <thead className="bg-gray-100 h-[36.5px] sticky top-0 z-10">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              style={{ width: header.column.getSize() }}
              onClick={
                header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined
              }
              className={`
                relative group
                ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                px-4 py-2 text-left text-sm font-medium text-gray-600
                ${['artist', 'genres'].includes(header.column.id?.toString() ?? '') ? 'hidden md:table-cell' : ''}
              `}
            >
              <div className="flex items-center gap-1">
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanSort() && (
                  <div data-testid="sort-select">
                    {header.column.getIsSorted() === 'asc' && <FaSortUp className="w-3 h-3" />}
                    {header.column.getIsSorted() === 'desc' && <FaSortDown className="w-3 h-3" />}
                    {!header.column.getIsSorted() && (
                      <FaSort className="w-3 h-3 text-gray-300 hover:text-blue-500" />
                    )}
                  </div>
                )}
              </div>

              {header.column.getCanFilter() && (
                <SearchInput
                  header={header}
                  value={filters[header.column.id as string] ?? ''}
                  onChange={(newFilters) => onFilterChange(newFilters)}
                  filters={filters}
                />
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;