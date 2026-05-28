import { useEffect, useRef } from "react";

export function ToastAlert({message}) {
    const toastRef = useRef(null);

    useEffect(() => {
        if (toastRef.current && window.bootstrap) {
           const elementToast = toastRef.current;
            const instanceToast = new window.bootstrap.Toast(elementToast);
            instanceToast.show(); 
        }
    }, []);
                /* translate-middle-x */
    return(
    <div className="toast-container position-fixed top-0 start-50  end-auto p-3">
        <div id="liveToast" ref={toastRef} data-bs-delay="2500" className="toast border border-warning" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header py-1 px-3">
                <i className="bi bi-exclamation-circle-fill text-warning me-1 fs-5"></i>
                <strong className="me-auto text-warning">Alerta</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    </div>
    )
};

export function ToastSuccess({message}) {
    const toastRef = useRef(null);

    useEffect(() => {
        if (toastRef.current && window.bootstrap) {
            const instanceToast = new window.bootstrap.Toast(toastRef.current);
            instanceToast.show(); 
        }
    }, []);

    return(
    <>
    <div className="toast-container position-fixed translate-middle-x top-0 start-50  end-auto p-3">
        <div id="liveToast" ref={toastRef} data-bs-delay="2500" className="toast border border-success" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header py-1 px-3">
                <i className="bi bi-exclamation-circle-fill text-success me-1 fs-5"></i>
                <strong className="me-auto text-success">Alerta</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    </div>
    </>    
    )
};

export function ToastDanger({message}) {
    const toastRef = useRef(null);

    useEffect(() => {
        if (toastRef.current && window.bootstrap) {
            const instanceToast = new window.bootstrap.Toast(toastRef.current);
            instanceToast.show(); 
        }
    }, []);

    return(
    <>
    <div className="toast-container position-fixed translate-middle-x top-0 start-50  end-auto p-3">
        <div id="liveToast" ref={toastRef} data-bs-delay="2500" className="toast border border-darnger" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header py-1 px-3">
                <i className="bi bi-exclamation-circle-fill text-darnger me-1 fs-5"></i>
                <strong className="me-auto text-darnger">Alerta</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    </div>
    </>    
    )
};