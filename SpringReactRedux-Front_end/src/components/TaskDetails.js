import React, { Component } from 'react'
import { getTaskAction, addTaskAction } from "../actions/taskActions";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import classnames from "classnames";


class TaskDetails extends Component {
    constructor(props) {
        super(props);
        const id = this.props.match.params.id
        this.state = {
            id,
            summary: '',
            acceptanceCriteria: '',
            status: '',
            errors: {},
            edit: false
        }
        this._onChange = this._onChange.bind(this);
        this._onGetTask = this._onGetTask.bind(this);
        this._onUpdateTask = this._onUpdateTask.bind(this);
        this._onEditTask = this._onEditTask.bind(this)
    }
    componentWillReceiveProps (nextProps) {
        const { id, summary, acceptanceCriteria, status } = nextProps.task.task
        this.setState({
            id, summary, acceptanceCriteria, status,
            errors: nextProps.errors
        })
        console.log('errors :' + this.state.errors);

    }
    componentDidMount () {
        const id = this.state.id;
        this._onGetTask(id)
    }
    _onGetTask = (id) => {
        this.props.getTaskAction(id)
    }
    _onUpdateTask = (e) => {
        e.preventDefault()
        const updatedtask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status
        }
        console.log(updatedtask);
        this.props.addTaskAction(updatedtask, this.props.history)
    }
    _onChange = (e) => {
        this.setState({ [ e.target.name ]: e.target.value })
        e.preventDefault()
    }
    _onEditTask = () => {
        this.setState({
            edit: !this.state.edit
        })
    }
    render () {
        const { id, summary, acceptanceCriteria, status, edit, errors } = this.state
        return (
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header h4">
                        <div className="row">
                            <div className="col-md-4">
                                <Link to="/" className="btn btn-primary btn-sm">
                                    <i className="fa fa-step-backward"> <span className="ml-2">Back</span></i>
                                </Link>
                            </div>
                            <div className="col-md-4">Update Task {id}</div>
                            <div className="col-md-4">
                                <i className="fa fa-edit btn-warning" onClick={this._onEditTask}></i>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {edit ?
                            <form onSubmit={this._onUpdateTask}>
                                <div className="card-text">

                                    <div className="form-group">
                                        <label htmlFor="id">ID</label>
                                        <input type="text" readOnly
                                            className="form-control"
                                            name="id"
                                            value={id}
                                            onChange={this._onChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="summary">Summary :</label>
                                        <input type="text"
                                            className={classnames("form-control", {
                                                "is-invalid": errors.summary
                                            })}
                                            name="summary"
                                            placeholder="summary ..."
                                            onChange={this._onChange}
                                            value={summary}
                                        />
                                        {errors.summary ?
                                            <div className="alert alert-danger" role="alert">
                                                <strong> {errors.summary} </strong>
                                            </div> :
                                            null
                                        }
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="acceptanceCriteria">acceptance Criteria :</label>
                                        <textarea name="acceptanceCriteria"
                                            className={classnames("form-control", {
                                                "is-invalid": errors.acceptanceCriteria
                                            })}
                                            rows="3"
                                            onChange={this._onChange}
                                            value={acceptanceCriteria}
                                        />
                                        {errors.acceptanceCriteria ?
                                            <div className="alert alert-danger" role="alert">
                                                <strong> {errors.acceptanceCriteria} </strong>
                                            </div> :
                                            null
                                        }
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="status">Status :</label>
                                        <select className="form-control"
                                            name="status"
                                            onChange={this._onChange}
                                            value={status}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="TO_DO">TO DO</option>
                                            <option value="IN_PROGRESS">IN PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </form>
                            :
                            <ul className="list-group">
                                <li className="list-group-item ">
                                    <div className="row">
                                        <div className="col-md-6">ID:  </div>
                                        <div className="col-md-6">
                                            <span className="ml-5">{id}</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item ">
                                    <div className="row">
                                        <div className="col-md-6">summary:  </div>
                                        <div className="col-md-6">
                                            <span className="ml-5">{summary} </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item ">
                                    <div className="row">
                                        <div className="col-md-6">acceptanceCriteria:  </div>
                                        <div className="col-md-6">
                                            <span className="ml-5">{acceptanceCriteria}</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item ">
                                    <div className="row">
                                        <div className="col-md-6">status:  </div>
                                        <div className="col-md-6">
                                            <span className="ml-5"> {status === "TO_DO" ? <i className="fa fa-step-forward text-dark"></i> : null}</span>
                                            <span className="ml-5"> {status === "IN_PROGRESS" ? <i className="fa fa-times-circle  text-primary"></i> : null}</span>
                                            <span className="ml-5"> {status === "DONE" ? <i className="fa fa-thumbs-up text-success"></i> : null}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        }

                    </div>
                </div>
            </div>

        )
    }
}
TaskDetails.propTypes = {
    getTaskAction: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        task: state.task,
        errors: state.errors
    }
}
export default
    connect(mapStateToProps, { getTaskAction, addTaskAction })
        (TaskDetails);