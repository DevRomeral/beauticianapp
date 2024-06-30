export interface CustomerCardProps {
  disease: string;
  customerId?: string;
}

const DiseaseCard: React.FC<CustomerCardProps> = ({ disease, customerId }) => {
  return (
    <span className="rounded-sm bg-secondary-100 px-2 py-0 text-sm text-secondary-500" id={`${customerId}_${disease}`}>
      {disease}
    </span>
  );
};

export default DiseaseCard;
