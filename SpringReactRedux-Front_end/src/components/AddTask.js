import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTaskAction } from '../actions/taskActions';
import classnames from "classnames";
import { Link } from "react-router-dom";

class AddTask extends Component {

    constructor (props) {
        super(props);
        this._onAddTask = this._onAddTask.bind(this);
        this._onChange = this._onChange.bind(this);
        this.state = {
            summary: '',
            acceptanceCriteria: '',
            status: '',
            errors: {}
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    _onAddTask = (e) => {
        e.preventDefault()
        const task = {
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status
        }
        this.props.addTaskAction(task, this.props.history)
    }
    _onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        e.preventDefault()
    }
    render() {
        const { summary, acceptanceCriteria, status, errors } = this.state
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
                            <div className="col-md-4">Add New Task </div>
                        </div></div>
                    <div className="card-body">
                        <form onSubmit={this._onAddTask}>
                            <div className="card-text">

                                <div className="form-group">
                                    <label htmlFor="summary">Summary :</label>
                                    <input type="text"
                                        className={classnames("form-control", {
                                            "is-invalid": errors.summary
                                        })}
                                        name="summary"
                                        placeholder="summary ..."
                                        value={summary}
                                        onChange={this._onChange}
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
                                        value={acceptanceCriteria}
                                        onChange={this._onChange}
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
                                        value={status}
                                        onChange={this._onChange}
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
                    </div>
                </div>
            </div>
        )
    }
}
AddTask.propTypes = {
    addTaskAction: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { addTaskAction })(AddTask);