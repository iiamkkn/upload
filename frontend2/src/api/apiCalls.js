export const getClientToken = async () => {
  try {
    const response = await fetch(
      'http://localhost:5000/api/generate/bt_token',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const makePayment = async (data) => {
  try {
    const response = await fetch(
      'http://localhost:5000/api/process/BTpayment',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
