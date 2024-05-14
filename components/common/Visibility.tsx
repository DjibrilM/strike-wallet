import React from 'react';

interface VisibleProps {
  condition: boolean;
  children: React.ReactNode; // Can be any React node, not just elements
}

const Visible: React.FC<VisibleProps> = ({ condition, children }) => {
  return condition ? children : null;
};

export default Visible;