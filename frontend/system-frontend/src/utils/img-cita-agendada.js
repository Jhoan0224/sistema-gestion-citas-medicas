const ANCHO_STD = 600;
const ALTO_STD = 800;
// const IMG_URL = `${import.meta.env.BASE_URL}logo.webp`;
const IMG_URL = `${window.location.origin}/logo.webp`;


export async function ImageCitaAgendadaSave(citaInfo) {

    const canvas = document.createElement("canvas");
    canvas.width = 816;
    canvas.height = 1056;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000'; 

      // Main Header -----
      const HEADER_X = 140;
      const HEADER_Y = 50;
      const HEADER_HR_MY = HEADER_Y + 10;
      // styles
      ctx.font = '28px Verdana, sans-serif';
      ctx.fillText("Cita medica en centro de salud tal A", HEADER_X, HEADER_Y);

      // variables
      const HEADER_SIZE = ctx.measureText("Cita medica en centro de salud tal A").width;

      // Horizontal row under the Main Header
      ctx.beginPath();
      ctx.moveTo(HEADER_X, HEADER_HR_MY);
      ctx.lineTo(HEADER_X + HEADER_SIZE, HEADER_HR_MY);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Logo -----
      // variables
      const LOGO_MX = 40;
      const LOGO_Y = 20;
      const LOGO_X = HEADER_X + HEADER_SIZE + LOGO_MX;
      const LOGO_WIDTH = 50;
      const LOGO_HEIGHT = 50;

      // get the image

  await new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = IMG_URL;

    img.onload = () => {
      ctx.drawImage(img, LOGO_X, LOGO_Y, LOGO_WIDTH, LOGO_HEIGHT);
      resolve();
    };
});

      // Title of user appoitment
      // Variables 
      const DATA_X = 50;
      const DATA_Y = 120;
      const DATA_LINE_SPACE = 20;
      const FONT_B1 = "bold 20px Verdana, sans-serif";
      const FONT_1 = "20px Verdana, sans-serif";
      const FONT_B2 = "bold 17px Verdana, sans-serif";
      const FONT_2 = "17px Verdana, sans-serif";
      const SPACE_TEXT_2 = 15;
      let TITLE_WIDTH = 0;
      let MOTIVE_WIDTH = 0;
      let USUARIO_WIDTH = 0;
      let ID_CITA_WIDTH = 0;
      let ESPECIALIDAD_WIDTH = 0;
      let TIPO_CITA_WIDTH = 0;
      let FECHA_HORA_ATENCIO_WIDTH = 0;
      let UBICATION_WIDTH = 0;
      let CONSIDERATIONS_WIDTH = 0;

      ctx.font = FONT_B1;
      ctx.fillText("Titulo: ", DATA_X, DATA_Y);
      TITLE_WIDTH = ctx.measureText("Titulo").width;
      ctx.font = FONT_1;
      ctx.fillText("Control de chequeo anual de control de peso", DATA_X + TITLE_WIDTH + SPACE_TEXT_2, DATA_Y);

      // Motive
      ctx.font = FONT_B1;
      ctx.fillText("Motivo: ", DATA_X, DATA_Y + DATA_LINE_SPACE * 2);
      MOTIVE_WIDTH = ctx.measureText("Motivo").width;
      ctx.font = FONT_1;
      ctx.fillText("Controlar el nivel de peso saludable por posibles complicaciones",
        DATA_X + MOTIVE_WIDTH + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 2);
        ctx.fillText("Controlar el nivel de peso saludable por posibles complicaciones",
        DATA_X + MOTIVE_WIDTH + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 3);

      ctx.font = FONT_B1;
      ctx.fillText("Paciente:", DATA_X, DATA_Y + DATA_LINE_SPACE * 4);
      USUARIO_WIDTH = ctx.measureText("Paciente:").width;
      ctx.font = FONT_1;
      ctx.fillText("Juan Perez Gonzales Calderon", DATA_X + USUARIO_WIDTH + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 4);

      // DateTime appoitment
      ctx.font = FONT_B1;
      ctx.fillText("Fecha hora de atencion:", DATA_X, DATA_Y + DATA_LINE_SPACE * 6);
      FECHA_HORA_ATENCIO_WIDTH = ctx.measureText("Fecha hora de atencion:").width;
      ctx.font = FONT_1;
      ctx.fillText("Lunes 8 de Junio de 2026, a las 4:30 pm.",
        DATA_X + FECHA_HORA_ATENCIO_WIDTH + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 6);

      // Especialidad appoitment
      ctx.font = FONT_B1;
      ctx.fillText("Especialidad: ", DATA_X, DATA_Y + DATA_LINE_SPACE * 8);
      ESPECIALIDAD_WIDTH = ctx.measureText("Especialidad:").width;
      ctx.font = FONT_1;
      ctx.fillText("Nutricion clinica y dietetica.", DATA_X + ESPECIALIDAD_WIDTH + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 8);

      // Type of appoitment
      ctx.font = FONT_B1;
      ctx.fillText("Tipo de cita: ", DATA_X, DATA_Y + DATA_LINE_SPACE * 10);
      TIPO_CITA_WIDTH = ctx.measureText("Tipo de cita:").width;
      ctx.font = FONT_1;
      ctx.fillText("Chequeo medico.", DATA_X + TIPO_CITA_WIDTH + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 10);

      ctx.font = FONT_B1;
      ctx.fillText("ID Cita: ", DATA_X, DATA_Y + DATA_LINE_SPACE * 12);
      ID_CITA_WIDTH = ctx.measureText("ID Cita:").width;
      ctx.font = FONT_1;
      ctx.fillText("1012", DATA_X + ID_CITA_WIDTH + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 12);

      // Ubication of center healt
      ctx.font = FONT_B2;
      ctx.fillText("Ubicacion del centro de salud:", DATA_X, DATA_Y + DATA_LINE_SPACE * 14);
      ctx.font = FONT_2;
      ctx.fillText("• Entre 4Av. Norte y 5 Calle Poniente, Santa Ana, Santa Ana, El Salvador.", DATA_X + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 15.2);


      ctx.font = FONT_B2;
      ctx.fillText("Consideraciones del Usuario: ", DATA_X, DATA_Y + DATA_LINE_SPACE * 17);

      ctx.font = FONT_2;
      ctx.fillText("• La Confirmacion de la Cita es maximo 5 Horas antes o el dia previo a la Cita.", DATA_X + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 18.2);
      ctx.fillText("• El Tiempo maximo de espero por paciente Sin Confirmacion es de 10 min.", DATA_X + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 19.4);
      ctx.fillText("• El Tiempo maximo de espero por paciente con Cita Confirmada es de 20 min.", DATA_X + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 20.6);


      ctx.font = FONT_B2;
      ctx.fillText("Conctactos del Centro de Salud: ", DATA_X, DATA_Y + DATA_LINE_SPACE * 22.5);
      ctx.font = FONT_2;
      ctx.fillText("• Numeros de telefono: 2443-1225, 2255-8852", DATA_X + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 23.7);
      ctx.fillText("• Email: sgcm.contact@sgcm.healt", DATA_X + SPACE_TEXT_2, DATA_Y + DATA_LINE_SPACE * 25);

      ctx.font = 'bold 16px Arial'
      ctx.fillText("Numeros de Emergicia del el salvador: ", DATA_X, 660);

      ctx.font = '16px Arial'
      ctx.fillText("• Sistema de Emergencias Médicas (SEM): 132.", 220, 685);
      ctx.fillText("• Comandos de Salvamento: 2133-0000.", 220, 710);
      ctx.fillText("• Cuerpo de Bomberos de El Salvador: 913.", 220, 735);
      ctx.fillText("• Dirección General de Protección Civil: 2201-2424.", 220, 760);
      ctx.fillText("• Policía Nacional Civil (PNC): 911.", 220, 785);

    canvas.toBlob((blob) => {
        if (!blob) {
            console.error("Error al generar el archivo binario de la imagen.");
            return;
        }
        
        const blobUrl = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.download = 'ticket-cita-medica.png'
        enlace.href = blobUrl;
        
        document.body.appendChild(enlace);
        enlace.click();
        
        // Limpieza de memoria inmediata
        document.body.removeChild(enlace);
        URL.revokeObjectURL(blobUrl);
        
        console.log("¡Descarga completada con éxito!");
    }, 'image/png');



}


//     // 9. Procesamos la descarga usando un Blob, lo cual evita bloqueos del navegador
//     canvas.toBlob((blob) => {
//         if (!blob) {
//             console.error("Error al generar el archivo binario de la imagen.");
//             return;
//         }
        
//         const blobUrl = URL.createObjectURL(blob);
//         const enlace = document.createElement('a');
//         enlace.download = 'ticket-cita-medica.png'; // Nombre del archivo descargado
//         enlace.href = blobUrl;
        
//         // Adjuntar al documento para forzar la descarga en navegadores estrictos
//         document.body.appendChild(enlace);
//         enlace.click();
        
//         // Limpieza de memoria inmediata
//         document.body.removeChild(enlace);
//         URL.revokeObjectURL(blobUrl);
        
//         console.log("¡Descarga completada con éxito!");
//     }, 'image/png');
// }

// export function ImageCitaAgendadaSave(htmlElement) {
//     if (!htmlElement) { return };
//     console.log(htmlElement);
    
//     // Declaración explícita de tus constantes estándar
//     const ANCHO_STD = 800;
//     const ALTO_STD = 400;
    
//     const htmlElementContent = htmlElement.innerHTML.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    
//     // 💡 CORREGIDO: Se reestablecieron los esquemas XML oficiales obligatorios
//     const svgData = `
//         <svg xmlns="http://w3.org" width="${ANCHO_STD}" height="${ALTO_STD}">
//         <foreignObject width="100%" height="100%">
//             <div xmlns="http://w3.org" style="font-family: sans-serif; box-sizing: border-box; width: 100%; height: 100%; background: white; padding: 20px;">
//             ${htmlElementContent}
//             </div>
//         </foreignObject>
//         </svg>
//     `;

//     const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
//     const url = URL.createObjectURL(svgBlob);
   
//     const img = new Image();
//     img.src = url;
    
//     img.onload = function() {
//         console.log("1. Imagen SVG procesada con éxito.");

//         const canvas = document.createElement('canvas');
//         canvas.width = ANCHO_STD;
//         canvas.height = ALTO_STD;
//         const ctx = canvas.getContext('2d');
        
//         ctx.drawImage(img, 0, 0);
        
//         // 💡 CORREGIDO: Se reestructuró correctamente el toBlob y el enlace físico
//         canvas.toBlob((blob) => {
//             if (!blob) {
//                 console.error("No se pudo generar el binario de la imagen.");
//                 return;
//             }
            
//             const blobUrl = URL.createObjectURL(blob);
//             const enlace = document.createElement('a');
//             enlace.download = 'imagen-estandar.png';
//             enlace.href = blobUrl;
            
//             // Inyección física para engañar los bloqueos de descarga automática
//             document.body.appendChild(enlace);
//             enlace.click();
            
//             // Limpieza inmediata y ordenada de recursos
//             document.body.removeChild(enlace);
//             URL.revokeObjectURL(blobUrl);
//             URL.revokeObjectURL(url);
            
//             console.log("3. Descarga procesada e iniciada en el sistema.");
//         }, 'image/png');
//     };
    
//     img.onerror = function() {
//         console.error("El navegador bloqueó la renderización del SVG.");
//         console.warn("REVISIÓN: Comprueba si tu HTML dentro del div usa clases externas o fuentes que el motor aislado del SVG no puede procesar.");
//     };

//     console.log("ok terminada");
// }


// export function ImageCitaAgendadaSave(htmlElement) {
//     if (!htmlElement) { return };
//     console.log(htmlElement);
    
//     const htmlElementContent = htmlElement.innerHTML.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    
//     const svgData = `
//         <svg xmlns="http://w3.org" width="${ANCHO_STD}" height="${ALTO_STD}">
//         <foreignObject width="100%" height="100%">
//             <div xmlns="http://w3.org" style="font-family: sans-serif; box-sizing: border-box; width: 100%; height: 100%; background: white; padding: 20px;">
//             ${htmlElementContent}
//             </div>
//         </foreignObject>
//         </svg>
//     `;

//     const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
//     const url = URL.createObjectURL(svgBlob);
   
//     const img = new Image();
//     img.src = url;
    
//     img.onload = function() {

//         const canvas = document.createElement('canvas');
//         canvas.width = ANCHO_STD;
//         canvas.height = ALTO_STD;
//         const ctx = canvas.getContext('2d');
        
//         ctx.drawImage(img, 0, 0);
//                     document.body.appendChild(enlace);
//             enlace.click();
            
//             // 💡 Limpieza inmediata
//             document.body.removeChild(enlace);
//             URL.revokeObjectURL(blobUrl);
//             URL.revokeObjectURL(url);
            
//         console.log("3. Descarga procesada correctamente.");
//         // const enlace = document.createElement('a');
//         // enlace.download = 'imagen-estandar.png';
//         // enlace.href = canvas.toDataURL('image/png');
//         // enlace.click();
        
//         // URL.revokeObjectURL(url);
        
//     };
//     console.log("ok terminada");
    
//       img.onerror = function() {
//         console.error("El navegador bloqueó la renderización del SVG.");

//     };
// }

// export function ImageCitaAgendadaSave(htmlElement) {
//     if (!htmlElement) { 
//         console.error("No se recibió ningún elemento HTML.");
//         return; 
//     }

//     // 1. Definimos las dimensiones estándar fijas (puedes cambiarlas si gustas)
//     const ANCHO_STD = 816;
//     const ALTO_STD = 1056;

//     // 2. Extraemos ÚNICAMENTE el texto limpio del DIV de React (ignorando las clases de Bootstrap)
//     const tituloCita = htmlElement.querySelector('h5')?.innerText || "Cita Médica";
//     const detalleCita = htmlElement.querySelector('p')?.innerText || "";

//     // 3. Creamos el lienzo del Canvas de manera nativa e independiente
//     const canvas = document.createElement('canvas');
//     canvas.width = ANCHO_STD;
//     canvas.height = ALTO_STD;
//     const ctx = canvas.getContext('2d');

//     // 4. Pintamos un fondo blanco para el ticket
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, ANCHO_STD, ALTO_STD);

//     // 5. Dibujamos un borde azul estético (estilo el color primario de Bootstrap)
//     ctx.strokeStyle = "#0d6efd";
//     ctx.lineWidth = 12;
//     ctx.strokeRect(15, 15, ANCHO_STD - 30, ALTO_STD - 30);

//     // 6. Configurar y escribir el TÍTULO PRINCIPAL (ej. "Cita Medica Pendiente")
//     ctx.fillStyle = "#212529"; // Gris oscuro
//     ctx.font = "bold 32px sans-serif";
//     ctx.fillText(tituloCita, 50, 80);

//     // 7. Dibujamos una línea sutil de separación gris
//     ctx.strokeStyle = "#dee2e6";
//     ctx.lineWidth = 2;
//     ctx.beginPath();
//     ctx.moveTo(50, 120);
//     ctx.lineTo(750, 120);
//     ctx.stroke();

//     // 8. Configurar y escribir el DETALLE (ej. "Cita: Consulta General")
//     ctx.fillStyle = "#495057"; // Gris secundario
//     ctx.font = "24px sans-serif";
//     ctx.fillText(detalleCita, 50, 180);

//     console.log("Generando archivo de imagen binario (Blob)...");

//     // 9. Procesamos la descarga usando un Blob, lo cual evita bloqueos del navegador
//     canvas.toBlob((blob) => {
//         if (!blob) {
//             console.error("Error al generar el archivo binario de la imagen.");
//             return;
//         }
        
//         const blobUrl = URL.createObjectURL(blob);
//         const enlace = document.createElement('a');
//         enlace.download = 'ticket-cita-medica.png'; // Nombre del archivo descargado
//         enlace.href = blobUrl;
        
//         // Adjuntar al documento para forzar la descarga en navegadores estrictos
//         document.body.appendChild(enlace);
//         enlace.click();
        
//         // Limpieza de memoria inmediata
//         document.body.removeChild(enlace);
//         URL.revokeObjectURL(blobUrl);
        
//         console.log("¡Descarga completada con éxito!");
//     }, 'image/png');
// }

// export function ImageCitaAgendadaSave(htmlElement) {
//     if (!htmlElement) { return };
//     console.log(htmlElement);
    
//     // Declaración explícita de tus constantes estándar
//     const ANCHO_STD = 800;
//     const ALTO_STD = 400;
    
//     const htmlElementContent = htmlElement.innerHTML.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    
//     // 💡 CORREGIDO: Se reestablecieron los esquemas XML oficiales obligatorios
//     const svgData = `
//         <svg xmlns="http://w3.org" width="${ANCHO_STD}" height="${ALTO_STD}">
//         <foreignObject width="100%" height="100%">
//             <div xmlns="http://w3.org" style="font-family: sans-serif; box-sizing: border-box; width: 100%; height: 100%; background: white; padding: 20px;">
//             ${htmlElementContent}
//             </div>
//         </foreignObject>
//         </svg>
//     `;

//     const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
//     const url = URL.createObjectURL(svgBlob);
   
//     const img = new Image();
//     img.src = url;
    
//     img.onload = function() {
//         console.log("1. Imagen SVG procesada con éxito.");

//         const canvas = document.createElement('canvas');
//         canvas.width = ANCHO_STD;
//         canvas.height = ALTO_STD;
//         const ctx = canvas.getContext('2d');
        
//         ctx.drawImage(img, 0, 0);
        
//         // 💡 CORREGIDO: Se reestructuró correctamente el toBlob y el enlace físico
//         canvas.toBlob((blob) => {
//             if (!blob) {
//                 console.error("No se pudo generar el binario de la imagen.");
//                 return;
//             }
            
//             const blobUrl = URL.createObjectURL(blob);
//             const enlace = document.createElement('a');
//             enlace.download = 'imagen-estandar.png';
//             enlace.href = blobUrl;
            
//             // Inyección física para engañar los bloqueos de descarga automática
//             document.body.appendChild(enlace);
//             enlace.click();
            
//             // Limpieza inmediata y ordenada de recursos
//             document.body.removeChild(enlace);
//             URL.revokeObjectURL(blobUrl);
//             URL.revokeObjectURL(url);
            
//             console.log("3. Descarga procesada e iniciada en el sistema.");
//         }, 'image/png');
//     };
    
//     img.onerror = function() {
//         console.error("El navegador bloqueó la renderización del SVG.");
//         console.warn("REVISIÓN: Comprueba si tu HTML dentro del div usa clases externas o fuentes que el motor aislado del SVG no puede procesar.");
//     };

//     console.log("ok terminada");
// }


// export function ImageCitaAgendadaSave(htmlElement) {
//     if (!htmlElement) { return };
//     console.log(htmlElement);
    
//     const htmlElementContent = htmlElement.innerHTML.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    
//     const svgData = `
//         <svg xmlns="http://w3.org" width="${ANCHO_STD}" height="${ALTO_STD}">
//         <foreignObject width="100%" height="100%">
//             <div xmlns="http://w3.org" style="font-family: sans-serif; box-sizing: border-box; width: 100%; height: 100%; background: white; padding: 20px;">
//             ${htmlElementContent}
//             </div>
//         </foreignObject>
//         </svg>
//     `;

//     const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
//     const url = URL.createObjectURL(svgBlob);
   
//     const img = new Image();
//     img.src = url;
    
//     img.onload = function() {

//         const canvas = document.createElement('canvas');
//         canvas.width = ANCHO_STD;
//         canvas.height = ALTO_STD;
//         const ctx = canvas.getContext('2d');
        
//         ctx.drawImage(img, 0, 0);
//                     document.body.appendChild(enlace);
//             enlace.click();
            
//             // 💡 Limpieza inmediata
//             document.body.removeChild(enlace);
//             URL.revokeObjectURL(blobUrl);
//             URL.revokeObjectURL(url);
            
//         console.log("3. Descarga procesada correctamente.");
//         // const enlace = document.createElement('a');
//         // enlace.download = 'imagen-estandar.png';
//         // enlace.href = canvas.toDataURL('image/png');
//         // enlace.click();
        
//         // URL.revokeObjectURL(url);
        
//     };
//     console.log("ok terminada");
    
//       img.onerror = function() {
//         console.error("El navegador bloqueó la renderización del SVG.");

//     };
// }