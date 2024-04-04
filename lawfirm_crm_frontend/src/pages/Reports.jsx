import React, { useEffect } from 'react'

const Reports = ({ setTitle }) => {

    useEffect(() => {
        setTitle('Reports'); // Set the title when the component mounts
      }, [setTitle]);
    // const [title, se
  return (
    <div>Reports</div>
  )
}

export default Reports