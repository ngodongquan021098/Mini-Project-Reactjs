import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PATH } from './constant/path';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import ConfigRouteAuth from './components/auth/requireAuth';
import { MiniGameContainter } from './components/pages/MiniGame';

function App() {
  const PostsPage = lazy(() => import('./components/pages/Posts'));
  return (
    <Routes>
      {/* Login Routes */}
      <Route
        path={PATH.LOGIN}
        element={
          <ConfigRouteAuth path={PATH.LOGIN}>
            <Login></Login>
          </ConfigRouteAuth>
        }
      ></Route>

      {/* Home Routes */}
      <Route
        path={PATH.HOME}
        element={
          <ConfigRouteAuth path={PATH.HOME}>
            <Home></Home>
          </ConfigRouteAuth>
        }
      >
        <Route
          index
          element={
            <React.Suspense>
              <PostsPage></PostsPage>
            </React.Suspense>
          }
        ></Route>
      </Route>

      <Route
        path={PATH.MINI_GAME}
        element={
          <ConfigRouteAuth path={PATH.MINI_GAME}>
            <MiniGameContainter></MiniGameContainter>
          </ConfigRouteAuth>
        }
      ></Route>
    </Routes>
  );
}
export default App;
