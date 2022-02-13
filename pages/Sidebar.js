import React, { useEffect, useState } from 'react';
import { Divider } from '@material-ui/core';

const Sidebar = props => {
    return (
        <div style={{ width: '20%', height: '100%', padding: '8px' }}>
            <div style={{ width: '100%', maxWidth: '100%' }}>
                Sidebar
            </div>
            <Divider style={{ padding: '0 8px' }} />
        </div>
    );
};

export default Sidebar;