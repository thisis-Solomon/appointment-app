import { useCallback, useEffect, useState } from 'react';
import { database } from '../appwrite/config';
import AddAppointment from '../components/AddAppointment';
import AppointmentInfo from '../components/AppointmentInfo';
import Search from '../components/Search';
import { appointmentData } from '../types';

function Home() {
  const [appointmentsList, setAppointmentsList] = useState<appointmentData[]>(
    []
  );
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('appointment');
  const [orderBy, setOrderBy] = useState('asc');

  const filteredAppointment = appointmentsList
    .filter(({ name, notes, appointment, date }) => {
      return (
        name.toLowerCase().includes(query.toLowerCase()) ||
        notes.toLowerCase().includes(query.toLowerCase()) ||
        appointment.toLowerCase().includes(query.toLowerCase()) ||
        date.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      const order = orderBy === 'asc' ? 1 : -1;
      return a[sortBy].localeCompare(b[sortBy]) * order;
    });

  const fetchData = useCallback(async () => {
    try {
      const response = await database.listDocuments(
        import.meta.env.VITE_DATABASES_ID,
        import.meta.env.VITE_COLLECTION_APPOINTMENTS_ID
      );
      setAppointmentsList(response.documents);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <header className="text-center">
        <h1 className="text-xl font-bold uppercase text-orange-600 px-8">
          Welcome to Schedulify – Your Personal Appointment Wizard!
        </h1>
        <p className="mt-2 mb-4 text-md text-gray-700">
          Effortlessly organize your appointments and stay on top of your
          schedule.
        </p>
      </header>
      <AddAppointment
        lastId={appointmentsList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
        onSendAppointment={(myAppointment) =>
          setAppointmentsList((prevAppointments) => [
            ...prevAppointments,
            myAppointment,
          ])
        }
      />
      <Search
        query={query}
        onChangeQuery={setQuery}
        sortBy={sortBy}
        onChangeSortBy={setSortBy}
        orderBy={orderBy}
        onChangeOrderBy={setOrderBy}
      />
      <ul>
        {filteredAppointment.map((appointment) => (
          <AppointmentInfo key={appointment.$id} appointment={appointment} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
