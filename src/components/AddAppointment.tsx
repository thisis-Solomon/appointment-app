import { ID } from 'appwrite';
import { useState } from 'react';
import { BiCalendarPlus } from 'react-icons/bi';
import { database } from '../appwrite/config';
import { appointmentData } from '../types';

const initialValues: appointmentData = {
  name: '',
  appointment: '',
  notes: '',
  date: '',
  time: '',
};

const AddAppointment = () => {
  const [toggleAppointment, setToggleAppointment] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  const handleSubmitFormData = async () => {
    const appointmentData = {
      name: formData.name,
      appointment: formData.appointment,
      notes: formData.notes,
      date: formData.date + ' ' + formData.time,
    };
    await database.createDocument(
      import.meta.env.VITE_DATABASES_ID,
      import.meta.env.VITE_COLLECTION_APPOINTMENTS_ID,
      ID.unique(),
      appointmentData
    );
    setFormData(initialValues);
    setToggleAppointment(!toggleAppointment);
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setToggleAppointment(!toggleAppointment);
          }}
          className="bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md"
        >
          <div>
            <BiCalendarPlus className="inline-block align-text-top" /> Add
            Appointment
          </div>
        </button>
        {toggleAppointment && (
          <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
              <label
                htmlFor="ownerName"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Fullname
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, name: event.target.value });
                  }}
                  value={formData.name}
                  type="text"
                  name="ownerName"
                  id="ownerName"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
              <label
                htmlFor="petName"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Appointment
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      appointment: event.target.value,
                    });
                  }}
                  value={formData.appointment}
                  type="text"
                  name="petName"
                  id="petName"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
              <label
                htmlFor="aptNotes"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Key Notes
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  onChange={(event) => {
                    setFormData({ ...formData, notes: event.target.value });
                  }}
                  id="aptNotes"
                  name="aptNotes"
                  rows="3"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 max-w-lg block w-full sm:text-sm border-gray-300 rounded-md _width"
                  placeholder="Detailed comments about the condition"
                ></textarea>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
              <label
                htmlFor="aptDate"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Date
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, date: event.target.value });
                  }}
                  value={formData.date}
                  type="date"
                  name="aptDate"
                  id="aptDate"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
              <label
                htmlFor="aptTime"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Time
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, time: event.target.value });
                  }}
                  value={formData.time}
                  type="time"
                  name="aptTime"
                  id="aptTime"
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitFormData}
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAppointment;
