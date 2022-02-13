import React, { useEffect, useState } from 'react';
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	List,
	Collapse,
	makeStyles,
	Typography,
	Button,
	Card,
	CardContent,
	Dialog,
	Slide,
	DialogTitle,
	DialogContent,
	TextField,
	MenuItem,
	Divider,
	DialogActions
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RoomIcon from '@material-ui/icons/Room';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import BluetoothAudioIcon from '@material-ui/icons/BluetoothAudio';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import moment from 'moment';

import Sidebar from "../Sidebar";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const MyHomeMainComponent = props => {
	const classes = useStyles();

	const [ rooms, setRooms ] = useState([]);
	const [ selectedObject, setSelectedObject ] = useState(null);
	const [ open, setOpen ] = useState([]);
	const [ misc, setMisc ] = useState({
		add: false
	});
	const [ addObject, setAddObject ] = useState({
		type: 'room',
		name: '',
		ip: '',
		version: ''
	});

	const modifyObject = target => {
		setAddObject({ ...addObject, [target.name]: target.value });
	};

	const toggleDialog = dialog => {
		const tmp = misc[dialog];
		setMisc({ ...misc, [dialog]: !tmp });
	}

	const handleRoomClick = index => {
			const tmp = open;
			tmp[index] = !open[index];
			setOpen([ ...tmp ]);
	};

	const handleObjectSelection = async object => {
		const fetchedCategory = await axios.get(`http://localhost:3000/api/deviceCategory/${object.category}`, {});
		setSelectedObject({ ...object, category: fetchedCategory.sensor.name });
	};

	const fetchRoomsTable = async () => {
		const init_tab = [];

		const fetchedRooms = await axios.get('http://localhost:3000/api/rooms', {});
		for (let i = 0; i < fetchedRooms.data.room.length; i++) {
				const room = fetchedRooms.data.room[i];
				const fetchedDevices = await axios.get(`http://localhost:3000/api/rooms/${room.id}/devices`, {});
				const fetchedSensors = await axios.get(`http://localhost:3000/api/rooms/${room.id}/sensors`, {});

				init_tab.push({
						...room,
						devices: fetchedDevices.data.device,
						sensors: fetchedSensors.data.sensor,
				});
		}

		setRooms([ ...init_tab ]);
	};

	useEffect(() => {
			if (rooms.length > 0) {

					const tmp = [];
					for (let i = 0; i < rooms.length; i++) {
							tmp.push(false);
					}
					setOpen([ ...tmp ]);
			}
	}, [rooms]);

	useEffect(() => {
			fetchRoomsTable();
	}, []);

    return (
			<div className={"h-full w-full flex flexrow"}>
				<Sidebar />
				<div className={"w-3/4 flex flex-row"}>
					<div className={"w-1/3 px-16"}>
						<ListItem button onClick={() => toggleDialog('add')}>
							<ListItemIcon>
								<AddIcon style={{ color: '#2A86DB' }} />
							</ListItemIcon>
							<ListItemText primary="Ajouter" />
						</ListItem>
						{rooms.map((room, index) => {
							return (
								<div key={room.id}>
									<ListItem button onClick={() => handleRoomClick(index)}>
										<ListItemIcon>
											<RoomIcon style={{ color: '#ff3d00' }} />
										</ListItemIcon>
										<ListItemText primary={room.name} />
										{(room.devices && room.devices.length > 0 || room.sensors && room.sensors.length > 0) && (open[index] ? <ExpandLess /> : <ExpandMore />)}
									</ListItem>
									<Collapse in={open[index]} timeout="auto" unmountOnExit>
										{room.devices && room.devices.map((device, index) => {
											return (
												<List component="div" disablePadding key={device.id}>
													<ListItem button className={classes.nested} onClick={() => handleObjectSelection(device)}>
														<ListItemIcon>
															<EmojiObjectsIcon style={{ color: '#ffff00' }} />
														</ListItemIcon>
														<ListItemText primary={device.name} />
													</ListItem>
												</List>
											);
										})}
										{room.sensors && room.sensors.map((sensor, index) => {
											return (
												<List component="div" disablePadding key={sensor.id}>
													<ListItem button className={classes.nested} onClick={() => handleObjectSelection(sensor)}>
														<ListItemIcon>
															<BluetoothAudioIcon style={{ color: '#64dd17' }} />
														</ListItemIcon>
														<ListItemText primary={sensor.name} />
													</ListItem>
												</List>
											);
										})}
									</Collapse>
								</div>
							);
						})}
					</div>
					<div className={"w-2/3 h-full p-16"}>
						{selectedObject === null ? (
							<Typography variant={'h5'} className={"m-auto"} style={{ color: '#9e9e9e' }}>No device or sensor selected ...</Typography>
						) : (
							<div className={"w-full h-full flex flex-col"}>
								<div className={"w-full flex flex-col flex-wrap content-center"}>
									<Typography variant={'h5'}>{selectedObject.name}</Typography>
									{!selectedObject.data_id ? (
										<Typography variant={"subtitle1"}>Activé ou Désactivé</Typography>
									) : null}
								</div>
								<div className={"w-full flex flex-col"}>
									<Typography variant={'body1'}>Creation date: {moment(new Date()).format('DD/MM/YYYY')}</Typography>
									<Typography variant={'body1'}>Last activation: {moment(new Date()).format('DD/MM/YYYY')}</Typography>
									<Typography variant={'body1'}>Type: XXXXX</Typography>
									<Typography variant={'body1'}>Linked scenarios: XXXXXX</Typography>
								</div>
								<div className={"w-full flex flex-row"}>
									<Button>
										<Card className={"w-1/3 mx-8 flex flex-col content-center"}>
											<CardContent>
												<SettingsIcon fontSize={'large'} />
												<Typography variant={'button'}>{!selectedObject.data_id ? 'Device Settings' : 'Sensor Settings'}</Typography>
											</CardContent>
										</Card>
									</Button>
									<Button>
										<Card className={"w-1/3 mx-8 flex flex-col content-center"}>
											<CardContent>
												<EqualizerIcon fontSize={'large'} />
												<Typography variant={'button'}>{!selectedObject.data_id ? 'Device Statistics' : 'Sensor Statistics'}</Typography>
											</CardContent>
										</Card>
									</Button>
									<Button>
										<Card>
										
										</Card>
									</Button>
								</div>
							</div>
						)}
				</div>
			</div>
				<Dialog
					open={misc.add}
					fullWidth
					maxWidth={'md'}
					TransitionComponent={Transition}
					onClose={() => toggleDialog('add')}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">Ajouter un élément</DialogTitle>
					<DialogContent>
						<div className={"w-full flex"}>
							<TextField
								className={"w-1/5"}
								variant={'outlined'}
								label={'Type'}
								name={'type'}
								select
								value={addObject.type ||''}
								onChange={e => modifyObject(e.target)}
							>
								{['room', 'device', 'sensor'].map((obj) => {
									return (
										<MenuItem key={obj} value={obj}>
											{obj}
										</MenuItem>
									)
								})}
							</TextField>
						</div>
						<Divider style={{ margin: '16px 0' }} />
						<div className={`w-full flex flex-row ${addObject.type === 'room' ? '' : 'justify-around'} space-x-4`}>
							<TextField
								className={"w-1/3"}
								variant={'outlined'}
								name={'name'}
								label={'Name'}
								onChange={e => modifyObject(e.target)}
							/>
							{addObject.type === 'device' || addObject.type === 'sensor' ? (
								<React.Fragment>
									<TextField
										className={"w-1/3"}
										variant={'outlined'}
										name={'ip'}
										label={'Ip address'}
										onChange={e => modifyObject(e.target)}
									/>
									<TextField
										className={"w-1/3"}
										variant={'outlined'}
										name={'version'}
										label={'Version'}
										onChange={e => modifyObject(e.target)}
									/>
								</React.Fragment>
							) : null}
						</div>
					</DialogContent>
					<DialogActions>

					</DialogActions>
				</Dialog>
		</div>
	);
};

export default MyHomeMainComponent;