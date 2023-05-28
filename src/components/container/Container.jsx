import React, { createRef, useState } from 'react';
import Card from '../pure/Card';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import '../../styles/form/formStyles.css';
import CompleteState from '../pure/CompleteState';

const CardSchema = Yup.object().shape({
    name: Yup.string()
    .required('Can\'t be blank'),

    cardNumber: Yup.string()
    .required('Required')
    .matches(/^[\d\s]+$/, "Wrong format, numbers only")
    .test('len', 'Must have 16 numbers', val => val.length === 19),

    expMonth: Yup.string()
    .required('Can\'t be blank')
    .test('len', 'Must have 2 numbers', val => val.length === 2)
    .matches(/^[\d]+$/, "Wrong format, numbers only"),

    expYear: Yup.string()
    .required('Can\'t be blank')
    .test('len', 'Must have 2 numbers', val => val.length === 2)
    .matches(/^[\d]+$/, "Wrong format, numbers only"),

    cvc: Yup.string()
    .required('Can\'t be blank')
    .test('len', 'Must have 3 numbers', val => val.length === 3)
    .matches(/^[\d]+$/, "Wrong format, numbers only")
});

const Container = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [nameClient, setName] = useState("");
    const [expMonth, setExpMonth] = useState("");
    const [expYear, setExpYear] = useState("");
    const [cardCvc, setCvc] = useState("");

    const formRef = createRef();
    const completeRef = createRef();

    const initialValues = {
        name: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: ''
    }

    const borderStyle = {
        border: '1px solid hsl(279, 6%, 55%)',
        borderRadius: '5px'
    };
    
    const borderStyleError = {
        border: "1px solid hsl(0, 100%, 66%)",
        backgroundImage: 'none',
        borderRadius: '5px'
    };

    const giveFormat = (number) => {
        return number.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    }

    const resetForm = () => {
        setCardNumber("");
        setName("");
        setCvc("");
        setExpMonth("");
        setExpYear("");
    }

    const submitDetails = () => {
        formRef.current.style.display = 'none';
        completeRef.current.style.display = 'flex';
    }

    const cont = () => {
        formRef.current.style.display = 'flex';
        completeRef.current.style.display = 'none';
        resetForm();
    }

    return (
        <div className='main-app'>
            <div id="cards-section">
                <Card 
                type='front' 
                cardNumber={cardNumber === "" ? "0000 0000 0000 0000" : giveFormat(cardNumber)}
                name={nameClient === "" ? "Jane Appleseed" : nameClient}
                expMonth={expMonth === "" ? "00" : expMonth}
                expYear={expYear === "" ? "00" : expYear}
                ></Card>
                <Card type='back' cvc={cardCvc === "" ? "000" : cardCvc}></Card>
            </div>
            <div id="form-section">
            <Formik
            initialValues={initialValues}
            validationSchema={CardSchema}
            onSubmit={async (values) => {
                submitDetails();
            }}
            >
            {({ values, errors, touched, setFieldValue }) => (
                <Form className='form' ref={formRef}>
                    <div id="cardholder-name-section">
                        <label htmlFor="name">CARDHOLDER NAME</label>
                        <Field type="text" name="name" placeholder="e.g. Jane Appleseed" value={nameClient} 
                        onChange={(e) => {setName(e.target.value); setFieldValue('name', e.target.value)}}
                        style={ (errors.name && touched.name) ? borderStyleError : borderStyle}
                        />
                        { errors.name && touched.name &&
                            (
                            <ErrorMessage name="name" component='div' className="error-message"></ErrorMessage>
                            )
                        }
                    </div>
                    <div id="card-number-section">
                        <label htmlFor="cardNumber">CARD NUMBER</label>
                        <Field type="text" name="cardNumber" placeholder="e.g. 1234 5678 9123 0000" value={cardNumber}
                            onChange={(e) => {setCardNumber(giveFormat(e.target.value)); setFieldValue('cardNumber', (giveFormat(e.target.value)))}}
                            style={ (errors.cardNumber && touched.cardNumber) ? borderStyleError : borderStyle}
                        />
                        { errors.cardNumber && touched.cardNumber &&
                            (
                            <ErrorMessage name="cardNumber" component='div' className="error-message"></ErrorMessage>
                            )
                        }
                    </div>
                    <div className='bottom-form'>
                        <div className='exp-date'>
                            <label htmlFor={expMonth}>EXP. DATE (MM/YY)</label>
                            <div id="exp-fields">
                                <div className="exp-field-section">
                                    <Field type="text" className="exp-field" name="expMonth" placeholder="MM" value={expMonth} 
                                    onChange={(e) => {setExpMonth(e.target.value); setFieldValue('expMonth', e.target.value)}}
                                    style={ (errors.expMonth && touched.expMonth) ? borderStyleError : borderStyle}
                                    />
                                    { errors.expMonth && touched.expMonth &&
                                        (
                                        <ErrorMessage name="expMonth" component='div' className="error-message"></ErrorMessage>
                                        )
                                    }
                                </div>
                                <div className="exp-field-section">
                                    <Field type="text" className="exp-field" name="expYear" placeholder="YY" value={expYear} 
                                    onChange={(e) => {setExpYear(e.target.value); setFieldValue('expYear', e.target.value)}}
                                    style={ (errors.expYear && touched.expYear) ? borderStyleError : borderStyle}
                                    />
                                    { errors.expYear && touched.expYear &&
                                        (
                                        <ErrorMessage name="expYear" component='div' className="error-message"></ErrorMessage>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div id='cvc-section'>
                            <label htmlFor="cvc">CVC</label>
                            <Field type="text" name="cvc" placeholder="e.g. 123" value={cardCvc} 
                            onChange={(e) => {setCvc(e.target.value); setFieldValue('cvc', e.target.value)}}
                            style={ (errors.cvc && touched.cvc) ? borderStyleError : borderStyle}
                            />
                            { errors.cvc && touched.cvc &&
                                (
                                <ErrorMessage name="cvc" component='div' className="error-message"></ErrorMessage>
                                )
                            }
                        </div>
                    </div>
                    <button type="submit" id="submit-button">Confirm</button>
                </Form>
                )}
            </Formik>
            <CompleteState innerRef={completeRef} cont={cont}></CompleteState>
            </div>
        </div>
    );
}

export default Container;
