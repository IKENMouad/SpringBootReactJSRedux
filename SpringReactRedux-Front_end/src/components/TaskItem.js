import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { deleteTasksAction } from "../actions/taskActions";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TaskItem extends Component {

    _onDeleteTask = (id) => {
        this.props.deleteTasksAction(id)
    }

    render() {
        const { id, summary, acceptanceCriteria } = this.props.task
        return (
            <div >
                <div className="card mb-1 bg-light">
                    <div className="card-header text-primary">
                        ID: {id}
                    </div>
                    <div className="card-body bg-light">
                        <h5 className="card-title">{summary}</h5>
                        <p className="card-text text-truncate "> {acceptanceCriteria} </p>
                        <Link to={`/task/${id}`} className="btn btn-primary"> View / Update </Link>
                        <button className="btn btn-danger ml-4" onClick={this._onDeleteTask.bind(this, id)}> Delete </button>
                    </div>
                </div>
            </div>
        )
    }
}
TaskItem.propTypes = {
    deleteTasksAction: PropTypes.func.isRequired,
}
export default
    connect(null, { deleteTasksAction })
        (TaskItem);