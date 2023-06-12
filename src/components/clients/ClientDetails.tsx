import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchClientDetails } from "../../store/client/clientThunks";

const ClientDetails: React.FC = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useSelector((state: RootState) => state.client);
  console.log(client);

  useEffect(() => {
    dispatch(fetchClientDetails(clientId));
  }, [dispatch, clientId]);

  return (
    <div className=" flex items-center justify-center p-8">
      <div className=" bg-white rounded-lg grid grid-cols-2 gap-4 shadow-md overflow-hidden ">
        <div className="w-full h-full">
          <img
            src="/avatar1.jpg"
            alt="Client Profile"
            className=" object-cover"
          />
        </div>
        <div className="p-6 text-center w-full">
          <h2 className="text-2xl font-bold mb-4">Client Details</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(client).map(([key, value]) => (
              <div key={key}>
                <h3 className="text-xl font-semibold">{key}</h3>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
