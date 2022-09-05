const Loaing = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <span
        className=" inline-block h-3 w-3 rounded-full bg-blue-500 animate-bulging mx-1"
        style={{ animationDelay: '-0.3s' }}
      ></span>
      <span
        className=" inline-block h-3 w-3 rounded-full bg-blue-500 animate-bulging mx-1 delay-200"
        style={{ animationDelay: '-0.1s' }}
      ></span>
      <span className=" inline-block h-3 w-3 rounded-full bg-blue-500 animate-bulging mx-1"></span>
    </div>
  );
};

export default Loaing;
