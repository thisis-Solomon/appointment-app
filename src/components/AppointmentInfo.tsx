import { useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { database } from '../appwrite/config';

const AppointmentInfo = ({ appointment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAppointment, setUpdatedAppointment] = useState({
    name: appointment.name,
    date: appointment.date,
    appointment: appointment.appointment,
    notes: appointment.notes,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAppointment({ ...updatedAppointment, [name]: value });
  };

  const handleDelete = async () => {
    await database.deleteDocument(
      import.meta.env.VITE_DATABASES_ID,
      import.meta.env.VITE_COLLECTION_APPOINTMENTS_ID,
      appointment.$id
    );
    console.log('remove schedule');
  };

  const handleEdit = async () => {
    console.log('edit data');
  };

  return (
    <li className="px-3 py-3 flex items-start">
      <div className="grid grid-col-1 place-items-center py-auto">
        <button
          onClick={() => setIsEditing(!isEditing)}
          type="button"
          className="p-1.5 mr-1.5 mt-1 rounded text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <BiEdit />
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className="p-1.5 mr-1.5 mt-2 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <BiTrash />
        </button>
      </div>
      <div className="flex-grow">
        {isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              value={updatedAppointment.name}
              onChange={handleInputChange}
              className="mb-2"
            />
            <input
              type="text"
              name="date"
              value={updatedAppointment.date}
              onChange={handleInputChange}
              className="mb-2"
            />
            <input
              type="text"
              name="appointment"
              value={updatedAppointment.appointment}
              onChange={handleInputChange}
              className="mb-2"
            />
            <input
              type="text"
              name="notes"
              value={updatedAppointment.notes}
              onChange={handleInputChange}
              className="mb-2"
            />
            <button
              onClick={handleEdit}
              type="button"
              className="p-1.5 mt-2 rounded text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center">
              <span className="flex-none font-medium text-2xl text-blue-500">
                {appointment.name}
              </span>
              <span className="flex-grow text-right">{appointment.date}</span>
            </div>
            <div>
              <b className="font-bold text-blue-500">Appointment: </b>
              <span className="flex-none font-medium text-1xl text-gray-500">
                {appointment.appointment}
              </span>
            </div>
            <div className="leading-tight">{appointment.notes}</div>
          </div>
        )}
      </div>
    </li>
  );
};

export default AppointmentInfo;
