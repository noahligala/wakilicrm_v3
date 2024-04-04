// Breadcrumb.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';

export default function BreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {value}
          </Typography>
        ) : (
          <Link color="inherit" to={to} key={to}>
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}