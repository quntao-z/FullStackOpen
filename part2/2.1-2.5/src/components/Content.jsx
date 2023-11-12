import Part from "./Part";

const Content = ({ content }) => {
	return (
		<>
			{content.map((part) => (
				<Part name={part.name} exercises={part.exercises} key={part.id} />
			))}
		</>
	);
};

export default Content;
