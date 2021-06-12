import React from 'react';

import formatLongNumbers from '@utils/formatLongNumber';

interface InteractionCountProps {
  count: number;
  message: string;
}

const InteractionCount: React.FC<InteractionCountProps> = ({
  count,
  message,
}) => (
  <>
    {count > 0 && (
      <p>
        {formatLongNumbers(count)} {count > 1 ? `${message}s` : message}
      </p>
    )}
  </>
);

export default InteractionCount;
