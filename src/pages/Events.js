import React, { Component } from "react";

import axios from "axios";
import {Link, Redirect} from 'react-router-dom';

import './Events.css';

export default class EventsPage extends Component{
    state = {
        name: '',
        number:'',
        email: '',
        password: '',
        city:'',
        address:'',
        redirect: false,
        authError: false,
        isLoading: false,
    };

    handleNameChange = event => {
        this.setState({ name: event.target.value });
    };
    handleNumberChange = event => {
        this.setState({ number: event.target.value });
    };
    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };
    handleCityChange = event => {
        this.setState({ city: event.target.value });
    };
    handleAddressChange = event => {
        this.setState({ address: event.target.value });
    };
    

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const url = 'https://gowtham-rest-api-crud.herokuapp.com/register';
        const name = this.state.name;
        const number = this.state.number;
        const email = this.state.email;
        const password = this.state.password;
        const city = this.state.city;
        const address = this.state.address;
        let bodyFormData = new FormData();
        bodyFormData.set('name', name);
        bodyFormData.set('number', number);
        bodyFormData.set('email', email);
        bodyFormData.set('password', password);
        bodyFormData.set('city', city);
        bodyFormData.set('address', address);
        axios.post(url, bodyFormData)
            .then(result => {
                this.setState({isLoading: false});
                if (result.data.status !== 'fail') {
                    this.setState({redirect: true, authError: true});
                }else {
                    this.setState({redirect: false, authError: true});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ authError: true, isLoading: false });
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <h1 className="card-header">Register</h1>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label htmlFor="inputName">Name : </label>
                                    <input type="text" id="inputName" className="form-control" placeholder="name"  name="name" onChange={this.handleNameChange} required/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <label htmlFor="number">Number : </label>
                                    <input type="number" id="number" className="form-control" placeholder="number"  name="number" onChange={this.handleNumberChange} required/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <label htmlFor="inputEmail">Email address : </label>
                                    <input id="inputEmail" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required/>
                                    {/* <div className="invalid-feedback">
                                        Please provide a valid Email. or Email Exis
                                    </div> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label htmlFor="inputPassword">Password : </label>
                                    <input type="password" className="form-control" id="inputPassword" placeholder="******"  name="password" onChange={this.handlePwdChange} required/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <label htmlFor="inputPassword">Choose a city : </label>
                                    <select className="form-control" id="city"  name="city" onChange={this.handleCityChange} required>
                                        <option value="">Ahmedabad</option>
                                        <option value="">Bhavngar</option>
                                        <option value="">Surat</option>
                                        <option value="">Rajkot</option>
                                        <option value="">jamnagar</option>
                                        <option value="">Gandhinagar</option>
                                        <option value="">Baroda</option>
                                        <option value="">Botad</option>
                                    </select>
                                    {/* <input type="password" className="form-control" id="inputPassword" placeholder="******"  name="password" onChange={this.handlePwdChange} required/> */}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <label htmlFor="address">Address : </label>
                                    <input type="text" id="address" className="form-control" placeholder="address"  name="address" onChange={this.handleAddressChange} required/>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Register &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                        {/* <div className="text-center">
                            <Link className="d-block small mt-3" to={''}>Login Your Account</Link>
                            <Link className="d-block small" to={'#'}>Forgot Password?</Link>
                        </div> */}
                    </div>
                </div>
                {/* {this.renderRedirect()} */}
            </div>
        );
    }
}

