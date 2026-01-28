import "./LoginPage.css"
const LoginPage = () => {
  return (
    <div className="containers">
      <h3 className="heading">Login to Continue</h3>
      <form action={onsubmit} className="form">
        <label>Email:</label>
        <input type="email" required={true} placeholder="enter your email" />
        <label>Password:</label>
        <input
          type="password"
          required={true}
          placeholder="enter your password"
        />
        <button className="btn" onClick={onsubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
