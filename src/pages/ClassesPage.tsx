import { ChangeEvent, useEffect, useState } from "react";
import { ClassItem } from "../types/class";
import { selectClass } from "../store/classes/classesSlice";
import {
  addClass,
  deleteClass,
  editClass,
  fetchClasses,
} from "../store/classes/classesThunks";
import { IFormData } from "../components/forms/ClientsForms";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import ClassesForm from "../components/forms/ClassesForm";
import Button from "../components/inputs/Button";
import LayoutTable from "../components/table/LayoutTable";
import BodyTable from "../components/table/BodyTable";
import HeadTable from "../components/table/HeadTable";

const ClassesPage = () => {
  const { classes, selectedClass } = useSelector(
    (state: RootState) => state.classes
  );
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState<IFormData | any>({
    title: "",
    coach_name: "",
    timing: "",
    price: "",
  });

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    if (!openModal) {
      dispatch(selectClass(null));
    }
  }, [dispatch, openModal]);

  // {*** handel Delete ***}//

  const handleDelete = (classId: string) => {
    dispatch(deleteClass(classId));
  };
  // {*** handle ToggleModal ***}//

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  // {*** handle Edit ***}//
  const handleEdit = (classItem: ClassItem) => {
    dispatch(selectClass(classItem));
    setFormData({
      title: classItem.title,
      coach_name: classItem.coach_name,
      timing: classItem.timing,
      price: classItem.price as string,
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
    const updatedClass = {
      ...selectedClass,
      ...formData,
    };

    selectedClass
      ? dispatch(editClass(updatedClass))
      : dispatch(addClass(formData));

    setFormData({
      title: "",
      coach_name: "",
      timing: "",
      price: "",
    });
    setOpenModal(false);
  };

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
        CLasses
      </h1>
      <LayoutTable>
        <HeadTable
          name="Class Name"
          coach="Coach Name"
          timing="Timing"
          price="Price"
          actions="Actions"
        />
        <tbody>
          {classes.map((classItem) => (
            <BodyTable
              name={classItem.title}
              coach={classItem.coach_name}
              timing={classItem.timing}
              price={classItem.price}
              onHandleDelete={() => handleDelete(classItem.id)}
              onHandleEdit={() => handleEdit(classItem)}
              LinkTo={`/classes/${classItem.id}`}
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
        <ClassesForm
          onHandleSubmit={handleSubmit}
          onHandleChange={handleChange}
          formData={selectedClass ? formData : ""}
          onHandleToggleModal={handleToggleModal}
        />
      )}
    </div>
  );
};

export default ClassesPage;
