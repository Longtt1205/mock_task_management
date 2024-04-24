import {
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    EDIT_TASK,
    SEARCH_TASK,
    OVER_DUE,
    STATUS_RESOLVED
} from './constant'

// Importing data from JSON file
import jsonData from './data.json';

// Initial state for the reducer
export const initState = {
    tasks: jsonData,
    task: {},
    allTask: jsonData
}

// Function to get current date in yyyy-MM-dd format
const getDateNow = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

// Reducer function to manage state based on actions
const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                task: action.newTask,
                tasks: [...state.tasks, action.newTask],
                allTask: [...state.allTask, action.newTask]
            }
        case DELETE_TASK:
            const newTasks = [...state.allTask]
            newTasks.splice(action.index, 1)
            return {
                task: {},
                tasks: newTasks,
                allTask: newTasks
            }
        case SEARCH_TASK:
            let searchedTasks = []
            if (action.condition.option === OVER_DUE) {
                // Filter tasks that are overdue and match search criteria
                searchedTasks = state.allTask.filter((task) => {
                    return task.deadline < getDateNow()
                        && task.status !== STATUS_RESOLVED
                        && (task.title.toUpperCase().includes(action.condition.inputSearch.toUpperCase())
                            || task.description.toUpperCase().includes(action.condition.inputSearch.toUpperCase()))
                })
            } else {
                // Filter tasks based on status and match search criteria
                searchedTasks = state.allTask.filter((task) => {
                    return task.status.includes(action.condition.option)
                        && (task.title.toUpperCase().includes(action.condition.inputSearch.toUpperCase())
                            || task.description.toUpperCase().includes(action.condition.inputSearch.toUpperCase()))
                })
            }
            return {
                ...state,
                task: {},
                tasks: searchedTasks,
            }
        case EDIT_TASK:
            return {
                ...state,
                task: action.changeTask
            }
        case UPDATE_TASK:
            const changedTasks = [...state.allTask]
            changedTasks[action.changedTask.id] = action.changedTask
            return {
                task: {},
                tasks: changedTasks,
                allTask: changedTasks
            }
        default:
            throw new Error('Action invalid.')
    }
}

export default reducer;