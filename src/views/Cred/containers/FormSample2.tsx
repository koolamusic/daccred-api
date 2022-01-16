import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';
import { schema, uiSchema } from '@/lib/form/schema';

const FieldWrapper: React.FC = ({ children, ...rest }): JSX.Element => {
  return (
    <section className='min-w-full px-10 py-6 pb-8 mx-auto my-6 bg-white border-2 rounded-lg' {...rest}>
      {children}
    </section>
  );
};

export default function FormSample2(): JSX.Element {
  const [formSchema, setFormSchema] = useState<JSONSchema7>({});

  useEffect(() => {
    // Set Form Schema to default to defined schema in page
    setFormSchema(schema);

    // Try to retrieve existing schema from localstorage
    // const storageForm = JSON.parse(localStorage.getItem('__rjsForm') || '');

    setTimeout(() => {
      // setFormSchema(storageForm)
    }, 3000);

    // return () => {
    //     cleanup
    // };
  }, []);

  // const storageForm = JSON.parse(localStorage.getItem("__rjsForm") || "")
  // console.warn(localStorage.getItem("__rjsForm") || "")

  return (
    <section className='flex flex-col'>
      {/* === section to render the form Heading and Description with Divider ==== */}
      <FieldWrapper>
        <h1>Advocacy Database Form</h1>
      </FieldWrapper>
      {/* === section to render the form Heading and Description with Divider ==== */}

      {/* =========== Section to generate Form Fields for Public Forms =================== */}
      <FieldWrapper>
        <Form
          schema={formSchema}
          uiSchema={uiSchema}
          disabled
          onSubmit={(data) => {
            alert('DATA SUBMITTED' + JSON.stringify(data.formData));
          }}
        />
      </FieldWrapper>
      {/* =========== Section to generate Form Fields for Public Forms =================== */}

      {/* === Section to render the form Button  === */}

      {/* <MainBox
                width="40rem"
                margin={'auto'}
                my={2}
                pb={10}
                alignItems="center"
                justifyContent="center"
            >
                <SubmitButton
                    mt="4"
                    withIcon
                    analyticName="Click Submit Form"
                    buttonName="Submit"
                // border={theme.custom.altBorder}
                />
            </MainBox> */}
      {/* === Section to render the form Button  === */}
    </section>
  );
}
