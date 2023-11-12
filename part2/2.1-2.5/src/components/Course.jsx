import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
	const header = course.name;
	const content = course.parts;
	return (
		<>
			<Header header={header} />
			<Content content={content} />
			<Total content={content} />
		</>
	);
};

export default Course;
