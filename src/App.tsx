import { useCallback, useEffect, useState } from "react";
import api from "./api/api.ts";
import AddAppointment from "./components/AddAppointment.tsx";
import AppointmentInfo from "./components/AppointmentInfo.tsx";
import Search from "./components/Search.tsx";
import { appointmentData } from "./types/index.ts";

function App() {
  const [appointmentsList, setAppointmentsList] = useState<appointmentData[]>(
    []
  );
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("appointment");
  const [orderBy, setOrderBy] = useState("asc");

  const filteredAppointment = appointmentsList
    ?.filter(({ name, notes, appointment, date }) => {
      return (
        name.toLowerCase().includes(query.toLowerCase()) ||
        notes.toLowerCase().includes(query.toLowerCase()) ||
        appointment.toLowerCase().includes(query.toLowerCase()) ||
        date.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      const order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    const fetchData = async () => {
      const { data } = await api.get("appointments.json");
      const appoints = [];

      for (const key in data) {
        const appoint = {
          id: key,
          ...data[key],
        };
        appoints.push(appoint);
      }
      return setAppointmentsList(appoints);
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container px-8 mx-auto font-thin _container">
      <h1 className="text-4xl font-bold text-gray-600 my-8 text-center">
        Appointment Scheduler
      </h1>
      <AddAppointment
        lastId={appointmentsList?.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
        onSendAppointment={(myAppointment) =>
          setAppointmentsList([...appointmentsList, myAppointment])
        }
      />
      <Search
        query={query}
        onChangeQuery={(myQuery) => setQuery(myQuery)}
        sortBy={sortBy}
        onChangeSortBy={(sort) => setSortBy(sort)}
        orderBy={orderBy}
        onChangeOrderBy={(order) => setOrderBy(order)}
      />

      <ul className="">
        {filteredAppointment?.map((appointment) => (
          <AppointmentInfo key={appointment.id} appointment={appointment} />
        ))}
      </ul>
    </div>
  );
}

export default App;
