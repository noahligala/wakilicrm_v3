import React, { useEffect } from 'react'

const OfficeManagement = ({ setTitle }) => {

    useEffect(() => {
        setTitle('Office Management'); // Set the title when the component mounts
      }, [setTitle]);
    // const [title, se
  return (
    <div>Office Management</div>
  )
}

export default OfficeManagement