export function SpinerLoading() {

    return(
    <div className="d-flex flex-column h-100">
        <div className="spinner-border text-primary m-auto mb-0" role="status" />
        <span className="fw-medium fs-5 mt-2 m-auto">Cargando...</span>
    </div>
    )
}

export function NotFound() {

    return(
    <div className="d-flex flex-column h-100">
        <div className="spinner-border text-primary m-auto mb-0" role="status" />
        <span className="fw-medium text-secondary fs-3 mt-2 m-auto">Ruta no encontrada :/</span>
    </div>
    )
}