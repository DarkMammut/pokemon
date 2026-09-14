'use client';

import Form, { FormField } from '@/components/form';

interface ProductFormProps {
    defaultValues?: {
        product_name?: string;
        product_type?: string;
        product_price?: string;
        product_availability?: string;
        product_url?: string;
    };

    onSubmit: (
        values: Record<string, string | boolean>
    ) => void | Promise<void>;

    disabled?: boolean;
}

export default function ProductForm({
                                        defaultValues = {},
                                        onSubmit,
                                        disabled = false,
                                    }: ProductFormProps) {

    const fields: FormField[] = [
        {
            name: 'product_name',
            type: 'text',
            label: 'product_name',
            placeholder: 'product_name',
            required: true,
            colSpan: 3,
        },
        {
            name: 'product_type',
            type: 'text',
            label: 'product_type',
            placeholder: 'product_type',
            required: true,
            colSpan: 3,
        },
        {
            name: 'product_price',
            type: 'number',
            label: 'product_price',
            placeholder: 'product_price',
            required: true,
            colSpan: 3,
        },
        {
            name: 'product_availability',
            type: 'select',
            label: 'product_availability',
            required: true,
            colSpan: 3,
            options: [
                {
                    value: 'in_stock',
                    label: 'in_stock',
                },
                {
                    value: 'out_of_stock',
                    label: 'out_of_stock',
                },
            ],
        },
        {
            name: 'product_url',
            type: 'url',
            label: 'product_url',
            placeholder: 'product_url',
            required: true,
            colSpan: 'full',
        },
    ];

    return (
        <Form
            title="product_form_title"
            description="product_form_description"
            fields={fields}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            disabled={disabled}
            submitLabel="save"
            cancelLabel="cancel"
            className={"max-w-4xl mx-auto"}
        />
    );
}