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

import Sidebar from "../components/Sidebar";

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

function MyHome({ rooms, deviceCategory, sensorCategory, sensorDataType }) {
	const classes = useStyles();

	const [ open, setOpen ] = useState([]);
	const [ selectedObject, setSelectedObject ] = useState(null);
	const [ misc, setMisc ] = useState({
		add: false
	});
	const [ addObject, setAddObject ] = useState({
		type: 'room',
		name: '',
		ip: '',
		version: ''
	});

	useEffect(() => {
		if (rooms.length > 0) {
			const tmp = [];
			for (let i = 0; i < rooms.length; i++) {
				tmp.push(false);
			}
			setOpen([ ...tmp ]);
		}
	}, [rooms]);

	const modifyObject = target => {
		setAddObject({ ...addObject, [target.name]: target.value });
	};

	const handleRoomClick = index => {
		const tmp = open;
		tmp[index] = !open[index];
		setOpen([ ...tmp ]);
	};

	const toggleDialog = dialog => {
		const tmp = misc[dialog];
		setMisc({ ...misc, [dialog]: !tmp });
	}

	const handleObjectSelection = (object, type) => {
		setSelectedObject({ ...object, type });
	};

	const fetchDeviceData = async () => {
		try {
			const { sensor } = await getRequest(`${api_url}/deviceCategory/${selectedObject.deviceCategoryId}`);
			setSelectedObject({ ...selectedObject, category: sensor });
		} catch (e) {
			console.error('DEVICE', e);
		}
	};

	const fetchSensorData = async () => {
		try {
			const { sensor: category } = await getRequest(`${api_url}/sensorCategory/${selectedObject.sensorCategoryId}`);
			const {sensor: data } = await getRequest(`${api_url}/sensorData/${selectedObject.sensorDataId}`);
			const { sensor: dataType } = await getRequest(`${api_url}/sensorDataType/${selectedObject.sensorDataTypeId}`);

			setSelectedObject({ ...selectedObject, category, data, dataType });
		} catch (e) {
			console.error('SENSOR', e);
		}
	}

	const addElement = async () => {
		let res = { status: 200 };
		console.log('ADD', addObject);
		switch (addObject.type) {
			case 'room':
				const postRoom = { name: addObject.name || '' };
				// res = await postRequest(`${api_url}/api/rooms`, { room: postRoom });
				break;
			case 'device':
				const postDevice = {
					name: addObject.name || '',
					details: addObject.details || '',
					ip: addObject.ip || '',
					version: addObject.version || '',
					categoryId: addObject.category_id || 1,
					roomId: addObject.roomId || 1
				};
				// res = await postRequest(`${api_url}/api/devices`, { device: postDevice });
				break;
			case 'sensor':
				const postSensor = {
					name: addObject.name || '',
					ip: addObject.ip || '',
					version: addObject.version || '',
					categoryId: addObject.categoryId || 1,
					roomId: addObject.roomId || 1,
					dataId: 0,
					dataTypeId: addObject.dataTypeId || 1,
				};
				// res = await postRequest(`${api_url}/api/sensors`, { sensor: postSensor });
				break;
			default: return;
		}
		if (res.status >= 400)
			console.error(res.message)
	}

	useEffect(() => {
		if (selectedObject && !selectedObject.type === 'device') {
			console.log('fetch devices data');
			fetchDeviceData();
		} else if (selectedObject) {
			console.log('fetch sensors data');
			fetchSensorData();
		}
	}, [ selectedObject ]);

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
									{room.device && room.device.map((device, index) => {
										return (
											<List component="div" disablePadding key={device.id}>
												<ListItem button className={classes.nested} onClick={() => handleObjectSelection(device, 'device')}>
													<ListItemIcon>
														<EmojiObjectsIcon style={{ color: '#ffff00' }} />
													</ListItemIcon>
													<ListItemText primary={device.name} />
												</ListItem>
											</List>
										);
									})}
									{room.sensor && room.sensor.map((sensor, index) => {
										return (
											<List component="div" disablePadding key={sensor.id}>
												<ListItem button className={classes.nested} onClick={() => handleObjectSelection(sensor, 'sensor')}>
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
							<div className={"w-full flex flex-col my-8"}>
								<Typography variant={'body1'}>Creation date: {moment(new Date()).format('DD/MM/YYYY')}</Typography>
								<Typography variant={'body1'}>Last activation: {moment(new Date()).format('DD/MM/YYYY')}</Typography>
								<Typography variant={'body1'}>Type: {selectedObject.type}</Typography>
								<Typography variant={'body1'}>Linked scenarios: XXXXXX</Typography>
							</div>
							<div className={"w-full flex flex-row justify-around"}>
								<Button className={"w-1/3 mx-8"}>
									<Card className={"w-full h-full flex flex-col content-center"}>
										<CardContent className={"flex flex-col content-center"}>
											<SettingsIcon className={"self-center"} fontSize={'large'} />
											<Typography variant={'button'}>{selectedObject.type === 'device' ? 'Device Settings' : 'Sensor Settings'}</Typography>
										</CardContent>
									</Card>
								</Button>
								<Button className={"w-1/3 mx-8"}>
									<Card className={"w-full h-full content-center"}>
										<CardContent className={"flex flex-col"}>
											<EqualizerIcon className={"self-center"} fontSize={'large'} />
											<Typography variant={'button'}>{selectedObject.type === 'device' ? 'Device Statistics' : 'Sensor Statistics'}</Typography>
										</CardContent>
									</Card>
								</Button>
								<Button>
									<Card>
										{/* Third Card to fill */}
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
					<div className={"w-full flex flex-row space-x-32"}>
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
						<TextField
							className={"w-1/3"}
							variant={'outlined'}
							name={'name'}
							label={'Name'}
							onChange={e => modifyObject(e.target)}
						/>
					</div>
					<Divider style={{ margin: '16px 0' }} />
					{addObject.type === 'device' || addObject.type === 'sensor' ? (
						<React.Fragment>
							<div className={`w-full flex flex-row space-x-4`}>
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
								<TextField
									className={"w-1/3"}
									select
									variant={'outlined'}
									name={'roomId'}
									label={'Room'}
									onChange={e => modifyObject(e.target)}
								>
									{rooms.map((obj) => {
										return (
											<MenuItem key={obj.id} value={obj.id}>
												{obj.name}
											</MenuItem>
										)
									})}
								</TextField>
							</div>
							<div className={"flex flex-row my-8"}>
								<TextField
									className={"w-2/3"}
									variant={"outlined"}
									name={"details"}
									label={"Description"}
									multiline
									row={3}
									rowsMax={3}
									onChange={e => modifyObject(e.target)}
								/>
							</div>
							{addObject.type === 'device' ? (
								<div className={"w-full flex flex-row space-x-4"}>
									<TextField
										className={"w-1/3"}
										select
										variant={'outlined'}
										name={'category_id'}
										label={'Catégorie'}
										onChange={e => modifyObject(e.target)}
									>
										{deviceCategory.map((obj) => {
											return (
												<MenuItem key={obj.id} value={obj.id}>
													{obj.name}
												</MenuItem>
											)
										})}
									</TextField>
								</div>
							) : (
								<div className={"w-full flex flex-row space-x-4"}>
									<TextField
										className={"w-1/3"}
										select
										variant={'outlined'}
										name={'category_id'}
										label={'Catégorie'}
										onChange={e => modifyObject(e.target)}
									>
										{sensorCategory.map((obj) => {
											return (
												<MenuItem key={obj.id} value={obj.id}>
													{obj.name}
												</MenuItem>
											)
										})}
									</TextField>
									<TextField
										className={"w-1/3"}
										select
										variant={'outlined'}
										name={'dataTypeId'}
										label={'Data type'}
										value={addObject.dataTypeId || 0}
										onChange={e => modifyObject(e.target)}
									>
										{sensorDataType.map((obj) => {
											return (
												<MenuItem key={obj.id} value={obj.id}>
													{obj.name}
												</MenuItem>
											)
										})}
									</TextField>
								</div>
							)}
						</React.Fragment>
					) : null}
				</DialogContent>
				<DialogActions>
					<Button
						variant={'contained'}
						onClick={() => addElement()}
					>
						Valider
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

const api_url = 'http://localhost:3000';
const getRequest = url => axios.get(url).then(res => res.data);
const postRequest = (url, body) => axios.post(url, body).then(res => res.data);
const patchRequest = url => axios.patch(url).then(res => res.data);

export async function getStaticProps(context) {
	const { room } = await getRequest(`${api_url}/api/rooms`);
	for (let r = 0; r < room.length; r++) {
		room[r].devices = [];
		room[r].sensors = [];

		const { device } = await getRequest(`${api_url}/api/rooms/${room[r].id}/devices`);
		const { sensor } = await getRequest(`${api_url}/api/rooms/${room[r].id}/sensors`);

		room[r].device = [ ...device ];
		room[r].sensor = [ ...sensor ];
	}

	const { sensor: device_category } = await getRequest(`${api_url}/api/deviceCategory`);
	const { sensor: sensor_category } = await getRequest(`${api_url}/api/sensorCategory`);
	const { sensor: sensor_data_type } = await getRequest(`${api_url}/api/sensorDataType`);

	return {
		props: {
			rooms: room,
			deviceCategory: device_category ? device_category : [],
			sensorCategory: sensor_category ? sensor_category : [],
			sensorDataType: sensor_data_type ? sensor_data_type : []
		}
	}
}

export default MyHome;