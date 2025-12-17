import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/NavBar/NavBar';
import Footer from '../pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 -mt-3">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;