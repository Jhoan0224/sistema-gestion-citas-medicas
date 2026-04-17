
export function HistorialCitas({listaCitas}) {
    if (listaCitas.length === 0) {
        return(
        <>
        <h1 className="fs-1">NO TIENES HISTORIAL</h1>
        </>
        )
    }

    return(
    <>
    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <td>Cita</td>
                <td>Motivo</td>
                <td>Especialidad</td>
                <td>Fecha</td>
                <td>Opciones</td>
            </tr>
        </thead>
        <tbody>
        {listaCitas.map(cita => (
            <tr key={cita.cita}>
                <td>{cita.cita}</td>
                <td>{cita.motivo}</td>
                <td>{cita.especialidad}</td>
                <td>{cita.fecha}</td>
                <td><button className="btn btn-outline-primary">Ver detalles</button></td>
            </tr>
        ))}
        </tbody>
    </table>
    </>
    )
}