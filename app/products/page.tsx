'use client';

import React from 'react'
import Layout from "@/components/layout/layout";
import Heading from "@/components/heading";
import ProductsList from "@/features/products/components/productsList";
import ProductsStats from "@/features/products/components/productsStats";

const pokemonProducts = [
    {
        id: 'pkmn-001',
        name: 'Poké Ball Classique',
        type: 'Poké Ball',
        price: 200,
        isAvailable: true,
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
    },
    {
        id: 'pkmn-002',
        name: 'Super Potion',
        type: 'Soin',
        price: 700,
        isAvailable: true,
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png'
    },
    {
        id: 'pkmn-003',
        name: 'Pierre Foudre',
        type: 'Évolution',
        price: 3000,
        isAvailable: false,
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/thunder-stone.png'
    },
    {
        id: 'pkmn-004',
        name: 'Rappel Max',
        type: 'Soin',
        price: 1500,
        isAvailable: false,
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-revive.png'
    },
    {
        id: 'pkmn-005',
        name: 'Master Ball',
        type: 'Poké Ball',
        price: 100000,
        isAvailable: true,
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'
    }
]

const statsData = [
    { id: 1, nameKey: 'products_stats_total', value: 120 },
    { id: 2, nameKey: 'products_stats_active', value: 98 },
    { id: 3, nameKey: 'products_stats_revenue', value: '12 450', unit: '€' },
    { id: 4, nameKey: 'products_stats_outOfStock', value: 3 },
]

export default function ProductsPage() {
    return (
        <Layout>
            <Heading title={"products"} />
            <ProductsStats stats={statsData} />
            <ProductsList Products={pokemonProducts} />
        </Layout>
    );
}