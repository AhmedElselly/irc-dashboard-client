import { useState, forwardRef } from 'react';
import styles from '../../../styles/CourseEdit.module.css';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { update, getCourse } from '../../../actions/courseApi';
import Sidebar from '../../../components/Admin/Sidebar';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CourseForm = ({course}) => {
	console.log(course)
	const [bluetoothCheck, setBluetoothCheck] = useState(false);
	const [uploadCheck, setUploadCheck] = useState(false);
	const [serialportCheck, setSerialportCheck] = useState(false);
	const [realtimeCheck, setRealtimeCheck] = useState(false);
	const [cppCheck, setCppCheck] = useState(false);
	const [cCheck, setCCheck] = useState(false);
	const [blockCheck, setBlockCheck] = useState(false);
	const [pythonCheck, setPythonCheck] = useState(false);
	const [featuredCheck, setFeaturedCheck] = useState(false);
	const [disabledCheck, setDisabledCheck] = useState(false);
	const [useAutoScanCheck, setUseAutoScanCheck] = useState(false);
	const [initialConnectionRequiredCheck, setInitialConnectionRequiredCheck] = useState(false);
	const [launchPeripheralConnectionFlowCheck, setLaunchPeripheralConnectionFlowCheck] = useState(false);
	const [programMode, setProgramMode] = useState([]);
	const [programLanguage, setProgramLanguage] = useState([]);
  const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	
	const [values, setValues] = useState({
		name: course.name ? course.name :'',
		image: '',
		description: course.description ? course.description :'',
		helpLink: course.helpLink ? course.helpLink :'',
		learnMore: course.learnMore ? course.learnMore :'',
		type: course.type ? course.type :'',
		bluetoothRequired: course.bluetoothRequired ? course.bluetoothRequired : bluetoothCheck,
		upload: course.upload ? course.upload : uploadCheck,
		useAutoScan: course.useAutoScan ? course.useAutoScan : useAutoScanCheck,
		manufactor: course.manufactor ? course.manufactor :'',
		defaultBaudRate: course.defaultBaudRate ? course.defaultBaudRate :'',
		featured: course.featured ? course.featured : featuredCheck,
		serialportRequired: course.serialportRequired ? course.serialportRequired : serialportCheck,
		initialConnectionRequired: course.initialConnectionRequired ? course.initialConnectionRequired : initialConnectionRequiredCheck,
		launchPeripheralConnectionFlow: course.launchPeripheralConnectionFlow ? course.launchPeripheralConnectionFlow : launchPeripheralConnectionFlowCheck,
		realtime: course.realtime ? course.realtime : realtimeCheck,
		disabled: course.disabled ? course.disabled : disabledCheck,
		cpp: course.programLanguage.includes('cpp') ? true : cppCheck,
		c: course.programLanguage.includes('c') ? true : cCheck,
		python: course.programLanguage.includes('python') ? true : pythonCheck,
		block: course.programLanguage.includes('block') ? true : blockCheck,
		// programMode: [],
		// programLanguage: ''
	});

	const {
		name,
		image,
		description,
		helpLink,
		learnMore,
		type,
		bluetoothRequired,
		upload,
		manufactor,
		defaultBaudRate,
		serialportRequired,
		initialConnectionRequired,
		realtime,
		featured,
		disabled,
		useAutoScan,
		// programMode,
		cpp,
		c,
		python,
		block,
		// programLanguage
	} = values;

	console.log('featured', featured)

	const handleChange = e => {
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		setValues({...values, [e.target.name]: value});
		// if(e.target.name === 'programMode') {
			// setProgramMode([...programMode, ])
		// }
	}

	const handleCheck = e => {
		if(e.target.name === 'bluetoothRequired') {
			setBluetoothCheck(!bluetoothCheck);
			setValues({...values, bluetoothRequired: !bluetoothCheck})
		} 
		
		if(e.target.name === 'featured') {
			setFeaturedCheck(!featuredCheck);
			setValues({...values, featured: !featuredCheck})
		} 
		
		if(e.target.name === 'realtime') {
			setRealtimeCheck(!realtimeCheck);
			setValues({...values, realtime: !realtimeCheck})
		} 
		
		if(e.target.name === 'disabled') {
			setDisabledCheck(!disabledCheck);
			setValues({...values, disabled: !disabledCheck})
		} 
		
		// if(e.target.name === 'plugin') {
		// 	setPluginCheck(!pluginCheck);
		// 	setValues({...values, plugin: !pluginCheck})
		// } 
		if(e.target.name === 'useAutoScan') {
			setUseAutoScanCheck(!useAutoScanCheck);
			setValues({...values, useAutoScan: !useAutoScanCheck})
		} 

		if(e.target.name === 'serialportRequired') {
			setSerialportCheck(!serialportCheck);
			setValues({...values, serialportRequired: !serialportCheck})
		} 
		
		if(e.target.name === 'initialConnectionRequired') {
			setInitialConnectionRequiredCheck(!initialConnectionRequiredCheck);
			setValues({...values, initialConnectionRequired: !initialConnectionRequiredCheck})
		} 

		if(e.target.name === 'launchPeripheralConnectionFlow') {
			setLaunchPeripheralConnectionFlowCheck(!launchPeripheralConnectionFlowCheck);
			setValues({...values, launchPeripheralConnectionFlow: !launchPeripheralConnectionFlowCheck})
		} 
	
	}

	const handleProgramLanguage = e => {
		console.log('programMode', e.target.id)
		let newArray = [...programLanguage, e.target.id];
		if(programLanguage.includes(e.target.id)){
			newArray = newArray.filter(m => m !== e.target.id);
		}

		setProgramLanguage(newArray);
	}

	const handleProgramMode = e => {
		console.log('programMode', e.target.id)
		let newArray = [...programMode, e.target.id];
		if(programMode.includes(e.target.id)){
			newArray = newArray.filter(m => m !== e.target.id);
		}

		setProgramMode(newArray);
	}
	console.log(programLanguage)
	console.log(programMode)

	const handleSubmit = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', name);
		formData.append('image', image);
		formData.append('description', description);
		formData.append('helpLink', helpLink);
		formData.append('learnMore', learnMore);
		formData.append('type', type);
		formData.append('manufactor', manufactor);
		formData.append('featured', featured);
		formData.append('disabled', disabled);
		formData.append('useAutoScan', useAutoScan);
		formData.append('bluetoothRequired', bluetoothRequired);
		formData.append('initialConnectionRequired', initialConnectionRequired);
		// formData.append('plugin', plugin);
		formData.append('defaultBaudRate', defaultBaudRate);
		formData.append('serialportRequired', serialportRequired);
		formData.append('programMode', programMode);
		formData.append('programLanguage', programLanguage);
		console.log('featured', programMode)
		console.log('featured', programLanguage)
		update(course._id, formData).then(res => {
			console.log(res.data);
			setMessage(res.data.message);
			setOpen(true);
		});

	}

	const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Sidebar/>
			</div>
			<div className={styles.right}>

			
			<div className={styles.top}>
				<h1 className={styles.title}>Update a device</h1>
			</div>
			<div className={styles.bottom}>
				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label className={`${styles.label} ${styles.required}`} htmlFor='title'>Name</label>
						<input type='text' name='name' value={name} className={styles.input} onChange={handleChange} />
					</div>
					<div className={styles.formGroup}>
						<label className={styles.labelFile} htmlFor='file'>
							Image: <DriveFolderUploadOutlinedIcon className={styles.icon}/>
						</label>
						<input type='file' name='image' hidden id='file' className={styles.inputFile} onChange={handleChange}/>
						<span>{image && image.name}</span>
					</div>
					<div className={styles.formGroup}>
						<label className={`${styles.label} ${styles.required}`} htmlFor='description'>Description</label>
						<textarea type='text' name='description' value={description} className={styles.textArea} onChange={handleChange}></textarea>
					</div>
					<div className={styles.formGroup}>
						<label className={`${styles.label} ${styles.required}`} htmlFor='manufactor'>Manufactor</label>
						<input type='text' name='manufactor' value={manufactor} className={styles.input} onChange={handleChange} />
					</div>
					<div className={styles.formGroup}>
						<label className={`${styles.label} ${styles.required}`} htmlFor='manufactor'>Help Link</label>
						<input type='text' name='helpLink' value={helpLink} className={styles.input} onChange={handleChange} />
					</div>
					<div className={styles.formGroup}>
						<label className={`${styles.label} ${styles.required}`} htmlFor='manufactor'>Lear More</label>
						<input type='text' name='learnMore' value={learnMore} className={styles.input} onChange={handleChange} />
					</div>
					<div className={styles.formGroup}>
						<label className={`${styles.label} ${styles.required}`} htmlFor='manufactor'>Type</label>
						<input type='text' name='type' value={type} className={styles.input} onChange={handleChange} />
					</div>
					<div className={styles.formGroup}>
						<label className={`${styles.label} ${styles.required}`} htmlFor='defaultBaudRate'>Default Baud Rate</label>
						<input type='text' name='defaultBaudRate' value={defaultBaudRate} className={styles.input} onChange={handleChange} />
					</div>
					<div className={styles.formGroup}>
						<label className={`${styles.label} ${styles.required}`} htmlFor='requires'>Requires</label>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' name='featured' value={featured} 
							defaultChecked={featured} className={styles.checkbox} check={featuredCheck} onChange={handleCheck} />
							<label className={`${styles.labelCheckbox}`} htmlFor='requires'>Featured</label>
						</div>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' name='disabled' value={disabled} className={styles.checkbox} defaultChecked={disabled} check={disabledCheck} onChange={handleCheck} />
							<label className={`${styles.labelCheckbox}`} htmlFor='requires'>Disabled</label>
						</div>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' name='bluetoothRequired' value={bluetoothRequired} defaultChecked={bluetoothRequired} className={styles.checkbox} check={bluetoothCheck} onChange={handleCheck} />
							<label className={`${styles.labelCheckbox}`} htmlFor='requires'>Bluetooth</label>
						</div>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' name='serialportRequired' value={serialportRequired} defaultChecked={serialportRequired} className={styles.checkbox} check={serialportCheck} onChange={handleCheck} />
							<label className={`${styles.labelCheckbox}`} htmlFor='serialportRequired'>Serial Port</label>
						</div>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' name='initialConnectionRequired' value={initialConnectionRequired} defaultChecked={initialConnectionRequired} className={styles.checkbox} check={initialConnectionRequiredCheck} onChange={handleCheck} />
							<label className={`${styles.labelCheckbox}`} htmlFor='serialportRequired'>Initial Connection Required</label>
						</div>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' name='useAutoScan' check={useAutoScanCheck} defaultChecked={useAutoScan} value={useAutoScan} className={styles.checkbox} onChange={handleCheck} />
							<label className={`${styles.labelCheckbox}`} htmlFor='requires'>Use Auto Scan</label>
						</div>
					</div>
					<div className={styles.formGroup}>
					<label className={`${styles.label} ${styles.required}`} htmlFor='programMode'>Program Mode</label>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' id='realtime' name='realtime' value={realtime} defaultChecked={realtime} className={styles.checkbox} check={realtimeCheck} onChange={handleProgramMode} />
							<label className={`${styles.labelCheckbox}`} htmlFor='realtime'>Realtime</label>
						</div>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' id='upload' name='upload' check={uploadCheck} defaultChecked={upload} value={upload} className={styles.checkbox} onChange={handleProgramMode} />
							<label className={`${styles.labelCheckbox}`} htmlFor='upload'>Upload</label>
						</div>
					</div>
					<div className={styles.formGroup}>
						<label className={`${styles.label} ${styles.required}`} htmlFor='programLanguage'>Programming Language</label>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' id='cpp' name='cpp' defaultChecked={cpp} check={cppCheck} value={cpp} className={styles.checkbox} onChange={handleProgramLanguage} />
							<label className={`${styles.labelCheckbox}`} htmlFor='cpp'>CPP</label>
						</div>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' id='python' name='python' check={pythonCheck} defaultChecked={python} value={python} className={styles.checkbox} onChange={handleProgramLanguage} />
							<label className={`${styles.labelCheckbox}`} htmlFor='python'>Python</label>
						</div>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' id='c' name='c' defaultChecked={c} check={cCheck} value={c} className={styles.checkbox} onChange={handleProgramLanguage} />
							<label className={`${styles.labelCheckbox}`} htmlFor='c'>C Language</label>
						</div>
						<div className={styles.checkboxContainer}>
							<input type='checkbox' id='block' name='block' defaultChecked={block} check={blockCheck} value={block} className={styles.checkbox} onChange={handleProgramLanguage} />
							<label className={`${styles.labelCheckbox}`} htmlFor='block'>Block Language</label>
						</div>
						{/* <input type='text' name='programLanguage' value={programLanguage} className={styles.input} onChange={handleChange} /> */}
						{/* <select name='programLanguage' value={programLanguage} onChange={handleChange}>
							<option value='Javascript'>Javascript</option>
							<option value='C_CPP'>C_CPP</option>
						</select> */}
					</div>
					<button className={styles.btn}>Update device</button>
				</form>
			</div>
			{open && (
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
						{message}
					</Alert>
				</Snackbar>
			)}
		</div>
		</div>
	)
}

export const getServerSideProps = async ctx => {
	const res = await getCourse(ctx.query.id);
	console.log(res.data)
	return {
		props: {
			course: res.data
		}
	}
}

export default CourseForm;