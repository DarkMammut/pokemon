import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Définissez vos traductions
const resources = {
    fr: {
        translation: {
            welcome: "Bienvenue",
            Home: "Accueil",

            products: "Produits",
            products_stats_total: "Total",
            products_stats_active: "Produits actifs",
            products_stats_revenue: "Revenu total",
            products_stats_outOfStock: "Produits en rupture de stock",
            products_list_title: "Liste des produits",

            product: "Produit",
            product_name: "Nom du produit",
            product_type: "Type",
            product_price: "Prix",
            product_url: "URL",
            product_availability: "Disponibilité",

            product_form_title: "Formulaire de produit",
            product_form_description: "Veuillez remplir les informations du produit ci-dessous.",

            in_stock: "En stock",
            out_of_stock: "Rupture de stock",

            save: "Enregistrer",
            cancel: "Annuler"
        }
    },
    en: {
        translation: {
            welcome: "Welcome",
            Home: "Home",

            products: "Products",
            products_stats_total: "Total",
            products_stats_active: "Active Products",
            products_stats_revenue: "Total Revenue",
            products_stats_outOfStock: "Out of Stock Products",
            products_list_title: "Product List",

            product: "Product",
            product_name: "Product Name",
            product_type: "Type",
            product_price: "Price",
            product_url: "URL",
            product_availability: "Availability",

            product_form_title: "Product Form",
            product_form_description: "Please fill in the product information below.",

            in_stock: "In stock",
            out_of_stock: "Out of stock",

            save: "Save",
            cancel: "Cancel"
        }
    }
};

if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: 'fr',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });
}

export default i18n;