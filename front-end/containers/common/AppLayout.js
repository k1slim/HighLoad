import React from 'react';
import '../../scss/main.scss';

const AppLayout = ({ children }) => (
    <main>
        <header className="page-header">
            <h1>
                High Load
            </h1>
        </header>
        {children}
    </main>
);

export default AppLayout;
