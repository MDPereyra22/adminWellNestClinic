import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./PostProducts.module.css"


const PostProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drugs, setDrugs] = useState([]);
  const [laboratory, setLaboratory] = useState([]);
  const [type, setType] = useState([]);
  

  const [form, setform] = useState({
    name: "",
    description: "",
    amount: "",
    dose: "",
    image: "",
    stock: "",
    price: "",
    drugs: [],
    laboratory: [],
    type: [],
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setform({
      ...form,
      drugs: [...form.drugs, e.target.value],
    });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  //Drug
  const selectedDrug = form.selectedDrug;

  console.log("Form submitted with data:", form);
  console.log("Selected Drug:", selectedDrug);

  //Lab
  const selectedLaboratory = form.selectedLaboratory;

  console.log("Form submitted with data:", form);
  console.log("Selected Lab:", selectedLaboratory);

  //Type
  const selectedType = form.selectedType;

  console.log("Form submitted with data:", form);
  console.log("Selected type:", selectedType);

  useEffect(() => {
    async function fetchDrugs() {
        try {
          const response = await axios.get(
            "https://serverwellnestclinic.onrender.com/drug"
          );
          setDrugs(response.data);
        } catch (error) {
          console.error("Error fetching drugs:", error);
        }
      }
  
      fetchDrugs();
    }, []);

    
  useEffect(() => {
    async function fetchLaboratory() {
        try {
          const response = await axios.get(
            "https://serverwellnestclinic.onrender.com/lab"
          );
          setLaboratory(response.data);
        } catch (error) {
          console.error("Error fetching laboratory:", error);
        }
    }
    
    fetchLaboratory();
    }, []);

    useEffect(() => {
        async function fetchType() {
            try {
              const response = await axios.get(
                "https://serverwellnestclinic.onrender.com/presentation-type"
              );
              setType(response.data);
            } catch (error) {
              console.error("Error fetching type:", error);
            }
        }
        
        fetchType();
    }, []);

    return (
        <div>
        <Link to="/">
            <button id="back" className={style.backButton}>&larr; back</button>
          </Link>   
       <div className={style.content}>
    <form className={style.form} onSubmit={(event) => handleSubmit(event)}>
      <div className={style.formTitle}>Post a product</div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={form.name}
            name="name"
            onChange={handleChange}
            />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={form.description}
            name="description"
            onChange={handleChange}
            />
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="text"
            value={form.amount}
            name="amount"
            onChange={handleChange}
            />
        </div>
        <div>
          <label>Dose: </label>
          <input
            type="text"
            value={form.dose}
            name="dose"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            value={form.image}
            name="image"
            onChange={handleChange}
            />
        </div>
        <div>
          <label>Stock: </label>
          <input
            type="text" //////
            value={form.stock}
            name="stock"
            onChange={handleChange}
            />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="text" /////////
            value={form.price}
            name="price"
            onChange={handleChange}
            />
        </div>
        <div>
            <label>Drug: </label>
        {/* <div className={style.contentSelect}> */}
          <select onChange={handleSelect} value={form.selectedDrug}>
            <option value="">Select a drug</option>
          
            {drugs.map((drug) => (
                <option className={style.letra} key={drug.id}value={drug.name}>{drug.name}</option>
                ))}
          </select>
          {/* </div> */}
        </div>
        <div>
            <label>Laboratory: </label>
        {/* <div className={style.contentSelect}> */}
          <select onChange={handleSelect} value={form.selectedLaboratory}>
            <option value="">Select a laboratory</option>
          
            {laboratory.map((lab) => (
              <option className={style.letra} key={lab.id}value={lab.name}>{lab.name}</option>
            ))}
          </select>
          {/* </div> */}
        </div>
        <div>
            <label>Presentation type: </label>
           {/* <div className={style.contentSelect}> */}
          <select onChange={handleSelect} value={form.selectedType}>
            <option value="">Select a type</option>
          
            {type.map((t) => (
                <option className={style.letra} key={t.id}value={t.type}>{t.type}</option>
                ))}
          </select>
          {/* </div> */}
        </div>
      
        <button
          className={style.submit}
          disabled={
              !form.name || !form.description || !form.image || !form.amount || !form.dose || !form.stock || !form.price || form.drugs.length === 0 ||form.laboratory.length === 0 || form.type.length === 0 
          }
          >    
         Create
        </button>
      </form>
          </div>
          </div>   
  );
};

export default PostProducts;
