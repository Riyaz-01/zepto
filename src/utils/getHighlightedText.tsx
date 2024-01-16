function getHighlightedText(text: string, highlight: string) {
	// Split on highlight term and include term into parts, ignore case
	const parts: string[] = text.split(new RegExp(`(${highlight})`, 'gi'));
	return (
		<span>
			{parts.map((part: string, i: number) => (
				<span
					key={i}
					style={
						part.toLowerCase() === highlight.toLowerCase()
							? { fontWeight: 'normal', color: 'grey' }
							: {}
					}
				>
					{part}
				</span>
			))}
		</span>
	);
}

export default getHighlightedText;
