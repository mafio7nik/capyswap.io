// components/PresaleForm.tsx
import React, { useState } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';

const PresaleForm: React.FC = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleContribute = async () => {
    try {
      const response = await axios.post('/api/contribute', { address, amount });
      console.log('Contribution transaction hash:', response.data.txHash);
    } catch (error) {
      console.error('Error contributing to presale:', error);
    }
  };

  return (
    <Stack direction="column" spacing="medium"> {/* Use "column" for vertical stacking */}
      <Input placeholder="Your BSC address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Input type="number" placeholder="Amount to contribute" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Button variant="solid" onClick={handleContribute}>
        Contribute
      </Button>
    </Stack>
  );
};
const SwapForm: React.FC = () => {
  const [ammount, setamount] = useState('');
  const [token, settoken] = useState('');
  return (
    <Stack direction="column" spacing="medium">
      <Input placeholder='Ammount' value={ammount} onChange={(e) => setamount(e.target.value)} />
    </Stack>
  );
};

export default PresaleForm;
