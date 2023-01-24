import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import 'react-datepicker/dist/react-datepicker.css';
import './styles/InputTransactionForm.css';
import Select from 'react-select';
import sprite from 'images/icons_sprite.svg';
import { Btn } from 'components/Buttons/Btn';
import { API_TRANSACTION } from '../../api/apiTransactionCategories';
import {
  addTransactionOp,
  fetchCategoriesOp,
} from 'redux/transactions/transactionsOps';
import { DatePickerComponent } from 'components/DatePickerComponent/DatePickerComponent';
import Notiflix from 'notiflix';
import { notifySettings } from '../../utils/notifySettings';

import {
  selectisLoadingOptions,
  selectTransactionsOptions,
  selectTransactionsOptionsLength,
} from 'redux/transactions/transactionsSelectors';
import { selectStyles } from './styles/selectStyles';
import {
  ButtonsWrapper,
  InputAmount,
  InputAmountWrapper,
  InputForm,
  InputGroupWrapper,
  InputProduct,
  MainContainer,
} from './styles/InputTransactionForm.styled';

export default function InputTransactionForm({ type }) {
  const TRANSACTION_FORM_DATA = {
    expense: {
      description: 'Product description',
      selectCategoryPlaceholder: 'Product category',
    },
    income: {
      description: 'Income description',
      selectCategoryPlaceholder: 'Income category',
    },
  };

  const today = new Date();
  const initialFormData = {
    product: '',
    sum: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [date, setDate] = useState(today);
  const [category, setCategory] = useState(null);

  const dispatch = useDispatch();
  const transactionsOptions = useSelector(selectTransactionsOptions);
  const transactionsOptionsLength = transactionsOptions[type].length;
  const isLoadingOpts = useSelector(selectisLoadingOptions);

  useEffect(() => {
    console.log('use effect is working');
    if (transactionsOptionsLength || isLoadingOpts) return;
    dispatch(fetchCategoriesOp(type));
    // eslint-disable-next-line
  }, [type]);

  const onClearForm = () => {
    setDate(today);
    setFormData(initialFormData);
    setCategory(null);
  };

  const isFormValid = (product, category, sum) => {
    let isValid = true;
    if (!product) {
      Notiflix.Notify.warning(
        'You should enter transaction description',
        notifySettings
      );
      isValid = false;
    }
    if (!category) {
      Notiflix.Notify.warning(
        'You should choose transaction category',
        notifySettings
      );
      isValid = false;
    }
    if (sum === '' || parseFloat(sum) < 0.01) {
      Notiflix.Notify.warning(
        'You should enter transaction amount',
        notifySettings
      );
      isValid = false;
    }
    return isValid;
  };

  const onFormSubmit = () => {
    if (!isFormValid(formData.product, category, formData.sum)) return null;
    const transaction = {
      description: formData.product,
      amount: parseFloat(formData.sum),
      date: date.toISOString().split('T')[0],
      category: Object.keys(API_TRANSACTION[type].apiCategories)[
        category.value
      ],
    };
    dispatch(addTransactionOp({ type, transaction }));
    onClearForm();
  };

  const validateSumInput = value => {
    if (value === '') {
      setFormData(oldData => {
        return { ...oldData, sum: '' };
      });
      return null;
    }

    let num = parseFloat(value);

    if (isNaN(num)) num = formData.sum;

    setFormData(oldData => {
      return { ...oldData, sum: num };
    });
  };

  console.log('RENDER');

  return (
    <MainContainer>
      <InputForm>
        <DatePickerComponent
          name="date"
          date={date}
          maxDate={today}
          handler={date => setDate(date)}
        />
        <InputGroupWrapper>
          <InputProduct
            type="text"
            value={formData.product}
            name="product"
            placeholder={TRANSACTION_FORM_DATA[type].description}
            onChange={e =>
              setFormData(oldData => {
                return { ...oldData, product: e.target.value };
              })
            }
          />
          <Select
            key={type}
            defaultOptions
            placeholder={TRANSACTION_FORM_DATA[type].selectCategoryPlaceholder}
            styles={selectStyles}
            options={transactionsOptions[type] ?? []}
            isLoading={isLoadingOpts}
            closeMenuOnSelect={true}
            onChange={selectedOption => setCategory(selectedOption)}
            value={category}
          />
          <InputAmountWrapper>
            <InputAmount
              type="text"
              value={formData.sum}
              name="product"
              placeholder="0.00"
              onChange={e => validateSumInput(e.target.value)}
            />
            <svg
              className="input-product-form--calc-svg"
              width="20"
              height="20"
            >
              <use href={sprite + `#calculator`}></use>
            </svg>
          </InputAmountWrapper>
        </InputGroupWrapper>
        <ButtonsWrapper>
          <Btn text="INPUT" onClick={onFormSubmit} />
          <Btn text="CLEAR" onClick={onClearForm} />
        </ButtonsWrapper>
      </InputForm>
    </MainContainer>
  );
}
