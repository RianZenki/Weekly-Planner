type HeadingProps = {
	title: string;
	text: string;
};

export const Heading = ({ title, text }: HeadingProps) => {
	return (
		<>
			<h2>{title}</h2>
			<p>{text}</p>
		</>
	);
};
