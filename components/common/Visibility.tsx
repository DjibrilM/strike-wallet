import React from 'react';

interface VisibleProps {
  condition: boolean;
  children: React.ReactNode; // Can be any React node, not just elements
  fallBack?: React.ReactNode
}

const Visible: React.FC<VisibleProps> = ({ condition, children, fallBack = null }) => {
  return condition ? children : (fallBack);
};

export default Visible;