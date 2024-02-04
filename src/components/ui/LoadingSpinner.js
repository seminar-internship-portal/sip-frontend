// components/LoadingSpinner.js
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader type="TailSpin" color="#4A90E2" height={80} width={80} />
  </div>
);

export default LoadingSpinner;
