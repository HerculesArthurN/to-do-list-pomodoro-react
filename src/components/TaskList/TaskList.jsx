import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import TaskItem from "./TaskItem";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const floatIn = keyframes`
  from { transform: translateY(10px) scale(0.98); opacity: 0 }
  to { transform: translateY(0) scale(1); opacity: 1 }
`;

const Wrapper = styled.section`
  max-width: 720px;
  margin: 1.5rem auto 3rem auto;
  padding: 0 1rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
`;

const Add = styled.button`
  background: #2ecc71;
  color: #fff;
  border: none;
  padding: 0 1rem;
  border-radius: 8px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
`;

const PostIt = styled.div`
  background: #fff9a8;
  min-height: 96px;
  padding: 0.8rem;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.12);
  transform-origin: center;
  animation: ${floatIn} 360ms ease both;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NoteText = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.95rem;
  color: #222;
`;

const ControlRow = styled.div`
  display:flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SmallButton = styled.button`
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  cursor: pointer;
`;

const LOCAL_KEY = "pomodoro.tasks.v1";

const COLORS = ['#fff9a8', '#ffd7a8', '#c6f7d9', '#d6e5ff', '#ffe6f0'];

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItem {...props} />
    </div>
  );
}

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks)); } catch {}
  }, [tasks]);

  const addTask = () => {
    if (text.trim()) {
  setTasks([{ id: Date.now(), text, color: COLORS[tasks.length % COLORS.length] }, ...tasks]);
      setText("");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex(t => t.id === active.id);
      const newIndex = tasks.findIndex(t => t.id === over.id);
      const newArr = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newArr);
    }
  };

  const changeColor = (id, color) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, color } : t));
  };

  return (
    <Wrapper>
      <InputRow>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nova tarefa..."
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <Add onClick={addTask}>Adicionar</Add>
      </InputRow>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <Grid>
            {tasks.map((task) => (
              <div key={task.id} style={{ transform: `rotate(${(task.id % 7) - 3}deg)` }}>
                <SortableItem id={task.id} onRemove={() => removeTask(task.id)} color={task.color}>
                  <NoteText style={{ textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.6 : 1 }}>{task.text}</NoteText>
                  <ControlRow>
                    <SmallButton onClick={() => toggleDone(task.id)}>{task.done ? 'Desfazer' : 'Concluir'}</SmallButton>
                    <SmallButton onClick={() => removeTask(task.id)} style={{ background: '#e74c3c', color: '#fff' }}>Remover</SmallButton>
                  </ControlRow>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    {COLORS.map(c => (
                      <div key={c} onClick={() => changeColor(task.id, c)} style={{ width:18, height:18, background:c, borderRadius:4, cursor:'pointer', border: task.color === c ? '2px solid rgba(0,0,0,0.2)' : '1px solid rgba(0,0,0,0.06)' }} />
                    ))}
                  </div>
                </SortableItem>
              </div>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </Wrapper>
  );
};

export default TaskList;
