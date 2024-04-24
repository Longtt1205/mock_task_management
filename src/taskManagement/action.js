import {
	ADD_TASK,
	DELETE_TASK,
	UPDATE_TASK,
	EDIT_TASK,
	SEARCH_TASK
} from './constant'

// Action creator to add a new task
export const addTask = newTask => {
	return {
		type: ADD_TASK,
		newTask
	}
}

// Action creator to delete a task
export const deleteTask = index => {
	return {
		type: DELETE_TASK,
		index
	}
}

// Action creator to search for tasks based on a condition
export const searchTask = condition => {
	console.log(condition)
	return {
		type: SEARCH_TASK,
		condition
	}
}

// Action creator to set a task in edit mode
export const editTask = changeTask => {
	return {
		type: EDIT_TASK,
		changeTask
	}
}

// Action creator to update a task
export const updateTask = changedTask => {
	return {
		type: UPDATE_TASK,
		changedTask
	}
}