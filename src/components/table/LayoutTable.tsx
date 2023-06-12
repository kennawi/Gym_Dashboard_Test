import React, { ReactNode } from "react";

interface ILayoutTableProps {
  children: ReactNode;
}

const LayoutTable: React.FC<ILayoutTableProps> = ({ children }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
};

export default LayoutTable;
