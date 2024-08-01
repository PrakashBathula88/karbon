import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { moveTask } from "../../redux/TasksSlice";
import "../KanBoard/KanBoard.css";

const KanBoardColumns = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.kanban);
  const [searchQuery, setSearchQuery] = useState("");

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    dispatch(
      moveTask({
        source: {
          droppableId: source.droppableId,
          index: source.index,
        },
        destination: {
          droppableId: destination.droppableId,
          index: destination.index,
        },
      })
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredTasks = (tasks) => {
    if (!searchQuery) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery) ||
        task.description.toLowerCase().includes(searchQuery)
    );
  };

  return (
    <div className="main-container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanboard-columns-header">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="kanboard-column"
                >
                  <h2>{columnId}</h2>
                  <div className="kanboard-items">
                    {filteredTasks(columnTasks).map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-item"
                          >
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanBoardColumns;
