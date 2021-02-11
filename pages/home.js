import React from 'react'
import axios from 'axios'
import Navbarr from '../components/navbar'
import { Navbar } from 'react-bootstrap'

class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            userName: null,
            pegawaiCount: 0
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        }else {
            window.location = "/login"
        }
    }
    
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getUser = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        this.setState({userName: user[0].username})
    }

    getPegawai = () => {
        let url = "http://localhost:2000/pegawai";
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({pegawaiCount: response.data.count});
        })

        .catch(error => {
            console.log(error);
        });

    }
    
    render(){
        return(
        <div>
            <Navbar/>
            <div className="container mt-2">
                <h3 className="my-2">
                    <strong>Welcome back, {this.state.userName}</strong>
                </h3>
                <div className="row">
                    {/* pegawai count */}
                    <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                        <div className="card">
                            <div className="card-body bg-success">
                                <h4 className="text-dark">
                                    <strong>Jumlah Pegawai</strong>
                                </h4>
                                <h1 className="text-white">
                                    <strong>{this.state.pegawaiCount}</strong>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Home