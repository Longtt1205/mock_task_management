import { useReducer, useRef, useState } from 'react'
import reducer, { initState } from './reducer'
import {
    addTask,
    deleteTask,
    searchTask,
    editTask,
    updateTask
} from './action'
import {
    DISPLAY_BUTTON_ADD,
    DISPLAY_BUTTON_UPDATE,
    DISPLAY_FILTER_OPTION,
    STATUS_OPEN
} from './constant'
import styles from './index.module.css'

function TaskManagement() {

    const [state, dispatch] = useReducer(reducer, initState)
    const { tasks, task } = state
    const [displayButton, setDisplayButton] = useState(DISPLAY_BUTTON_ADD)


    const titleRef = useRef()
    const descriptionRef = useRef()
    const deadlineRef = useRef()
    const searchRef = useRef()
    const selectRef = useRef()

    // If in edit mode, populate input fields with task data
    if (displayButton === DISPLAY_BUTTON_UPDATE) {
        titleRef.current.value = task.title
        descriptionRef.current.value = task.description
        deadlineRef.current.value = task.deadline
    }

    // Function to handle adding a new task
    const handleAddTask = () => {
        const newTask = {
            status: STATUS_OPEN,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            deadline: deadlineRef.current.value
        }
        // Validation for required fields
        if (!newTask.title) {
            alert('Title is a required field.')
            return;
        }
        if (!newTask.description) {
            alert('Description is a required field.')
            return;
        }
        if (!newTask.deadline) {
            alert('Deadline is a required field.')
            return;
        }
        // Clear input fields after adding task
        titleRef.current.value = ''
        descriptionRef.current.value = ''
        deadlineRef.current.value = ''

        dispatch(addTask(newTask))
    }

    // Function to handle deleting a task
    const handleDelete = (index) => {
        dispatch(deleteTask(index))
    }

    // Function to handle searching tasks
    const handleSearch = () => {
        const condition = {
            inputSearch: searchRef.current.value,
            option: selectRef.current.value
        }
        dispatch(searchTask(condition))
    }

    // Function to handle editing a task
    const handleEditTask = (task, index) => {
        const changeTask = {
            ...task,
            id: index,
        }
        setDisplayButton(DISPLAY_BUTTON_UPDATE)
        dispatch(editTask(changeTask))
    }

    // Function to handle updating a task
    const handleUpdateTask = () => {
        const changedTask = {
            id: task.id,
            status: task.status,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            deadline: deadlineRef.current.value
        }
        setDisplayButton(DISPLAY_BUTTON_ADD)
        titleRef.current.value = ''
        descriptionRef.current.value = ''
        deadlineRef.current.value = ''
        dispatch(updateTask(changedTask))
    }

    return (
        <div>
            {/* Add Task Form */}
            <div className={styles.addTaskContainer}>
                <input
                    ref={titleRef}
                    placeholder='Input task name'
                />
                <input
                    ref={descriptionRef}
                    placeholder='Input description'
                />
                <input type='date'
                    ref={deadlineRef}
                />
                {/* Display Add or Update button based on mode */}
                {displayButton === DISPLAY_BUTTON_ADD && <button onClick={handleAddTask}>
                    Add Task
                </button>}
                {displayButton === DISPLAY_BUTTON_UPDATE && <button onClick={handleUpdateTask}>
                    Update
                </button>}
            </div>
            {/* Search Form */}
            <div className={styles.searchContainer}>
                <div>
                    <select ref={selectRef} onChange={handleSearch}>
                        <option value="">--Filter task--
                        </option>
                        {/* Display filter options */}
                        {DISPLAY_FILTER_OPTION.map((option, index) =>
                            <option key={index} value={option} >{option}
                            </option>
                        )}
                    </select>
                </div>
                <div>
                    <input
                        placeholder='search'
                        ref={searchRef}
                    />
                    <button onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            {/* Task List */}
            <div>
                <div className={styles.record}>
                    <span className={styles.centerContent}>Title</span>
                    <span className={styles.centerContent}>Description</span>
                    <span className={styles.centerContent}>Deadline</span>
                    <span className={styles.centerContent}>Status</span>
                </div>
                <div>
                    {/* Display tasks */}
                    {tasks.map((task, index) =>
                        <div className={styles.record} key={index}>
                            <h5>{task.title}</h5>
                            <span className={styles.centerContent}>{task.description}</span>
                            <span className={styles.centerContent}>{task.deadline}</span>
                            <span className={styles.centerContent}>{task.status}</span>
                            {/* Delete button */}
                            <button
                                className={styles.deleteButton}
                                onClick={() => {
                                    handleDelete(index)
                                }}
                            >Delete</button>
                            {/* Edit button */}
                            <button
                                className={styles.editButton}
                                onClick={() => {
                                    handleEditTask(task, index)
                                }}
                            >Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskManagement;