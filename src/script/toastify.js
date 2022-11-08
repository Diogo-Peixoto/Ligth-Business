export class Toast{
    static create(text, color){
        Toastify({
            text: text,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: color,
            },
        }).showToast();
    }
}