import React, { useContext } from 'react';
import { TitleContext } from './TitleContext';

function Header() {
  const { title } = useContext(TitleContext);

  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;