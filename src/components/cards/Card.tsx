import React from 'react';

export interface CardProps {
  id: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ id, children }) => {
  return (
    <div className="rounded-card flex flex-col gap-2 bg-background-50 p-2" id={id} data-testid={id}>
      {children}
    </div>
  );
};

export default Card;
