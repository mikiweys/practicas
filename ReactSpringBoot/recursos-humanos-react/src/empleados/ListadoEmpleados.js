import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoEmpleados() {

    const urlBase = "http://localhost:8080/rh-app/empleados";

    const[empleados, setEmpleados] = useState([]);

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        const resultado = await axios.get(urlBase);
        setEmpleados(resultado.data);
    }
    const eliminarEmpleado = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarEmpleados();
    }
  return (
    <div className="container">
        <div className="container text-center" style={{margin: "30px"}}>
            <h3>Sistema de Recursos Humanos</h3>
        </div>

        <table className="table table-striped table-hover align-middle">
        <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th scope="col"></th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {
            empleados.map((empleado, indice) => (
                <tr key={indice}>
                <th scope="row">{empleado.idEmpleado}</th>
                <td>{empleado.nombre}</td>
                <td>{empleado.departamento}</td>
                <td><NumericFormat value={empleado.sueldo}
                    displayType={'text'}
                    thousandSeparator=',' prefix={'COP '}
                    />
                </td>
                <td className='text-center'>
                    <div>
                        <Link to={`/editar/${empleado.idEmpleado}`} className='btn btn-outline-warning btn-sm me-3'>
                            <i className='bi bi-pencil-square'></i>
                        </Link>
                        <button className='btn btn-outline-danger btn-sm' onClick={()=> eliminarEmpleado(empleado.idEmpleado)}><i className='bi bi-trash'></i></button>
                    </div>
                </td>
            </tr>
            ))
            }
        </tbody>
        </table>

    </div>
  )
}
