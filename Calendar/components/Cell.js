export default function Cell({children, specificClass, onClick}) {

	return (
		<div onClick={onClick} className={specificClass ? "calendar--cell " + specificClass : "calendar--cell"}>
			{children}
		</div>
	);
}