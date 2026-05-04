
export function HistorialCitas({listaCitas, citaMessage}) {
    if (listaCitas.length === 0) {
        return(
        <>
        <h1 className="fs-5 fw-normal p-2 text-center text-body-secondary">{citaMessage}</h1>
        </>
        )
    }
    const options = {
        year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true
    }
    const formatDate = (dateTime) =>{
        return new Date(dateTime).toLocaleString(undefined, options);
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
            <tr key={cita.id}>
                <td>{cita.id}</td>
                <td>{cita.titulo}</td>
                <td>{cita.especialidad}</td>
                <td>{formatDate(cita.fecha_hora_atencion)}</td>
                <td><button className="btn btn-outline-primary">Ver detalles</button></td>
            </tr>
        ))}
        </tbody>
    </table>
    </>
    )
}