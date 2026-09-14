'use client';

import React from 'react'
import Layout from "@/components/layout/layout";
import Heading from "@/components/heading";
import ProductForm from "@/features/products/components/productForm";

export default function ProductsPage() {
    return (
        <Layout>
            <Heading title={"product"} />
            <ProductForm onSubmit={(values) => {
                console.log(values);
            }} />
        </Layout>
    );
}