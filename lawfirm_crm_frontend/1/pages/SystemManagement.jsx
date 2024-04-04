import React, { useEffect } from 'react'

const SystemManagement = ({ setTitle }) => {

    useEffect(() => {
        setTitle('System Administration'); // Set the title when the component mounts
      }, [setTitle]);
    // const [title, se
  return (
    <div>System Administration</div>
  )
}

export default SystemManagement