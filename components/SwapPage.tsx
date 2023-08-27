// SwapPage.tsx

import React from 'react';
import dynamic from 'next/dynamic';

const DynamicSwapComponent = dynamic(() => import('../components/swap'), { ssr: false });

function SwapPage() {
  return <DynamicSwapComponent />;
}

export default SwapPage;
