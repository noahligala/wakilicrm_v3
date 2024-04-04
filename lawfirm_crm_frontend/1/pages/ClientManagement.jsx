import React, { useEffect } from 'react'

const ClientManagement = ({ setTitle }) => {

    useEffect(() => {
        setTitle('Client Management'); // Set the title when the component mounts
      }, [setTitle]);
    // const [title, se
  return (
    <div>Client Management</div>
  )
}

export default ClientManagement