'use client';

import React from "react";
import Layout from "@/components/layout/layout";
import Heading from "@/components/layout/heading";
import ProductsList from "@/components/product/productsList";
import ProductsStats from "@/components/product/productsStats";

export default function ProductsPage() {
    return (
        <Layout>
            <Heading/>
            <ProductsStats/>
            <ProductsList/>
        </Layout>
    );
}