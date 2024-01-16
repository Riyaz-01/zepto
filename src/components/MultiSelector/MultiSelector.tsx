import React, { useRef, useState } from 'react';

// sass
import './MultiSelector.scss';

// utils
import { Person } from '../../TYPES';
import getImgFromName from '../../utils/getImgFromName';
import useOutsideClick from '../../utils/useOutsideClick';
import getHighlightedText from '../../utils/getHighlightedText';

type Props = {
	list: Person[];
	selected: Person[];
	setSelected: React.Dispatch<React.SetStateAction<Person[]>>;
	onItemSelect: (item: Person) => void;
};

const MultiSelector = ({
	list = [],
	selected = [],
	setSelected = () => {},
	onItemSelect = () => {},
}: Props) => {
	const [search, setSearch] = useState('');
	const [showList, setShowList] = useState(false);
	const [isLastSelected, setIsLastSelected] = useState(false);
	const input = useRef<HTMLInputElement>(null);
	const searchContainer = useRef<HTMLDivElement>(null);

	useOutsideClick(searchContainer, () => {
		setShowList(false);
	});

	const handleInput = (e: any) => {
		setSearch(e.target.value);
		setIsLastSelected(false);
	};
	const isSelected = (item: Person) => {
		return selected.find((i) => i.id === item.id);
	};
	const isSearched = (item: Person) => {
		return (
			item.name.toLowerCase().includes(search.toLowerCase()) || search === ''
		);
	};

	const removeItem = (id: number) => {
		setSelected(selected.filter((item) => item.id !== id));
		setIsLastSelected(false);
		input.current?.focus();
	};
	const handleItemSelect = (item: Person) => {
		setSelected([...selected, item]);
		onItemSelect(item);
		setSearch('');
		input.current?.focus();
	};
	const removeLast = (e: any) => {
		console.log(e.key, selected, { search }, { isLastSelected });
		if (e.key === 'Backspace' && search === '')
			if (isLastSelected) {
				const temp = selected;
				temp.pop();
				console.log({ temp });
				setSelected(temp);
				setIsLastSelected(false);
				return;
			} else setIsLastSelected(true);
	};

	return (
		<div className='multi-select-container'>
			{selected.map((item, index) => {
				return (
					<Selected
						item={item}
						handleCrossClick={removeItem}
						isSelected={index == selected.length - 1 && isLastSelected}
					/>
				);
			})}

			<div className='multi-select-input-container' ref={searchContainer}>
				<input
					className='multi-select-search'
					type='text'
					placeholder='Add new user...'
					value={search}
					onFocus={() => setShowList(true)}
					onChange={handleInput}
					onKeyDown={removeLast}
					ref={input}
				/>
				{showList && (
					<div className='multi-select-list'>
						{list.map((item) => {
							if (isSelected(item)) return;
							if (!isSearched(item)) return;
							return (
								<Item
									item={item}
									onItemSelect={handleItemSelect}
									search={search}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default MultiSelector;

const Selected = ({
	item = { id: 0, name: '', email: '', img: '' },
	handleCrossClick = () => {},
	isSelected = false,
}: {
	item: Person;
	handleCrossClick: (id: number) => void;
	isSelected: boolean;
}) => {
	return (
		<div className={'multi-select-selected-item ' + (isSelected && 'selected')}>
			<img
				src={item.img ? item.img : getImgFromName(item.name)}
				alt=''
				className='avatar'
			/>
			<div className='name'>{item.name}</div>

			<button className='cross' onClick={() => handleCrossClick(item.id)}>
				×
			</button>
		</div>
	);
};

const Item = ({
	item = { id: 0, name: '', email: '', img: '' },
	onItemSelect = () => {},
	search = '',
}: {
	item: Person;
	onItemSelect: (item: Person) => void;
	search: string;
}) => {
	return (
		<button className='multi-select-item' onClick={() => onItemSelect(item)}>
			<img
				src={item.img ? item.img : getImgFromName(item.name)}
				alt=''
				className='avatar'
			/>
			<div className='name'>{getHighlightedText(item.name, search)}</div>
			<div className='email'>{item.email}</div>
		</button>
	);
};
