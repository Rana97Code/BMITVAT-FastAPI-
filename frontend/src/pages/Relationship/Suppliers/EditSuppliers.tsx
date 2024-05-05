import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useParams  } from "react-router-dom";
import IconFile from '../../../components/Icon/IconFile';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import axios from 'axios';

const editSuupliers = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [bin, setBin] = useState("");
  const [tin, setTin] = useState("");

  interface countrys {
    id: number;
    countryName: string;
  }
  const [countries, setAllCountry] = useState<countrys[]>([]);



  const params = useParams();
  const navigate = useNavigate();

  const getSuppDetails = async()=>{
      const token = localStorage.getItem('Token');
      if(token){
          const bearer = JSON.parse(token);
          const headers= { Authorization: `Bearer ${bearer}` }

      await axios.get(`http://localhost:8080/bmitvat/api/supplier/get_supplier/${params.id}`,{headers})
          .then((response) => {
              // setInitialRecords(response.data);
              const data = response.data;
              console.log(data);
              setName(data.supplierName)
              setEmail(data.supplierEmail)
              setPhone(data.supplierPhone)
              setAddress(data.supplierAddress)
              setType(data.supplierType)
              setCountry(data.countryId)
              setBin(data.supplierBinNid)
              setTin(data.supplierTin)

          })
          .catch((error) => {
              console.error('Error fetching data:', error);
          });
      }
  }
  useEffect(()=>{
    const token = localStorage.getItem('Token');
    if(token){
        const bearer = JSON.parse(token);
        const headers= { Authorization: `Bearer ${bearer}` }

    axios.get('http://localhost:8080/bmitvat/api/country/all_country',{headers})
        .then((response) => {
            setAllCountry(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }


      getSuppDetails();   //create this function
  },[])  //Use array

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      const supplier = {
        supplierName: name,
        supplierEmail:email,
        supplierPhone: phone,
        supplierAddress: address,
        supplierType: type,
        countryId: country,
        supplierBinNid: bin,
        supplierTin: tin,
        createdBy: '1',
      }

        console.log(supplier);

      const token = localStorage.getItem('Token');
      if(token){
          const bearer = JSON.parse(token);
          const headers= { Authorization: `Bearer ${bearer}` }


      try {
          console.log(supplier);
         await axios.put(`http://localhost:8080/bmitvat/api/supplier/update_supplier/${params.id}`, supplier, {headers})
        .then(function (response){
          navigate("/pages/relationship/suppliers");
        })

      } catch (err) {
        console.log(err);
      }
      }
    };

  return (
    <div>
      <div className="panel flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-bold">Suppliers</h2>
      </div>
      <div className="panel mt-6">
        {/* Grid */}
        <div id="forms_grid">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-lg dark:text-white-light">Edit Supplier</h3>

          </div>

          <div className="mb-5">
            <form className="space-y-5"  onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="suName">Name</label>
                  <input id="suName" type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="suEmail">Email</label>
                  <input id="suEmail" type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)}  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="suPhone">Phone</label>
                  <input id="suPhone" type="tel" className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)}  />
                </div>
                <div>
                  <label htmlFor="supplierType">Supplier Type</label>
                  <div>
                    <select className="form-select text-dark " value={type} onChange={(e) => setType(e.target.value)}  >
                      <option value="1">Local</option>
                      <option value="2">Foregin</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="tagging">
                 <div>
                  <label htmlFor="suAddress">Address</label>
                  <input id="suAddress" type="text" value={address} className="form-input" onChange={(e) => setAddress(e.target.value)} />
                </div>
                  <div>
                  <label htmlFor="countryId">Country</label>
                    <select className="form-select text-dark " value={country} onChange={(e) => setCountry(e.target.value)} >
                      <option value="1">Select Countries</option>
                      {countries.map((option, index) => ( 
                          <option key={index} value={option.id}> 
                              {option.countryName} 
                      </option> 
                      ))} 
                    </select>                  
                </div>

              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="suBinNid">BIN/NID</label>
                  <input id="suBinNid" type="tel" className="form-input" value={bin} onChange={(e) => setBin(e.target.value)} />
                </div>
                <div>
                  <div>
                    <label htmlFor="suTin">TIN</label>
                    <input id="suTin" type="tel" className="form-input" value={tin} onChange={(e) => setTin(e.target.value)}/>
                  </div>
                  <div>
                    <h1 className='mt-5 mb-5'>
                      If Customer type is local then BIN/NID or TIN must be submitted.
                      If Customer type is Foreign then no need BIN/NID or TIN.
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex items-center  justify-center gap-6">
                <button type="submit" className="btn btn-success gap-2">
                  <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                  Submit
                </button>
                <Link to="/pages/relationship/suppliers">
                <button type="button" className="btn btn-danger gap-2" >
                  <IconTrashLines className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                  Cancel
                </button>
                </Link>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default editSuupliers;
