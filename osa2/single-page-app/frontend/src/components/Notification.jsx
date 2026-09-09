import { Alert } from '@mui/material';

const Notification = ({ notification }) => {
  if (notification === null) return null;

  const style = {
    marginTop: 10,
    marginBottom: 10
  };

  return (
    <Alert style={style} severity={notification.type}>
      {notification.text}
    </Alert>
  );
};

export default Notification;