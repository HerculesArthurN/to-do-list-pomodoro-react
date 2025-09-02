import React from "react";
import styled from "styled-components";

const Item = styled.div`
	display:flex;
	flex-direction: column;
	justify-content: space-between;
	background: ${(p) => p.color || '#fff9a8'};
	padding: 0.6rem;
	border-radius: 8px;
	box-shadow: 0 8px 18px rgba(0,0,0,0.12);
	transition: transform 160ms ease, box-shadow 160ms ease;
	&:hover { transform: translateY(-6px) rotate(-1deg); box-shadow: 0 14px 28px rgba(0,0,0,0.18); }
`;


const DragHandle = styled.div`
	width: 18px;
	height: 18px;
	background: rgba(0,0,0,0.12);
	border-radius: 4px;
	display: inline-block;
	margin-right: 8px;
`;

const TaskItem = ({ children, onRemove, color }) => (
	<Item color={color}>
		<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
			<DragHandle aria-hidden />
			<div style={{ flex: 1 }}>{children}</div>
		</div>
		{/* remove button moved to TaskList to avoid duplicate controls */}
	</Item>
);

export default TaskItem;
