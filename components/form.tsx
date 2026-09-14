'use client';

import React, {
    useState,
    useSyncExternalStore,
} from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

import { ChevronDownIcon } from '@heroicons/react/16/solid';

const emptySubscribe = () => () => {};

function useIsMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
}

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type FormFieldType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file';

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 'full';

export interface FormOption {
    value: string;
    label: string;
}

export interface FormField {
    name: string;
    type: FormFieldType;

    /**
     * Clé de traduction.
     * Exemple : "profile.firstName"
     */
    label: string;

    /**
     * Clé de traduction facultative.
     */
    placeholder?: string;

    /**
     * Clé de traduction facultative.
     */
    description?: string;

    /**
     * Clé de traduction facultative pour un message d'erreur.
     */
    error?: string;

    /**
     * Valeur initiale du champ.
     */
    defaultValue?: string | boolean;

    /**
     * Permet de définir la largeur du champ
     * sur une grille de 6 colonnes.
     */
    colSpan?: ColSpan;

    /**
     * Pour les select.
     */
    options?: FormOption[];

    /**
     * Pour textarea.
     */
    rows?: number;

    /**
     * Pour les inputs.
     */
    autoComplete?: string;
    required?: boolean;
    disabled?: boolean;
    accept?: string;

    /**
     * Pour afficher un préfixe avant l'input.
     * Exemple : "https://"
     */
    prefix?: string;

    /**
     * Pour checkbox/radio.
     */
    value?: string;
}

export interface FormSection {
    title?: string;
    description?: string;
    fields: FormField[];
}

export interface FormProps {
    title?: string;
    description?: string;

    /**
     * Permet de définir plusieurs sections.
     */
    sections?: FormSection[];

    /**
     * Alternative simple à sections.
     */
    fields?: FormField[];

    /**
     * Valeurs initiales du formulaire.
     */
    defaultValues?: Record<string, string | boolean>;

    /**
     * Appelé lors de la soumission.
     */
    onSubmit?: (
        values: Record<string, string | boolean>
    ) => void | Promise<void>;

    /**
     * Texte du bouton submit.
     * Clé de traduction.
     */
    submitLabel?: string;

    /**
     * Texte du bouton annuler.
     * Clé de traduction.
     */
    cancelLabel?: string;

    /**
     * Afficher le bouton annuler.
     */
    showCancel?: boolean;

    /**
     * Action du bouton annuler.
     */
    onCancel?: () => void;

    /**
     * Désactive le formulaire.
     */
    disabled?: boolean;

    /**
     * Classes supplémentaires.
     */
    className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

function getColSpanClass(colSpan?: ColSpan) {
    switch (colSpan) {
        case 1:
            return 'sm:col-span-1';

        case 2:
            return 'sm:col-span-2';

        case 3:
            return 'sm:col-span-3';

        case 4:
            return 'sm:col-span-4';

        case 5:
            return 'sm:col-span-5';

        case 6:
            return 'sm:col-span-6';

        case 'full':
            return 'col-span-full';

        default:
            return 'col-span-full';
    }
}

/* -------------------------------------------------------------------------- */
/*                               FIELD COMPONENT                              */
/* -------------------------------------------------------------------------- */

interface FieldProps {
    field: FormField;
    value: string | boolean | undefined;
    error?: string;
    disabled?: boolean;
    onChange: (
        name: string,
        value: string | boolean
    ) => void;
}

function FormFieldComponent({
                                field,
                                value,
                                error,
                                disabled,
                                onChange,
                            }: FieldProps) {
    const { t } = useTranslation();

    const isDisabled = disabled || field.disabled;

    const label = t(field.label);

    const description = field.description
        ? t(field.description)
        : undefined;

    const placeholder = field.placeholder
        ? t(field.placeholder)
        : undefined;

    const errorMessage = error || field.error
        ? t(error || field.error!)
        : undefined;

    const baseInputClass = `
        block
        w-full
        rounded-md
        border
        border-border
        bg-card
        px-3
        py-2
        text-sm
        text-foreground
        placeholder:text-muted
        outline-none
        transition
        focus:border-primary
        focus:ring-2
        focus:ring-primary
        disabled:cursor-not-allowed
        disabled:bg-background
        disabled:opacity-60
    `;

    /* ---------------------------------------------------------------------- */
    /*                                  RADIO                                 */
    /* ---------------------------------------------------------------------- */

    if (field.type === 'radio') {
        return (
            <div className="flex items-start gap-3">
                <input
                    id={field.name}
                    name={field.name}
                    type="radio"
                    value={field.value}
                    checked={value === field.value}
                    disabled={isDisabled}
                    onChange={() =>
                        onChange(field.name, field.value ?? '')
                    }
                    className="
                        mt-1
                        size-4
                        appearance-none
                        rounded-full
                        border
                        border-border
                        bg-card
                        checked:border-primary
                        checked:bg-primary
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary
                        disabled:opacity-60
                    "
                />

                <div>
                    <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-foreground"
                    >
                        {label}
                    </label>

                    {description && (
                        <p className="mt-1 text-sm text-muted">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    /* ---------------------------------------------------------------------- */
    /*                                CHECKBOX                                 */
    /* ---------------------------------------------------------------------- */

    if (field.type === 'checkbox') {
        return (
            <div className="flex items-start gap-3">
                <input
                    id={field.name}
                    name={field.name}
                    type="checkbox"
                    checked={Boolean(value)}
                    disabled={isDisabled}
                    onChange={(event) =>
                        onChange(field.name, event.target.checked)
                    }
                    className="
                        mt-1
                        size-4
                        appearance-none
                        rounded
                        border
                        border-border
                        bg-card
                        checked:border-primary
                        checked:bg-primary
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary
                        disabled:opacity-60
                    "
                />

                <div>
                    <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-foreground"
                    >
                        {label}
                    </label>

                    {description && (
                        <p className="mt-1 text-sm text-muted">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    /* ---------------------------------------------------------------------- */
    /*                                   FILE                                 */
    /* ---------------------------------------------------------------------- */

    if (field.type === 'file') {
        return (
            <div>
                <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-foreground"
                >
                    {label}
                </label>

                <div className="mt-2">
                    <input
                        id={field.name}
                        name={field.name}
                        type="file"
                        accept={field.accept}
                        disabled={isDisabled}
                        onChange={(event) => {
                            const file = event.target.files?.[0];

                            onChange(
                                field.name,
                                file ? file.name : ''
                            );
                        }}
                        className="
                            block
                            w-full
                            cursor-pointer
                            rounded-md
                            border
                            border-border
                            bg-card
                            text-sm
                            text-foreground
                            file:mr-4
                            file:border-0
                            file:bg-primary
                            file:px-4
                            file:py-2
                            file:font-medium
                            file:text-primary-foreground
                            hover:file:opacity-90
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    />
                </div>

                {description && (
                    <p className="mt-2 text-sm text-muted">
                        {description}
                    </p>
                )}

                {errorMessage && (
                    <p className="mt-2 text-sm text-accent">
                        {errorMessage}
                    </p>
                )}
            </div>
        );
    }

    /* ---------------------------------------------------------------------- */
    /*                                  SELECT                                */
    /* ---------------------------------------------------------------------- */

    if (field.type === 'select') {
        return (
            <div>
                <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-foreground"
                >
                    {label}
                </label>

                <div className="relative mt-2">
                    <select
                        id={field.name}
                        name={field.name}
                        value={String(value ?? '')}
                        disabled={isDisabled}
                        required={field.required}
                        autoComplete={field.autoComplete}
                        onChange={(event) =>
                            onChange(
                                field.name,
                                event.target.value
                            )
                        }
                        className={`
                            ${baseInputClass}
                            appearance-none
                            pr-10
                        `}
                    >
                        <option value="">
                            {placeholder ?? ''}
                        </option>

                        {field.options?.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {t(option.label)}
                            </option>
                        ))}
                    </select>

                    <ChevronDownIcon
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            right-3
                            top-1/2
                            size-4
                            -translate-y-1/2
                            text-muted
                        "
                    />
                </div>

                {description && (
                    <p className="mt-2 text-sm text-muted">
                        {description}
                    </p>
                )}

                {errorMessage && (
                    <p className="mt-2 text-sm text-accent">
                        {errorMessage}
                    </p>
                )}
            </div>
        );
    }

    /* ---------------------------------------------------------------------- */
    /*                                 TEXTAREA                               */
    /* ---------------------------------------------------------------------- */

    if (field.type === 'textarea') {
        return (
            <div>
                <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-foreground"
                >
                    {label}
                </label>

                <div className="mt-2">
                    <textarea
                        id={field.name}
                        name={field.name}
                        rows={field.rows ?? 4}
                        value={String(value ?? '')}
                        disabled={isDisabled}
                        required={field.required}
                        placeholder={placeholder}
                        onChange={(event) =>
                            onChange(
                                field.name,
                                event.target.value
                            )
                        }
                        className={baseInputClass}
                    />
                </div>

                {description && (
                    <p className="mt-2 text-sm text-muted">
                        {description}
                    </p>
                )}

                {errorMessage && (
                    <p className="mt-2 text-sm text-accent">
                        {errorMessage}
                    </p>
                )}
            </div>
        );
    }

    /* ---------------------------------------------------------------------- */
    /*                                   INPUT                                */
    /* ---------------------------------------------------------------------- */

    return (
        <div>
            <label
                htmlFor={field.name}
                className="block text-sm font-medium text-foreground"
            >
                {label}
            </label>

            <div
                className={`
                    mt-2
                    flex
                    overflow-hidden
                    rounded-md
                    border
                    border-border
                    bg-card
                    transition
                    focus-within:border-primary
                    focus-within:ring-2
                    focus-within:ring-primary
                `}
            >
                {field.prefix && (
                    <span
                        className="
                            flex
                            items-center
                            border-r
                            border-border
                            bg-background
                            px-3
                            text-sm
                            text-muted
                        "
                    >
                        {field.prefix}
                    </span>
                )}

                <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={String(value ?? '')}
                    disabled={isDisabled}
                    required={field.required}
                    placeholder={placeholder}
                    autoComplete={field.autoComplete}
                    onChange={(event) =>
                        onChange(
                            field.name,
                            event.target.value
                        )
                    }
                    className="
                        block
                        min-w-0
                        w-full
                        border-0
                        bg-transparent
                        px-3
                        py-2
                        text-sm
                        text-foreground
                        placeholder:text-muted
                        outline-none
                    "
                />
            </div>

            {description && (
                <p className="mt-2 text-sm text-muted">
                    {description}
                </p>
            )}

            {errorMessage && (
                <p className="mt-2 text-sm text-accent">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   FORM                                     */
/* -------------------------------------------------------------------------- */

export default function Form({
                                 title,
                                 description,
                                 sections,
                                 fields,
                                 defaultValues = {},
                                 onSubmit,
                                 submitLabel = 'common.save',
                                 cancelLabel = 'common.cancel',
                                 showCancel = true,
                                 onCancel,
                                 disabled = false,
                                 className = '',
                             }: FormProps) {
    const { t } = useTranslation();
    const isMounted = useIsMounted();

    const [values, setValues] = useState<
        Record<string, string | boolean>
    >(defaultValues);

    if (!isMounted) {
        return null;
    }


    const handleChange = (
        name: string,
        value: string | boolean
    ) => {
        setValues((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        await onSubmit?.(values);
    };

    const normalizedSections: FormSection[] =
        sections ??
        (fields
            ? [
                {
                    fields,
                },
            ]
            : []);

    return (
        <form
            onSubmit={handleSubmit}
            className={`
                w-full
                ${className}
            `}
        >
            <div className="space-y-12">

                {/* ---------------------------------------------------------------- */}
                {/*                              HEADER                              */}
                {/* ---------------------------------------------------------------- */}

                {(title || description) && (
                    <div className="border-b border-border pb-6">
                        {title && (
                            <h2 className="text-lg font-semibold text-foreground">
                                {t(title)}
                            </h2>
                        )}

                        {description && (
                            <p className="mt-1 text-sm text-muted">
                                {t(description)}
                            </p>
                        )}
                    </div>
                )}

                {/* ---------------------------------------------------------------- */}
                {/*                             SECTIONS                             */}
                {/* ---------------------------------------------------------------- */}

                {normalizedSections.map((section, sectionIndex) => (
                    <section
                        key={`${section.title ?? 'section'}-${sectionIndex}`}
                        className="border-b border-border pb-12"
                    >
                        {(section.title || section.description) && (
                            <div>
                                {section.title && (
                                    <h2 className="text-base font-semibold text-foreground">
                                        {t(section.title)}
                                    </h2>
                                )}

                                {section.description && (
                                    <p className="mt-1 text-sm text-muted">
                                        {t(section.description)}
                                    </p>
                                )}
                            </div>
                        )}

                        <div
                            className="
                                mt-8
                                grid
                                grid-cols-1
                                gap-x-6
                                gap-y-8
                                sm:grid-cols-6
                            "
                        >
                            {section.fields.map((field) => (
                                <div
                                    key={field.name}
                                    className={getColSpanClass(
                                        field.colSpan
                                    )}
                                >
                                    <FormFieldComponent
                                        field={field}
                                        value={values[field.name]}
                                        disabled={disabled}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* ------------------------------------------------------------------ */}
            {/*                              ACTIONS                               */}
            {/* ------------------------------------------------------------------ */}

            <div
                className="
                    mt-6
                    flex
                    items-center
                    justify-end
                    gap-3
                "
            >
                {showCancel && (
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={onCancel}
                        className="
                            rounded-md
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-muted
                            transition
                            hover:bg-background
                            hover:text-foreground
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {t(cancelLabel)}
                    </button>
                )}

                <button
                    type="submit"
                    disabled={disabled}
                    className="
                        rounded-md
                        bg-primary
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-primary-foreground
                        transition
                        hover:opacity-90
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {t(submitLabel)}
                </button>
            </div>
        </form>
    );
}