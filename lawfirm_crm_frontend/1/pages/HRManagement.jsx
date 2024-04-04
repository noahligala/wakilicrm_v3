import React, { useEffect } from 'react'

const HRManagement = ({ setTitle }) => {

    useEffect(() => {
        setTitle('Human Resource'); // Set the title when the component mounts
      }, [setTitle]);
    // const [title, se
  return (
    <div>Human Resources</div>
  )
}

export default HRManagement