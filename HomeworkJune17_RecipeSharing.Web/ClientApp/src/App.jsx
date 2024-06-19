import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import AddRecipe from './Pages/AddRecipe';
import Categories from './Pages/Categories';
import { AuthContextComponent } from './AuthContext';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/addrecipe' element={
                        <PrivateRoute>
                            <AddRecipe />
                        </PrivateRoute>} />
                    <Route path='/categories' element={
                        <PrivateRoute>
                            <Categories />
                        </PrivateRoute>} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;