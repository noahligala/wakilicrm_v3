import React, { useEffect } from 'react'

const Integrations = ({ setTitle }) => {

    useEffect(() => {
        setTitle('Tools'); // Set the title when the component mounts
      }, [setTitle]);
    // const [title, se
  return (
    <div>Tools</div>
  )
}

export default Integrations