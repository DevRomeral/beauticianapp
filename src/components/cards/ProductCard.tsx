'use client';

import { Product } from '@/types/product.model';
import { printTime } from '@/utils/format/DateFormat';
import { printPrice } from '@/utils/format/PriceFormat';
import { useTranslations } from 'next-intl';

import Card from './Card';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const t = useTranslations('Components.ProductCard');
  // const router = useRouter();

  // const viewDetails = () => {
  //   alert('TO BE DONE');
  //   // router.push(`/clientes/${product.id}`);
  // };

  const priceElement = product.price > 0 ? `${printPrice(product.price)} ${t('price')}` : t('freePrice');
  const timeElement = product.estimatedtime > 0 ? printTime(product.estimatedtime) : '';

  return (
    <Card id={product.id}>
      <div className="flex justify-between">
        <span className="text-lg font-bold lowercase text-primary-400">{priceElement}</span>
        <span className="text-sm font-medium lowercase">{timeElement}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-secondary-400">{product.category}</span>
        <span className="text-xl font-bold">{product.name}</span>
      </div>
    </Card>
  );
};

export default ProductCard;
