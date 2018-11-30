import React, { Component } from 'react';
import {Consumer} from '../../context';
// import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class EditContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        error: {}
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = res.data;

        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        })
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = async (dispatch, e) => {
        e.preventDefault()

        const { name, email, phone } = this.state;

        //Check Error

        if (name === '') {
            this.setState({error: { name: 'Name is required'}})
            return;
        }
        else if (email === '') {
            this.setState({error: { email: 'Email is required'}})
            return;
        }
        else if (phone === '') {
            this.setState({error: { phone: 'Phone is required'}})
            return;
        }else {

            const updateContact = {
                name,
                email,
                phone
            }

            const { id } = this.props.match.params;

            const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);

            dispatch({type: 'UPDATE_CONTACT', payload: res.data});

        this.setState({
            name: '',
            email: '',
            phone: '',
            error: {}
        });

        this.props.history.push('/');
        }
    }

  render() {
    const { name, email, phone, error} = this.state;
    
    return (
        <Consumer>
            {value => {
                const { dispatch } = value;
                return (
                    <div className="card mb-3">
                        <div className="card-header">Edit Contact</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                               <TextInputGroup 
                                label="Name" name="name" 
                                placeholder="Enter Name" value={name}
                                onChange={this.onChange}
                                error={error.name}
                               ></TextInputGroup>

                                <TextInputGroup 
                                label="Email" name="email" type="email" 
                                placeholder="Enter Email" value={email}
                                onChange={this.onChange}
                                error={error.email}
                               ></TextInputGroup>

                               <TextInputGroup 
                                label="Phone" name="phone" 
                                placeholder="Enter Phone" value={phone}
                                onChange={this.onChange}
                                error={error.phone}
                               ></TextInputGroup>

                                <input type="submit" className="btn btn-light btn-block"
                                value="Update Contact"/>
                            </form>
                        </div>
                    </div>
                );
            }}

        </Consumer>
    );
  }
}

export default EditContact;
