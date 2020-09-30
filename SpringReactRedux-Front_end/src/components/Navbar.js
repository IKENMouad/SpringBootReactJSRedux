import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand  bg-dark text-white">
                    <ul className="nav navbar-nav text-white">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addTask">New Task</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
