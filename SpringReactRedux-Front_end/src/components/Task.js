import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTasksAction } from '../actions/taskActions';

class Task extends Component {

    componentDidMount() {
        this.props.getTasksAction()
    }
    render() {
        const myTasks = this.props.myTasks.tasks;

        let TaskContent;
        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];
        const taskAlgorithm = (myTasks) => {
            if (myTasks.length < 1) {
                return (
                    <div className="alert alert-info" role="alert" >
                        <strong>there's no task </strong>
                    </div>
                )
            } else {
                const tasks = myTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))
                for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i].props.task.status === "TO_DO") {
                        todoItems.push(tasks[i])
                    }
                    if (tasks[i].props.task.status === "IN_PROGRESS") {
                        inProgressItems.push(tasks[i])
                    }
                    if (tasks[i].props.task.status === "DONE") {
                        doneItems.push(tasks[i])
                    }
                }
                return (
                    <React.Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-secondary text-white">
                                            <h3>TO DO</h3>
                                        </div>
                                    </div>
                                    {todoItems}
                                </div>
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-primary text-white">
                                            <h3>In Progress</h3>
                                        </div>
                                    </div>
                                    {inProgressItems}
                                </div>
                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-success text-white">
                                            <h3>Done</h3>
                                        </div>
                                    </div>
                                    {doneItems}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
        }
        TaskContent = taskAlgorithm(myTasks)


        return (
            <div className="mt-5">
                <div className="container">
                    <Link to="/addTask" className="btn btn-primary mb-3">
                        <i className="fa fa-plus-circle"> Create New Task</i>
                    </Link>
                    <br /> <hr />
                </div>
                {TaskContent}
            </div>
        )
    }
}

Task.propTypes = {
    getTasksAction: PropTypes.func.isRequired,
    myTasks: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        myTasks: state.task
    }
}
export default
    connect(mapStateToProps, { getTasksAction })
        (Task);