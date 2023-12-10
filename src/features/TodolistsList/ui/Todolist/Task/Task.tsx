import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "common/components";
import {TaskStatuses} from "common/enums";
import {TaskType} from "features/TodolistsList/api/tasksApi.types";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {useActions} from "common/hooks";

type Props = {
    task: TaskType;
    todolistId: string;
};

export const Task = React.memo(({task, todolistId}: Props) => {

            const {removeTask, updateTask} = useActions(tasksThunks)
            const removeTaskHandler = () => removeTask({taskId: task.id, todolistId: todolistId})


            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;

                updateTask({
                    taskId: task.id,
                    todolistId: todolistId,
                    domainModel: {status}
                });
            };
            const changeTaskTitleHandler = (title: string) => {
                updateTask({
                    taskId: task.id,
                    todolistId: todolistId,
                    domainModel: {title}
                });

            }


            return (
                <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
                    <Checkbox checked={task.status === TaskStatuses.Completed} color="primary"
                              onChange={changeTaskStatusHandler}/>

                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                    <IconButton onClick={removeTaskHandler}>
                        <Delete/>
                    </IconButton>
                </div>
            );
        }
    )
;
