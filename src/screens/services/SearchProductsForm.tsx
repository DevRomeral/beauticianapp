'use client';

import { fetchProducts } from '@/services/api/ApiProductService';
import { Product } from '@/types/product.model';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import ProductCard from '@/components/cards/ProductCard';
import DebugInfo from '@/components/DebugInfo';
import PageTitle from '@/components/display/PageTitle';
import { ButtonProps } from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

export const FormConfig = {
  formId: 'searchCustomersForm',
  queryTextId: 'queryTextInput',
  panelNotFoundId: 'customersNotFound',
};

export default function SearchProductsForm() {
  const t = useTranslations('Products');
  // const router = useRouter();
  const [noResultsPanelVisible, setNoResultsPanelVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const crearServicio = () => {
    alert('TO BE DONE');
    // router.push('/products/crear');
  };

  const buttonProps: ButtonProps = {
    id: 'btnNewProduct',
    text: t('form.buttonNew.title'),
    onClick: crearServicio,
    icon: 'add',
  };

  const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const queryText = event.target.value.toLocaleLowerCase();

      if (queryText.length == 0) {
        setFilteredProducts([]);
        setNoResultsPanelVisible(true);
        return;
      }

      // TODO: en este momento no tiene sentido filtrar, porque el back ya te lo debe dar filtrado, no? De ser así, quitar el filtro de clientes
      const products = await fetchProducts(queryText);

      setFilteredProducts(products.map((data): Product => Product.createFromInterface(data)));
      setNoResultsPanelVisible(products.length == 0);
    } catch (err) {
      console.error(err);
      console.error('Error when fetching products');
    }
  };
  return (
    <div className="container mx-auto">
      <PageTitle title={t('title')} btnProps={buttonProps} />
      <DebugInfo>
        <p>Prueba a buscar solo la letra c</p>
      </DebugInfo>
      <form id={FormConfig.formId} data-testid={FormConfig.formId}>
        <TextField
          id={FormConfig.queryTextId}
          label={t('form.main.label')}
          placeholder={t('form.main.placeholder')}
          type="text"
          onChangeHandler={onChangeHandler}
        />
      </form>
      <div className="mt-6">
        {(noResultsPanelVisible && (
          <div id={FormConfig.panelNotFoundId} data-testid={FormConfig.panelNotFoundId}>
            {t('noResults')}
          </div>
        )) || (
          <div className="flex flex-col gap-1">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
