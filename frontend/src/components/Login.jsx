function Login() {
  return (
    <div className="w-[400px] bg-red-300 h-[500px] py-10 px-5">
      <input
        type="text"
        className="px-2 py-2 w-full rounded focus:outline-none"
        placeholder="Your email address or profile URL"
      />
    </div>
  );
}

export default Login;
