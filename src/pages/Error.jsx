import { useNavigate } from 'react-router-dom';
import classes from './Error.module.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <main>
        <h3>OOPS</h3>
        <h4>The page you are looking for is not here</h4>
        <button onClick={()=>navigate('/')}>&#x21D0; Go back</button>
      </main>
    </div>
  );
};

export default ErrorPage;
