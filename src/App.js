import React, { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { authRoutes } from 'routes';

function App() {
  const routing = useRoutes(authRoutes);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      {routing}
    </div>
  );
}

export default App;
