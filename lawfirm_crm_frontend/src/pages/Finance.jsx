import React, { useEffect } from 'react'

const Finance = ({ setTitle }) => {

    useEffect(() => {
        setTitle('Finance'); // Set the title when the component mounts
      }, [setTitle]);
    // const [title, se
  return (
    <div>Finance</div>
  )
}

export default Finance