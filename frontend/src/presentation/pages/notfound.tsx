const notfound = () => {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-cener">
        <div className="max-w-md w-full mx-auto">
          <div className="text-9xl font-bold text-gray-900 mt-2 text-center">
            404
          </div>
          <br />
          <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
            Page not found
          </div>
        </div>
      </div>
    );
  };
  
  export default notfound;