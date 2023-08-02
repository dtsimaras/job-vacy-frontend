import React, { useContext, useEffect } from 'react'
import UserManagement from '../../components/Admin/UserManagement';
import Header from '../../components/Header';
import { Tabs, Tab } from 'react-bootstrap';

function AdminDashboard() {

    return (
        <div>
            <Header />
            <Tabs
                defaultActiveKey="panel"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="panel" title="Panel">
                    <p>Control Panel for Important - General Info</p>
                    <p>The first thing admin wants to see. Calendar? Pie for requests? etc.</p>
                </Tab>
                <Tab eventKey="users" title="Users">
                    <UserManagement />
                </Tab>
                <Tab eventKey="teams" title="Teams" disabled>
                    Tab content for Team Management
                </Tab>
            </Tabs>
        </div>
    )
}

export default AdminDashboard