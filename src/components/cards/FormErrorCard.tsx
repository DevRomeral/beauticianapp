'use client';

export interface FormErrorCardProps {
  errors: string[];
}

const FormErrorCard: React.FC<FormErrorCardProps> = ({ errors }) => {
  if (errors.length == 0) {
    return '';
  }

  return (
    <div data-testid="divErrorMessage" className="my-6 border border-red-400 bg-red-200 p-3 text-red-700">
      {errors.map((e) => (
        <p key={e}>{e}</p>
      ))}
    </div>
  );
};

export default FormErrorCard;
