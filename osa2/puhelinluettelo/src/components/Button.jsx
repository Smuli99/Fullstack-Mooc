const Button = ({ type, text }) => {
  return (
    <div>
      <button type={type}>{text}</button>
    </div>
  );
};

export default Button;