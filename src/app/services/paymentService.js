// This is a mock payment service
const processPayment = async (userId, amount) => {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful payment (95% success rate)
    const success = Math.random() < 0.95;
    
    return { success, message: success ? 'Payment successful' : 'Payment failed' };
  };
  
  export { processPayment };