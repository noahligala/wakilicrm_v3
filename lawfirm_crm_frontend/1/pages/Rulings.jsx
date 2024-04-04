import React, { useEffect } from 'react'

const Rulings = ({ setTitle }) => {

    useEffect(() => {
        setTitle('Rulings'); // Set the title when the component mounts
      }, [setTitle]);
    // const [title, se
  return (
    <div>Rulings</div>
  )
}

export default Rulings