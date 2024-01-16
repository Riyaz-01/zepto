import { useState } from 'react';
import './App.scss';

// utils
import { Person } from './TYPES';
import MultiSelector from './components/MultiSelector/MultiSelector';

function App() {
	const [selected, setSelected] = useState<Person[]>([]);

	const onItemSelect = () => {
		// call api or some other stuff
	};

	return (
		<div id='App'>
			<h1>Pick User</h1>
			<MultiSelector
				list={list}
				selected={selected}
				setSelected={setSelected}
				onItemSelect={onItemSelect}
			/>
		</div>
	);
}

export default App;

const list = [
	{
		id: 1,
		name: 'John Blank',
		email: 'john@blank.com',
		img: '',
	},
	{
		id: 2,
		name: 'Jane Doe',
		email: 'jane@doe.com',
		img: '',
	},
	{
		id: 3,
		name: 'Bill Jones',
		email: 'bill@jones.com',
		img: '',
	},
	{
		id: 4,
		name: 'Mary Johnson',
		email: 'mary@johnson.com',
		img: '',
	},
	{
		id: 5,
		name: 'Tom Brown',
		email: 'tom@brown.com',
		img: '',
	},
	{
		id: 6,
		name: 'Sarah White',
		email: 'sarah@white.com',
		img: '',
	},
	{
		id: 7,
		name: 'Michael Green',
		email: 'michael@green.com',
		img: '',
	},
	{
		id: 8,
		name: 'David Gray',
		email: 'david@gray.com',
		img: '',
	},
	{
		id: 9,
		name: 'Susan Black',
		email: 'susan@black.com',
		img: '',
	},
	{
		id: 10,
		name: 'Peter White',
		email: 'peter@white.com',
		img: '',
	},
];
