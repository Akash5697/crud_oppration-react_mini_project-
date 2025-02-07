import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Employeedata } from './assets/api'

function App() {
  const [data, setData] = useState([]);
  const [firstname,setFirstName] = useState('');
  const [lastname,setlastName] = useState('');
  const [age,setAge] = useState('');
  const [id,setId] = useState(0);
  const [isupdate,setIsUpdate] = useState(false);

  
  useEffect(() => {
    setData(Employeedata)
  }, [])

  const handelEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined){
      setIsUpdate(true)
      setId(id);
      setFirstName(dt[0].firstname);
      setlastName(dt[0].lastname);
      setAge(dt[0].age);
    }
  }

  const handelDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sur to delete this itam")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }

    }
  }

  const handelSave = (e) => {

    if (!firstname || !lastname || !age) {
      alert('All fields are required!');
      return;
    }

    e.preventDefault();
    const dt =[...data];
    const newobject = {
      id:Employeedata.length+1,
      firstname:firstname,
      lastname:lastname,
      age:age
    } 
    dt.push(newobject);
    setData(dt);
  }
  
  const handelUpdate = () => {
    if (!firstname || !lastname || !age) {
      alert('All fields are required!');
      return;
    }

    const updatedData = data.map((item) =>
      item.id === id ? { id, firstname, lastname, age } : item
    );

    setData(updatedData);
    setIsUpdate(false);
    handleClear();
  }

  

  const handelClear = () => {
    setId(0);
    setFirstName('');
    setlastName('');
    setAge('');
  }

  return (
    <>
      <div className='table-container'>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10px', marginBottom:'10px' }}>
          <div>
            <label >First Name:
              <input type="text" placeholder='Enter First Name' onChange={(e)=>setFirstName(e.target.value)} value={firstname}/>
            </label>
          </div>
          <div>
            <label >Last Name:
              <input type="text" placeholder='Enter Last Name' onChange={(e)=>setlastName(e.target.value)} value={lastname}/>
            </label>
          </div>
          <div>
            <label >Age:
              <input type="text" placeholder='Enter Age' onChange={(e)=>setAge(e.target.value)} value={age}/>
            </label>
          </div>
          <div>
              {
                !isupdate ? <button className='btn-save' onClick={(e) => handelSave(e)}>Save</button> :
                <button className='btn-save' onClick={() => handelUpdate()}>Update</button>
              }
           
            <button className='btn-clear' onClick={() => handelClear()}>Clear</button>

          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>Sr.No</td>
              <td>Id</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return (
                  <tr className='tr-class' key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.age}</td>
                    <td>
                      <button className='btn-edit' onClick={() => handelEdit(item.id)}>Edit</button>
                      <button className='btn-delete' onClick={() => handelDelete(item.id)}>Delete</button>
                    </td>


                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default App
