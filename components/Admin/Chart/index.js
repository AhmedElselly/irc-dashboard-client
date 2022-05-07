import styles from '../../../styles/Chart.module.css';
import {
	ResponsiveContainer,
	AreaChart,
	BarChart,
	Label,
	LabelList,
	Bar,
	linearGradient,
	YAxis,
	XAxis,
	CartesianGrid,
	Tooltip,
	Area
} from 'recharts';
// import { getData } from '../../../actions/postApi';
import { useEffect, useState } from 'react';

const Chart = ({data}) => {
	const [data1, setData1] = useState([]);
	// console.log('data', data)
	useEffect(() => {
		if(data !== undefined){
		setData1([
			{
				'name': 'Session1',
				'session': data.session1.D*10
			},
			{
				'name': 'Session2',
				'session': data.session2.D*10
			},
			{
				'name': 'Session3',
				'session': data.session3.D*10
			},
			{
				'name': 'Session4',
				'session': data.session4.D*10
			},
			{
				'name': 'Session5',
				'session': data.session5.D*10
			},
			{
				'name': 'Session6',
				'session': data.session6.D*10
			},
			{
				'name': 'Session1',
				'session': data.session1.C*10
			},
			{
				'name': 'Session2',
				'session': data.session2.C*10
			},
			{
				'name': 'Session3',
				'session': data.session3.C*10
			},
			{
				'name': 'Session4',
				'session': data.session4.C*10
			},
			{
				'name': 'Session5',
				'session': data.session5.C*10
			},
			{
				'name': 'Session6',
				'session': data.session6.C*10
			},
			{
				'name': 'Session1',
				'session': data.session1.N*10
			},
			{
				'name': 'Session2',
				'session': data.session2.N*10
			},
			{
				'name': 'Session3',
				'session': data.session3.N*10
			},
			{
				'name': 'Session4',
				'session': data.session4.N*10
			},
			{
				'name': 'Session5',
				'session': data.session5.N*10
			},
			{
				'name': 'Session6',
				'session': data.session6.N*10
			},
			{
				'name': '',
				'session': data.session6.t*10
			},
			{
				'name': '',
				'session': data.session6.t*10
			},
			{
				'name': '',
				'session': data.session6.t*10
			},
			{
				'name': 'Test Marks',
				'session': 80
			},
		])
		}
	}, []);


	return(
		<div className={styles.container}>
			<span style={{marginLeft: 50}}>Progress</span>
			    
			<BarChart 
			width={1030} 
			height={350} 
			data={data1} 
			margin={{ top: 15, right: 30, left: 20, bottom: 75 }}
			>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis angle={-90} textAnchor='end' dataKey="name">
				<Label value="Program involvement" offset={-70} position="insideBottomLeft" />
				<Label value="Creativity" offset={-70} position="insideBottom" />
				<Label value="NOTEBOOK MAINTENANCE" offset={-70} position="insideBottomRight" />
			</XAxis>
			<YAxis label={{ angle: -90, position: 'insideLeft' }} />
			<Bar barSize={20} dataKey="session" fill="#8884d8">
				{/* <LabelList dataKey="name" position="top" /> */}
			</Bar>
			</BarChart>
		</div>
	)
}

const CustomizedLabel = ({x, y, stroke, value}) => {
		
	return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>

};

// const data = [
// 	{
// 		"name": "Session 1",
// 		"uv": 4000,
// 		"pv": 2400,
// 		"amt": 2400
// 	},
// 	{
// 		"name": "Session 2",
// 		"uv": 3000,
// 		"pv": 1398,
// 		"amt": 2210
// 	},
// 	{
// 		"name": "Session 3",
// 		"uv": 2000,
// 		"pv": 9800,
// 		"amt": 2290
// 	},
// 	{
// 		"name": "Session 4",
// 		"uv": 2780,
// 		"pv": 3908,
// 		"amt": 2000
// 	},
// 	{
// 		"name": "Session 5",
// 		"uv": 1890,
// 		"pv": 4800,
// 		"amt": 2181
// 	},
// 	{
// 		"name": "Session 6",
// 		"uv": 2390,
// 		"pv": 3800,
// 		"amt": 2500
// 	},
// 	{
// 		"name": "Session 1",
// 		"uv": 3490,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 2",
// 		"uv": 1890,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 3",
// 		"uv": 3490,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 4",
// 		"uv": 1890,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 5",
// 		"uv": 3490,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 6",
// 		"uv": 1890,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 1",
// 		"uv": 3490,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 2",
// 		"uv": 1890,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 3",
// 		"uv": 3490,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 4",
// 		"uv": 1890,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 5",
// 		"uv": 3490,
// 		"pv": 4300,
// 		"amt": 2100
// 	},
// 	{
// 		"name": "Session 6",
// 		"uv": 1890,
// 		"pv": 4300,
// 		"amt": 2100
// 	}
// ];

// export const getServerSideProps = async ctx => {
	// const res = await getData()
	// return {
	// 	props: {
	// 		data: res.data
	// 	}
	// }
// }

export default Chart;