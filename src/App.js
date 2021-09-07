import { useCallback, useEffect, useState } from 'react'
import AddAppointment from './components/AddAppointment'
import AppointmentInfo from './components/AppointmentInfo'
import Search from './components/Search'

function App () {
  const [appointmentsList, setAppointmentsList] = useState([])
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('aptDate')
  const [orderBy, setOrderBy] = useState('asc')

  const filteredAppointment = appointmentsList
    .filter(item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptDate.toLowerCase().includes(query.toLowerCase())
      )
    })
    .sort((a, b) => {
      let order = orderBy === 'asc' ? 1 : -1
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order
    })

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => setAppointmentsList(data))
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='container mx-auto font-thin'>
      <h1 className='text-5xl'>Appointment</h1>
      <AddAppointment lastId={appointmentsList.reduce( ( max,item ) => Number( item.id ) > max ? Number( item.id ) : max,0 )} onSendAppointment={ myAppointment => setAppointmentsList([...appointmentsList, myAppointment])}/>
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
            onDeleteAppointment={appointmentId =>
              setAppointmentsList(
                appointmentsList.filter(
                  appointment => appointment.id !== appointmentId
                )
              )
            }
          />
        ))}
      </ul>
    </div>
  )
}

export default App
