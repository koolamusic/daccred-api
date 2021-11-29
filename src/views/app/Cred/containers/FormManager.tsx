import React from 'react';
import FormSample from './FormSample';

/* Import Page Components here */ const FormManager = () => {
  return (
    <section className='mx-auto mt-24 mb-16 border-t-4 border-b-4 opacity-80'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-3 text-left align-center'>
        <p className='max-w-2xl m-auto mt-8'>
          we have automatically generated a custom form you can send to your groups so their data can be used to
          generate their credentials for them
        </p>
      </section>

      <FormSample />
    </section>
  );
};

export default FormManager;
