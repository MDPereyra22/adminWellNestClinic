import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSpecialties } from "../../redux/action/actions";

const PostDoctor = () => {
    const navigate = useNavigate();
    const specialities = useSelector((state) => state.specialities);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        specialities: [],
    });

    useEffect(()=>{
        dispatch(getSpecialties());
    },[]);

    console.log(specialities)
    console.log(formData)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectSpeciality = (event) => {
        const selectedSpeciality = event.target.value;
        if (selectedSpeciality !== "") {
            if (!formData.specialities.includes(selectedSpeciality)) {
                setFormData({
                    ...formData,
                    specialities: [...formData.specialities, selectedSpeciality],
                });
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("https://serverwellnestclinic.onrender.com/doctor", formData)
            .then((response) => {
                alert("Doctor created successfully:", response.data);
                navigate("/home")
            })
            .catch((error) => {
                alert("Error creating the doctor:", error);
                // Handle errors here, display an error message, or take additional actions
            });
    };

    return (
        <div>
            <h2>Create New Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Specialities:</label>
                    <select onChange={(e) => handleSelectSpeciality(e)}>
                        <option></option>
                        {specialities.map((speciality) => (
                            <option key={speciality.id} value={speciality.id}>
                                {speciality.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit">Create Doctor</button>
                </div>
            </form>
        </div>
    );
};

export default PostDoctor;
