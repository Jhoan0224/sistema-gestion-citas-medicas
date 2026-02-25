
export function LoadingSpinner() {

    return(
    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
        </div>
        <h5 className="fs-5">Cargando...</h5>
    </div>
    )
}