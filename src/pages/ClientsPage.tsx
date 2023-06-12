import { useDispatch, useSelector } from "react-redux";
import BodyTable from "../components/table/BodyTable";
import HeadTable from "../components/table/HeadTable";
import LayoutTable from "../components/table/LayoutTable";
import { AppDispatch, RootState } from "../store";
import { ChangeEvent, useEffect, useState } from "react";
import ClientsForms, { IFormData } from "../components/forms/ClientsForms";
import {
  addClient,
  deleteClient,
  editClient,
  fetchClients,
} from "../store/clients/clientsThunks";
import { selectClient } from "../store/clients/clientsSlice";
import { Client } from "../types/client";
import Button from "../components/inputs/Button";

const ClientsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, selectedClient } = useSelector(
    (state: RootState) => state.clients
  );

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<IFormData | any>({
    name: "",
    phoneNumber: "",
    address: "",
    subscriptionType: "",
  });

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (!openModal) {
      dispatch(selectClient(null));
    }
  }, [dispatch, openModal]);

  // {*** handel Delete ***}//
  const handleDelete = (clientId: string) => {
    dispatch(deleteClient(clientId));
  };

  // {*** handle ToggleModal ***}//
  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  // {*** handle Edit ***}//
  const handleEdit = (client: Client) => {
    dispatch(selectClient(client));
    setFormData({
      name: client.name as string,
      phoneNumber: client.phoneNumber as string,
      address: client.address as string,
      subscriptionType: client.subscriptionType as string,
    });
    handleToggleModal();
  };

  // {*** handle Change ***}//

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // {*** handle Submit ***}//
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedClient = {
      ...selectedClient,
      ...formData,
    };

    selectedClient
      ? dispatch(editClient(updatedClient))
      : dispatch(addClient(formData));

    setFormData({
      name: "",
      phoneNumber: "",
      address: "",
      subscriptionType: "",
    });
    setOpenModal(false);
  };

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
        Clients
      </h1>
      <LayoutTable>
        <HeadTable
          name="Name"
          phoneNumber="Phone Number"
          address="Address"
          subscriptionType="Subscription Type"
          actions="Actions"
        />
        <tbody>
          {clients.map((client) => (
            <BodyTable
              name={client.name}
              phoneNumber={client.phoneNumber}
              address={client.address}
              subscriptionType={client.subscriptionType}
              onHandleDelete={() => handleDelete(client.id)}
              onHandleEdit={() => handleEdit(client)}
              LinkTo={`/clients/${client.id}`}
            />
          ))}
        </tbody>
      </LayoutTable>
      <div className="flex justify-center mt-7">
        <Button type="button" onClick={handleToggleModal}>
          Add Client
        </Button>
      </div>
      {openModal && (
        <ClientsForms
          onHandleSubmit={handleSubmit}
          onHandleChange={handleChange}
          formData={selectedClient ? formData : ""}
          onHandleToggleModal={handleToggleModal}
        />
      )}
    </div>
  );
};

export default ClientsPage;
