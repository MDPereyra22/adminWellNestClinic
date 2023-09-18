const validation = (formData) => {
    let errors = {};

    if (!formData.name) {
        errors.name = "Se requiere un nombre";
    }
    if (!formData.name || /\d/.test(formData.name)) {
        errors.name = "El nombre no puede contener números";
    }

    if (!formData.lastName) {
        errors.lastName = "Se requiere un apellido";
    }

    return errors;
};

export default validation;