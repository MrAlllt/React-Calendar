import {React, useState} from 'react'
import Calendar from './components/Calendar'

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <Calendar value={currentDate} onChange={setCurrentDate} />
    </div>
    );
}