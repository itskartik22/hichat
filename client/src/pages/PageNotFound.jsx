import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen text-black">
      <div className="text-center p-8 bg-white bg-opacity-10 rounded-lg shadow-lg max-w-lg">
        <div className="text-6xl mb-4">💬</div>
        <h1 className="text-3xl font-bold mb-2">Oops! We couldn&apos;t find that page.</h1>
        <p className="text-lg mb-6">It looks like you&apos;re lost in chat space...</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition duration-300"
        >
          Back to Chat
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
