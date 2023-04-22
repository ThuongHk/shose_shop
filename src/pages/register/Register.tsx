import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Switch } from 'antd';
import { useFormik } from 'formik';
import { http } from '../../util/settings/config';
import { callApiRegister } from '../../redux/loginSlice';
import { DispatchType } from '../../redux/store';
import { useDispatch } from 'react-redux';

type SizeType = Parameters<typeof Form>[0]['size'];

export interface RegisterModel {
    email: string,
    password: string,
    name: string,
    gender: boolean,
    phone: string

}

const Register = () => {
    const dispatch: DispatchType = useDispatch()
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };
    const formik = useFormik<RegisterModel>({
        initialValues: {
            email: '',
            password: '',
            name: '',
            gender: true,
            phone: ''
        },
        onSubmit:  (values: RegisterModel) => {
        const  actionThunk = callApiRegister(values) 
        dispatch(actionThunk)          
          
        }
    })
    const handChangeForm = (name: string) => {
        return (value: boolean | string) => {
            formik.setFieldValue(name, value)


        }
    }
    return (
        <Form className='w-75 m-auto mt-5'
            onSubmitCapture={formik.handleSubmit}
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 600 }}
        >
           
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <h2 className="h2 text-center mb-4">Create a account</h2>
            <Form.Item label="Email">
                <Input name='email' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Password">
                <Input name='password' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Name">
                <Input name='name' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Phone">
                <InputNumber onChange={handChangeForm('phone') as any} />
            </Form.Item>
            <Form.Item label="Gender" valuePropName="checked" >
                <Switch onChange={handChangeForm('gender')} />
            </Form.Item>
            <Form.Item >
                <Button className="btn btn-outline-primary" htmlType="submit">Register</Button>
            </Form.Item>
        </Form>
    );
};

export default Register;