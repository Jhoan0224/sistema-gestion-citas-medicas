import { useEffect, useState } from "react"
import { AdminApp } from "../app/Admin.app.js";

export function SystemVariables() {

    return(
    <>
    
    
    </>
    )
}

export function SystemDataBase() {
    const [configTable, setConfigTable] = useState("");
    const [formEditTable, setFormEditTable] = useState({typeEdit: "", row: {}, table: ""});
    const [dataTable, setDataTable] = useState({tableName: "", rows: [], fields: []});

    const getTable = {
        "ESTADO_CITA": () => AdminApp.tableEstadoCita("ESTADO_CITA"),
        "SIGNOS": () => AdminApp.tableSignos("SIGNOS"),
        "SINTOMAS": () => AdminApp.tableSintomas("SINTOMAS"),
        "CONDICIONES": () => AdminApp.tableCondiciones("CONDICIONES"),
        "OCUPACIONES": () => AdminApp.tableOcupaciones("OCUPACIONES"),
        "ESPECIALIDAD": () => AdminApp.tableEspecialidad("ESPECIALIDAD"),
        "ROLES": () => AdminApp.tableRoles("ROLES"),
        "PRIVILEGIOS": () => AdminApp.tablePrivilegios("PRIVILEGIOS"),
    };    

    useEffect(() => {
        let isMounted = true;
        if (configTable == "") {return}
        const loadDataTable = async () => {
            const resp = await getTable[configTable]();
            if (isMounted && resp.success) {
                setDataTable({tableName: resp.tableName, rows: resp.rows, fields: resp.fileds});
            }
        };
        loadDataTable();
        return () => {isMounted = false}
    }, [configTable]);

    const editField = async (idRow) => {
        const typeEdit = "EDIT_FIELD";
        const row = dataTable.rows.find(r => r.id == idRow);
        setFormEditTable({typeEdit: typeEdit, row: row, table: dataTable.tableName});
    };


    return(
    <>
    <div className="container d-flex flex-column flex-grow-1">
        <span className="fs-5 mb-2">Configuración del Sistema: Base de Datos</span>
        <span className="fs-6 mx-2 mb-3">Esta seccion contiene las tablas de la DB relacionadas principalmente a la 
            Configuración del motor de citas del sistema encargado de agendar y gestionar las citas de los Usuarios/Pacientes,
            asi como la Configuración del los Usuarios que gestionan el Sistema.
        </span>

        <div className="row border rounded-2 h-100">
            <div className="col-sm-auto d-flex flex-column border-end">
                <span className="fs-6 fw-medium mt-3">Usuarios/Pacientes</span>
                <div className="d-grid mx-3">
                    <button onClick={() => setConfigTable("ESTADO_CITA")} type="button" className="btn btn-outline-primary border-0 ms-0 me-auto">Estado_Cita</button>
                    <button onClick={() => setConfigTable("SIGNOS")} type="button" className="btn btn-outline-primary border-0 ms-0 me-auto">Signos</button>
                    <button onClick={() => setConfigTable("CONDICIONES")} type="button" className="btn btn-outline-primary border-0 ms-0 me-auto">Condiciones</button>
                    <button onClick={() => setConfigTable("SINTOMAS")} type="button" className="btn btn-outline-primary border-0 ms-0 me-auto">Sintomas</button>
                    <button onClick={() => setConfigTable("OCUPACIONES")} type="button" className="btn btn-outline-primary border-0 ms-0 me-auto">Ocupaciones</button>
                    <button onClick={() => setConfigTable("ESPECIALIDAD")} type="button" className="btn btn-outline-primary border-0 ms-0 me-auto">Especialidad</button>
                </div>
                <hr className="border border-secondary"/>
                <span className="fs-6 fw-medium mt-3">Usuarios del Sistema</span>
                <div className="d-grid mx-3">
                    <button onClick={() => setConfigTable("PRIVILEGIOS")} type="button" className="btn btn-outline-primary border-0 ms-0 me-auto">Privilegios</button>
                    <button onClick={() => setConfigTable("ROLES")} type="button" className="btn btn-outline-primary border-0 ms-0 me-auto">Roles</button>
                </div>
            </div>

            <div className="col d-flex flex-column p-4">
                <span className="fs-6 fw-medium">{dataTable?.tableName}</span>
                <span className="fs-6 mx-3 mt-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente obcaecati repellat ut atque voluptatum, eius mollitia vel nesciunt? Distinctio, dolorum? Eius cupiditate illo, labore explicabo distinctio natus sed inventore necessitatibus?</span>

                <div className="row mt-4 mx-2 ">
                    <div className="col-sm-auto">
                        <div className="card border-3">
                            <div className="d-flex border-bottom">
                               <span className="fw-medium mx-auto my-1 card-title">{dataTable?.tableName}</span>
                            </div>
                           <div className="card-body py-0 p-0 overflow-y-auto w-auto" style={{maxHeight: "21rem"}}>

                            <table className="table table-hover table-striped table-bordered mt-0 pt-0" >
                                <thead className="sticky-top mt-0 pt-0">
                                    <tr>
                                    {dataTable.fields.map(field => (
                                        <th>{field}</th>
                                    ))}
                                    <th><i className="bi bi-gear mx-2" /></th>
                                    </tr>
                                </thead>
                                <tbody style={{maxHeight: "2rem"}}>
                                    {dataTable.rows.map(row => (
                                        <tr key={row.id}>
                                            <td>{row.id}</td>
                                            <td>{row.nombre}</td>
                                            <tr><button onClick={() => editField(row.id)} type="button" className="btn btn-outline-secondary px-1 py-1 m-1"><i className="bi bi-check-circle mx-2" /></button></tr>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                           </div>
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <span className="fs-6">Configuraciones:</span>
                        <div className="d-flex gap-2 mx-3 ">
                            <button type="button" className="btn btn-outline-success border-0 ms-0 me-auto">Nuevo Registro</button>
                            <button type="button" className="btn btn-outline-warning border-0 ms-0 me-auto">Guardar Cambios</button>
                        </div>
                        <div>
                        { formEditTable.typeEdit === "EDIT_FIELD" &&
                            <>
                            <span className="fs-6">Editando Campo de la Tabla: <span className="fw-medium fs-6">{dataTable.tableName}</span></span>
                            <div>
                                <label htmlFor="rowField" className="form-label fw-medium">ID: {formEditTable.row.id} — Nombre</label>                 
                                <input type="text" id="rowField" className="form-control w-auto"
                                value={formEditTable.row.nombre} />
                            </div>
                            </> 
                        }
                        </div>
                    </div>

                </div>
                    

            </div>
        </div>
    </div>
    </>
    )
}