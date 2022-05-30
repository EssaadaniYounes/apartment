import React, { useEffect, useState } from 'react'
import { Form, TwoItemsContainer } from '../../../components/parts'
import { useUserContext } from '../../../context/user';
import { AutoLogin } from '../../../helpers/auto-login';
import fetch from '../../../helpers/fetch-data';
const classes = {
  label: 'absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
  input: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function add({ roles, dataUser }) {
  const { setUser } = useUserContext();
  //fields name email password role_id 
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
    }
  }, []);

  const addUser = async () => {
    setIsLoading(true);
    const payload = {
      'name': name,
      'email': email,
      'password': password,
      'role_id': roleId,
    };
    const response = await fetch('register', 'post', payload, localStorage.getItem('token'));
    setIsLoading(false);
    setName('');
    setEmail('');
    setPassword('');
    setRoleId('');
    console.log(response);
  }

  return (
    <Form>
      <TwoItemsContainer>
        <div className="relative z-0 mb-6 w-full md:w-[49%] group">
          <input type="text"
            className={classes.input}
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <label className={classes.label}>Nom</label>
        </div>
        <div className="relative z-0 mb-6 w-full md:w-[49%] group">
          <input type="email"
            className={classes.input}
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <label className={classes.label}>Email</label>
        </div>
      </TwoItemsContainer>
      <TwoItemsContainer>
        <div className="relative z-0 mb-6 w-full md:w-[49%] group">
          <input type="password"
            className={classes.input}
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <label className={classes.label}>Mot de pass</label>
        </div>
        <div className="relative z-0 mb-6 w-full md:w-[49%] group">
          <select className={classes.input} value={roleId} onChange={(e) => { setRoleId(e.target.value) }}>
            <option value="" disabled defaultChecked={true}>Choisir un role</option>
            {roles.map(role => <option value={role.id} key={role.id}>{role.role_name}</option>)}
          </select>
          <label className={classes.label}>Role</label>
        </div>
      </TwoItemsContainer>
      <button onClick={() => addUser()} className=" mt-8 relative block min-w-[20%] h-[45px] mx-auto sm:w-fit p-0.5 mb-2  overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 text-blue-700 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span className="relative  min-w-full flex items-center justify-center h-full sm:text-right  sm:w-fit  px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Enregistrer
          </span>
        </span>
      </button>
    </Form>
  )
}
export const getServerSideProps = async (ctx) => {
  const response = await fetch('roles', 'get', {}, ctx.req.cookies.token);
  const res = await AutoLogin(ctx);
  return {
    props: {
      roles: response.data,
      dataUser: res.dataUser,
    }
  }
}
export default add