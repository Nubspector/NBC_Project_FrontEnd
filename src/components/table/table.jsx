function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Table({
  data = [],
  columns = [],
  ranked = false,
  loading = false,
  error = "",
  action = false,
  currentPage = 1,
  limit = 0,
  onRowClick,
}) {
  const handleRowClick = (item) => {
    if (onRowClick !== undefined) {
      onRowClick(item);
    }
  };

  return (
    <table className="min-w-full rounded-lg overflow-hidden">
      <thead className="bg-[#c20250] rounded-t-lg">
        <tr className="divide-x divide-[#BDBDBD]">
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className="p-4 text-center whitespace-nowrap text-sm font-semibold text-white"
            >
              {column.label}
              {column?.renderHeader !== undefined && column?.renderHeader()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {loading && (
          <tr className="divide-x divide-[#BDBDBD]">
            <td
              colSpan={columns.length}
              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
            >
              Loading...
            </td>
          </tr>
        )}

        {!loading && error && (
          <tr className="divide-x divide-[#BDBDBD]">
            <td
              colSpan={columns.length}
              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
            >
              {error}
            </td>
          </tr>
        )}

        {!loading && !error && data.length === 0 && (
          <tr className="divide-x divide-[#BDBDBD]">
            <td
              colSpan={columns.length}
              className="p-4 text-center whitespace-nowrap text-sm text-[#201B1C]"
            >
              <div className="flex flex-col items-center">
                <span className="py-6 text-base text-[#7C7C7C]">
                  No Data Found
                </span>
              </div>
            </td>
          </tr>
        )}

        {!loading &&
          !error &&
          data.length > 0 &&
          data.map((item, index) => (
            <tr
              key={index}
              className={classNames(
                ranked
                  ? index === 0
                    ? "bg-[#EDFCD3]"
                    : index === 1
                    ? "bg-[#DCE1FE]"
                    : index === 2
                    ? "bg-[#FFF7D2]"
                    : ""
                  : "",
                "divide-x divide-[#BDBDBD]",
                action ? "hover:bg-gray-200 cursor-pointer" : ""
              )}
              onClick={() => handleRowClick(item)}
              role={action ? "button" : undefined}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="p-4 text-center whitespace-nowrap text-sm leading-7 h-full"
                >
                  {column.fieldId === "index" &&
                    index + 1 + (currentPage - 1) * limit}
                  {column?.render === undefined && item[column.fieldId]}
                  <p className="text-gray-500">
                    {column?.fieldId2 !== undefined && item[column.fieldId2]}
                  </p>
                  {column?.render && column.render(item)}
                  <span>
                    {column?.fieldId3 !== undefined && item[column.fieldId3]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
