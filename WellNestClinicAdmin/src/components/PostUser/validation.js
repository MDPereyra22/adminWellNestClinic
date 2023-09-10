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

    if (!formData.plan || formData.plan < 1 || formData.plan > 3) {
        errors.plan = "El plan debe ser entre 1 y 3";
    }

    return errors;
};

export default validation;