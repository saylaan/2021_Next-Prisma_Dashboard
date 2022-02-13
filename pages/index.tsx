import React from 'react';
import Link from 'next/link';
import {
    Card,
    Typography,
    AppBar,
    Toolbar
} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div className={"w-full h-full flex flex-row"}>
        <Sidebar />
        <div className={"w-3/4 h-full flex flex-col"}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={"m-auto"} variant={'h5'}>J.A.R.V.I.S.</Typography>
                </Toolbar>
            </AppBar>
            <div className={"w-full h-full flex flex-row space-x-8 py-16 px-8"}>
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
        </div>
    </div>
  )
}
