import React from 'react'
import axios from 'axios'
import NavBar from '../components/navbar'
import {Button,Modal, Table, Card, Form} from 'react-bootstrap' 

class Siswa extends React.Component {
  constructor() {  
    super();  
    this.state = {  
      token:"",
      siswa: [],
      jurusan2:[],
      id_siswa:"",
      nis:"",
      nama_siswa:"",
      kelas:"",
      jurusan:"",
      poin:"",
      search:"",
      action:"",
      isModalOpen: false
    }
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token")
    }else{
      window.location = "/login"
    }
    this.headerConfig.bind(this)
    }
    
    headerConfig = () => {
      let header = {
        headers: { Authorization: `Bearer ${this.state.token}` }
      }
      return header
    }

    bind = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }

    handleAdd = () => {
      this.setState({
        id_siswa:"",
        nis:"",
        nama_siswa:"",
        kelas:"",
        jurusan:"",
        poin:"",
        search:"",
        action:"",
        action: "insert",
        isModalOpen: true
      })
    }

    handleEdit = (item) => {
      this.setState({
        id_siswa: item.id_siswa,
        nis: item.nis,
        nama_siswa: item.nama_siswa,
        kelas: item.kelas,
        jurusan: item.jurusan,
        poin: item.poin,
        action: "update",
        isModalOpen: true            
      })
    }

    handleClose = () => {
      this.setState({
        isModalOpen: false
      })
    }

    handleSave = (event) => {
      event.preventDefault();
      let url = "";

      if (this.state.action === "insert") {
        url = "http://localhost:2000/siswa/save"
      }else{
        url = "http://localhost:2000/siswa/update"
      }

      let form = {
        id_siswa: this.state.id_siswa,
        nis: this.state.nis,
        nama_siswa: this.state.nama_siswa,
        kelas: this.state.kelas,
        jurusan: this.state.jurusan,
        poin: this.state.poin
      }
          
      axios.post(url, form, this.headerConfig())
      .then(response => {
         this.getSiswa();
      })

      this.setState({
        isModalOpen: false
      })
    }

    getSiswa = () => {
      let url = "http://localhost:2000/siswa";
      axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({siswa: response.data.siswa});
      })

      .catch(error => {
        console.log(error);
      });
    }

    getJurusan = () => {
      let url = "http://localhost:2000/siswa/jurusan";
      axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({jurusan2: response.data.jurusan});
      })

      .catch(error => {
        console.log(error);
      });
    }

    componentDidMount(){
      this.getSiswa()
      this.getJurusan()
    }

    findSiswa = (event) => {
      let url = "http://localhost:2000/siswa";
      if (event.keyCode === 13) {
        
      let form = {
        find: this.state.search
      }
          
      axios.post(url, form, this.headerConfig())
      .then(response => {
        this.setState({siswa: response.data.siswa});
      })

      .catch(error => {
        console.log(error);
      });
      }
    }

    Drop = (id_siswa) => {
      let url = "http://localhost:2000/siswa/" + id_siswa;
        
      if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        axios.delete(url, this.headerConfig())
        .then(response => {
          this.getSiswa();
        })

        .catch(error => {
          console.log(error);
        });
      }
    }


    render(){
        console.log(this.state.jurusan2)
        return(
            <>
            <NavBar />
            <Card>
                <Card.Header className="card-header bg-info text-white" align={'center'}>Data siswa</Card.Header>
                <Card.Body>
                <input type="text" className="form-control mb-2" name="search" value={this.state.search} onChange={this.bind} onKeyUp={this.findSiswa} placeholder="Pencarian..." />
                <Button variant="success" onClick={this.handleAdd}>
                    Tambah Data
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>  
                            <th>NIS</th> 
                            <th>Nama Siswa</th> 
                            <th>Kelas</th> 
                            <th>Jurusan</th>  
                            <th>Poin</th>  
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.siswa.map((item,index) => {  
                        return (  
                        <tr key={index}>  
                            <td>{item.id_siswa}</td>  
                            <td>{item.nis}</td>
                            <td>{item.nama_siswa}</td>  
                            <td>{item.kelas}</td>
                            <td>{item.nama_jurusan}</td>
                            <td>{item.poin}</td>  
                            <td>  
                            <Button className="btn btn-sm btn-info m-1" data-toggle="modal"  
                            data-target="#modal" onClick={() => this.handleEdit(item)}>  
                                Edit  
                            </Button>  
                            <Button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.id_siswa)}>  
                                Hapus  
                            </Button>  
                            </td>  
                        </tr>  
                        );  
                    })}
                    </tbody>
                    </Table>
                </Card.Body>
                </Card>

                
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Form siswa</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                    <Modal.Body>
                        ID  
                        <input type="number" name="id_siswa" value={this.state.id_siswa} onChange={this.bind}  
                        className="form-control" required />  
                        NIS
                        <input type="text" name="nis" value={this.state.nis} onChange={this.bind}  
                        className="form-control" required />  
                        Nama siswa
                        <input type="text" name="nama_siswa" value={this.state.nama_siswa} onChange={this.bind}  
                        className="form-control" required />  
                        Kelas
                        <input type="text" name="kelas" value={this.state.kelas} onChange={this.bind}  
                        className="form-control" required />  
                        Jurusan
                            <select name="jurusan" value={this.state.jurusan} onChange={this.bind} className="form-control" required>
                              {this.state.jurusan2.map((item)=> {  
                              return ( <option value={item.id_jurusan}>{item.nama_jurusan}</option> )})}
                            </select> 
                        Poin  
                        <input type="number" name="poin" value={this.state.poin} onChange={this.bind}  
                        className="form-control" required />  
                    </Modal.Body>
                     <Modal.Footer>
                     <button className="btn btn-sm btn-success" type="submit">  
                     Simpan 
                     </button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </>
    );  
  }
}


export default Siswa
