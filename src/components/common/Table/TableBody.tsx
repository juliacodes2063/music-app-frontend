import { flexRender, Row } from '@tanstack/react-table';

interface TableBodyProps<T> {
    rows: Row<T>[];
    playingTrackId: string | null;
  }
  

const TableBody = <T extends { id: string }>({ rows, playingTrackId }: TableBodyProps<T>) => {
  return (
    <tbody>
      {rows.map((row) => (
        <tr
        key={row.id}
        data-testid={`track-item-${row.original.id}`}
        className={`
          group 
          transition-colors 
          hover:bg-gray-50 hover:text-gray-500
          ${row.original.id === playingTrackId ? 'bg-gray-50 text-gray-500' : ''}
        `}
      >
          {row.getVisibleCells().map((cell) => (
            <td
              style={{ width: cell.column.getSize() }}
              key={cell.id}
              data-testid={`track-item-${row.original.id}-${cell.column.id}`}
              className={`
                px-4 py-2 text-sm text-left overflow-visible
                ${['artist', 'genres'].includes(cell.column.id?.toString() ?? '') ? 'hidden md:table-cell' : ''}
              `}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;