import { BiTrash} from 'react-icons/bi'
import api from '../api/api'

const AppointmentInfo = ({ appointment }) => {
  const id = appointment._id

  const handleDelete = async id => {
    await api.delete('appointment/' + id)
  }

  return (
    <li className='px-3 py-3 flex items-start'>
      <div className='grid grid-col-1 place-items-center py-auto'>
        {/* <button
          onClick={console.log('clicked')}
          type='button'
          className='p-1.5 mr-1.5 mt-1 rounded text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
        >
          <BiEdit />
        </button> */}
        <button
          onClick={() => handleDelete(id)}
          type='button'
          className='p-1.5 mr-1.5 mt-2 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          <BiTrash />
        </button>
      </div>
      <div className='flex-grow'>
        <div className='flex items-center'>
          <span className='flex-none font-medium text-2xl text-blue-500'>
            {appointment.name}
          </span>
          <span className='flex-grow text-right'>{appointment.date}</span>
        </div>
        <div>
          <b className='font-bold text-blue-500'>Appointment: </b>
          <span className="flex-none font-medium text-1xl text-gray-500">{appointment.appointment}</span>
        </div>
        <div className='leading-tight'>{appointment.notes}</div>
      </div>
    </li>
  )
}

export default AppointmentInfo
