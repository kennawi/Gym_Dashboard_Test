import React from "react";

interface IHeadTableProps {
  Heading?: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
  subscriptionType?: string;
  actions?: string;
  coach?: string;
  timing?: string;
  price?: string;
}

const HeadTable: React.FC<IHeadTableProps> = ({
  name,
  phoneNumber,
  address,
  subscriptionType,
  actions,
  coach,
  timing,
  price,
}) => {
  return (
    <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
      <tr>
        {/* <th scope="col" className="px-6 py-3">
          {Heading}
        </th> */}
        <th scope="col" className="px-6 py-3">
          {name}
        </th>
        <th scope="col" className="px-6 py-3">
          {coach ? coach : phoneNumber}
        </th>
        <th scope="col" className="px-6 py-3">
          {timing ? timing : address}
        </th>
        <th scope="col" className="px-6 py-3">
          {price ? price : subscriptionType}
        </th>
        <th scope="col" className="px-6 py-3">
          {actions}
        </th>
      </tr>
    </thead>
  );
};

export default HeadTable;
