export default {
    idPrefix: 'tbc',
    name: 'organisation-dx',
    header: "What's the DX reference for your main office?",
    formGroupValidators: [],
    'validationHeaderErrorMessages': [
      {
        validationLevel: 'formControl',
        controlId: 'DXnumber',
        text: 'Enter DX number',
        href: '/register/organisation-name'
      },
      {
        validationLevel: 'formControl',
        controlId: 'DXexchange',
        text: 'Enter DX exchange',
        href: '/register/organisation-name'
      }
    ],
    groups: [
        {
            input: {
                label: {
                    text: 'DX number',
                    classes: 'govuk-label--m',
                },
                control: 'DXnumber',
                validators: ['required'],
                validationError: {
                  value: 'Enter DX number',
                  controlId: 'DXnumber',
                },
                classes: 'govuk-!-width-two-thirds',
            },
        },
        {
            input: {
                label: {
                    text: 'DX exchange',
                    classes: 'govuk-label--m',
                },
                control: 'DXexchange',
                validators: ['required'],
                validationError: {
                  value: 'Enter DX exchange',
                  controlId: 'DXexchange',
                },
                classes: 'govuk-!-width-two-thirds',
            },
        },
        {
            button: {
                control: 'createButton',
                value: 'Continue',
                type: 'submit',
                classes: '',
                onEvent: 'continue',
            },
        },
    ],
}
