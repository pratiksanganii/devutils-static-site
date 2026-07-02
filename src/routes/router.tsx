import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Tools } from '../pages/Tools';
import { JsonFormatter } from '../pages/JsonFormatter';
import { UUIDGenerator } from '../pages/UUIDGenerator';
import { Base64Tool } from '../pages/Base64Tool';
import { JWTDebugger } from '../pages/JWTDebugger';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'tools',
        children: [
          {
            index: true,
            element: <Tools />,
          },
          {
            path: 'json-formatter',
            element: <JsonFormatter />,
          },
          {
            path: 'uuid-generator',
            element: <UUIDGenerator />,
          },
          {
            path: 'base64',
            element: <Base64Tool />,
          },
          {
            path: 'jwt',
            element: <JWTDebugger />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
