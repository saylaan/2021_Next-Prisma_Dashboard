import React, { useEffect, useState } from 'react';
import { Divider } from '@material-ui/core';
import Link from 'next/link';
import {
    Card,
    Typography,
    AppBar,
    Toolbar,
    Icon
} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';


const Sidebar = props => {
    return (
        <div className={"w-1/4 h-full flex flex-col p-4 shadow-md"}>
            <div className={"w-full h-2/8"} position='fixed'>
            {/* <div className={"w-full h-full flex flex-row space-x-8 py-16 px-8"}> */}
            <Link href={"/index"}>
                    <a className={"w-1/3"}>
                        <Card className={"h-full flex flex-col justify-center"}>
                        <center>
                        <DashboardRoundedIcon fontSize='large'></DashboardRoundedIcon>
                            <Typography variant={'h5'}>Dashboard</Typography>
                            </center>
                        </Card>
                    </a>
                </Link>
                <Link href={"/home"}>
                    <a className={"w-1/3"}>
                        <Card className={"h-full flex flex-col justify-center"}>
                        <center>
                        <HomeRoundedIcon fontSize='large'></HomeRoundedIcon>
                            <Typography variant={'h5'}>My Home</Typography>
                            </center>
                        </Card>
                    </a>
                </Link>
                <Link href={"/settings"}>
                    <a className={"w-1/3"}>
                        <Card className={"h-full flex flex-col justify-center"}>
                        <center>
                            <SettingsRoundedIcon fontSize='large'></SettingsRoundedIcon>
                            <Typography variant={'h5'}>My Settings</Typography>
                            </center>
                        </Card>
                    </a>
                </Link>
                <Link href={"/statistics"}>
                    <a className={"w-1/3"}>
                        <Card className={"h-full flex flex-col justify-center"}>
                        <center>
                        <EqualizerRoundedIcon fontSize='large'></EqualizerRoundedIcon>
                            <Typography variant={'h5'}>My Statistics</Typography>
                            </center>
                        </Card>
                    </a>
                </Link>
            </div>
            <Divider className={"px-4"} />
        </div>
    );
};

export default Sidebar;