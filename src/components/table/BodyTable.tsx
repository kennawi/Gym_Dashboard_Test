import React from "react";
import Button from "../inputs/Button";
import { Link } from "react-router-dom";

interface IBodyTableProps {
  name?: string;
  phoneNumber?: string;
  address?: string;
  LinkTo?: string;
  coach?: string;
  timing?: string;
  price?: string | number;
  subscriptionType?: string;
  onHandleDelete: () => void;
  onHandleEdit: () => void;
}
const BodyTable: React.FC<IBodyTableProps> = ({
  name,
  phoneNumber,
  address,
  subscriptionType,
  onHandleEdit,
  onHandleDelete,
  LinkTo,
  coach,
  timing,
  price,
}) => {
  return (
    <>
      <tr className="bg-white dark:bg-gray-800">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="px-6 py-4">{coach ? coach : phoneNumber}</td>
        <td className="px-6 py-4">{timing ? timing : address}</td>
        <td className="px-6 py-4">{price ? price : subscriptionType}</td>
        <td className="px-6 py-4">
          {" "}
          <Button error onClick={onHandleDelete}>
            Delete
          </Button>
          <Button success onClick={onHandleEdit}>
            Edit
          </Button>
          <Link to={LinkTo as string}>
            <Button>Details</Button>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default BodyTable;
