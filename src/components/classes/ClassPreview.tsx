import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useParams } from "react-router-dom";
import { fetchClassDetails } from "../../store/class/classThunks";

const ClassPreview: React.FC = () => {
  const { classId } = useParams();
  console.log(classId, "Class ID ");
  const dispatch = useDispatch<AppDispatch>();
  const { classItem } = useSelector((state: RootState) => state.class);

  useEffect(() => {
    dispatch(fetchClassDetails(classId));
  }, [dispatch, classId]);
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{classItem?.title}</h2>
        <div className="flex mb-4">
          <div className="w-1/2 pr-4">
            <p className="text-gray-500 mb-2">Coach: {classItem?.coach_name}</p>
            <p className="text-gray-500 mb-2">Timing: {classItem?.timing}</p>
            <p className="text-gray-500 mb-2">Price: ${classItem?.price}</p>
          </div>
          <div className="w-1/2 pl-4">
            <p className="text-gray-500">{classItem?.description}</p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-2">About the Coach</h3>
          <p className="text-gray-500">{classItem?.coach_brief}</p>
        </div>
      </div>
    </>
  );
};

export default ClassPreview;
