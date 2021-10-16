import { useCallback, useEffect, useState } from 'react'
import api from './api/api'
import AddAppointment from './components/AddAppointment'
import AppointmentInfo from './components/AppointmentInfo'
import Search from './components/Search'

function App () {
  const [appointmentsList, setAppointmentsList] = useState([])
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('appointment')
  const [orderBy, setOrderBy] = useState('asc')

  const filteredAppointment = appointmentsList.filter(
    ({ name, notes, appointment, date }) => {
      return (
        name.toLowerCase().includes(query.toLowerCase()) ||
        notes.toLowerCase().includes(query.toLowerCase()) ||
        appointment.toLowerCase().includes(query.toLowerCase()) ||
        date.toLowerCase().includes(query.toLowerCase())
      )
    }
  )
  // .sort((a, b) => {
  //   let order = orderBy === 'asc' ? 1 : -1
  //   return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
  //     ? -1 * order
  //     : 1 * order
  // })

  const fetchData = useCallback(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await api.get('appointment')

        return setAppointmentsList(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAppointment()
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='container px-8 mx-auto font-thin _container'>
      <h1 className='text-4xl font-bold text-gray-600 my-8 text-center'>Appointment Records</h1>
      <AddAppointment
      lastId={appointmentsList.reduce(
        (max, item) => (Number(item.id) > max ? Number(item.id) : max),
        0
      )}
      // onSendAppointment={myAppointment =>
      //   setAppointmentsList([...appointmentsList, myAppointment])
      // }
      />
      <Search
        query={query}
        onChangeQuery={myQuery => setQuery(myQuery)}
        sortBy={sortBy}
        onChangeSortBy={sort => setSortBy(sort)}
        orderBy={orderBy}
        onChangeOrderBy={order => setOrderBy(order)}
      />

      <ul className=''>
        {filteredAppointment.map(appointment => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
