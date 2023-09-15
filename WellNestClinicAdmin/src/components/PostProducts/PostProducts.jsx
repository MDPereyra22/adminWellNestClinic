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
    imageUrl: "",
    stock: "",
    price: "",
    needPrescription:false,
    drugs: [],
    laboratory: 0,
    presentation: 0,
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectDrugs = (e) => {
    setform({
      ...form,
      drugs: [...form.drugs, e.target.value],
    });
  };

  const handleSelectLab = (e) => {
    setform({
      ...form,
      laboratory: e.target.value
    });
  };

  const handleSelectType = (e) => {
    setform({
      ...form,
      presentation: e.target.value
    });
  };

  

  const handleSubmit = (e) => {
    console.log("hola");
    e.preventDefault()
    axios
    .post("https://serverwellnestclinic.onrender.com/product", form)
    .then((response) => {
        alert("Product created successfully:", response.data);
        navigate("/home")
    })
    .catch((error) => {
        alert("Error creating the product:", error);
    });
  }



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
    <form className={style.form} onSubmit={handleSubmit}>
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
            value={form.imageUrl}
            name="imageUrl"
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
          <select onChange={handleSelectDrugs} >
            <option value="">Select a drug</option>
          
            {drugs.map((drug) => (
                <option className={style.letra} key={drug.id}value={drug.id}>{drug.name}</option>
                ))}
          </select>
          {/* </div> */}
        </div>
        <div>
            <label>Laboratory: </label>
        {/* <div className={style.contentSelect}> */}
          <select onChange={handleSelectLab} >
            <option value="">Select a laboratory</option>
          
            {laboratory.map((lab) => (
              <option className={style.letra} key={lab.id}value={lab.id}>{lab.name}</option>
            ))}
          </select>
          {/* </div> */}
        </div>
        <div>
            <label>Presentation type: </label>
           {/* <div className={style.contentSelect}> */}
          <select onChange={handleSelectType} >
            <option value="">Select a type</option>
          
            {type.map((t) => (
                <option className={style.letra} key={t.id}value={t.id}>{t.type}</option>
                ))}
          </select>
          {/* </div> */}
        </div>
      
        <button
          className={style.submit}
          type="submit"
          // disabled={
          //     !form.name || !form.description || !form.image || !form.amount || !form.dose || !form.stock || !form.price || form.drugs.length === 0 ||form.laboratory.length === 0 || form.type.length === 0 
          // }
          >    
         Create
        </button>
      </form>
          </div>
          </div>   
  );
};

export default PostProducts;
