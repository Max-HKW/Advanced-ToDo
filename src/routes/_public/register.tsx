/**
 * Node modules
 */
import { supabase } from '@/lib/supabase/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useHead } from '@unhead/react';

/**
 * Components
 */
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo/Logo';

/**
 * Icons
 */
import { LoaderIcon } from 'lucide-react';

const registerSchema = z
  .object({
    email: z.string().email('Email non valida').min(1, 'Email è obbligatoria'),
    password: z
      .string()
      .min(1, 'Password è obbligatoria')
      .min(8, 'La password deve essere lunga almeno 8 caratteri')
      .regex(/[A-Z]/, 'Deve contenere almeno una lettera maiuscola')
      .regex(/[0-9]/, 'Deve contenere almeno un numero'),
    confirmPassword: z.string().min(1, 'Conferma la password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Le password non corrispondono',
    path: ['confirmPassword'],
  });

export const Route = createFileRoute('/_public/register')({
  component: RegisterPage,
});

function RegisterPage() {
   useHead({
    title: "Signup",
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setServerError(null);

    const { error, data } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      if (error.message.toLowerCase().includes('already registered')) {
        setServerError(
          'Esiste già un account con questa email. Prova ad accedere.'
        );
      } else {
        setServerError(
          'Si è verificato un errore durante la registrazione. Riprova.'
        );
      }
      return;
    }

    if (data.user && data.user.identities?.length === 0) {
      setServerError('Esiste già un account con questa email.');
      return;
    }

    setRegisteredEmail(values.email);
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="flex w-full justify-center">
        <div
          className="flex w-[min(95vw,30em)] flex-col items-center gap-5 rounded-md border border-border px-6 py-8 text-center"
          style={{
            background:
              'linear-gradient(hsl(var(--background)), hsl(var(--background)) 60%, hsl(var(--primary) / 0.25))',
          }}
        >
          <div
            className="text-[2.5rem] leading-none"
            aria-hidden="true"
          >
            📬
          </div>
          <h1 className="m-0 text-xl font-semibold text-foreground">
            Controlla la tua email
          </h1>
          <p className="m-0 text-sm leading-relaxed text-muted-foreground">
            Abbiamo inviato un link di conferma a{' '}
            <strong className="text-foreground">{registeredEmail}</strong>.
            <br />
            Clicca il link nell'email per attivare il tuo account.
          </p>
          <p className="m-0 text-[0.8rem] text-muted-foreground/70">
            Non trovi l'email? Controlla nella cartella spam.
          </p>
          <Link
            to="/login"
            className="text-sm text-primary hover:underline"
          >
            ← Torna al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        aria-label="Register a new account"
        className="flex w-[min(95vw,30em)] flex-col items-center gap-6 rounded-md border border-border p-6"
        style={{
          background:
            'linear-gradient(hsl(var(--background)), hsl(var(--background)) 60%, hsl(var(--primary) / 0.25))',
        }}
      >
        <Logo aria-hidden="true" />

        {serverError && (
          <div
            role="alert"
            className="flex items-center gap-2 text-sm text-destructive"
          >
            <span>⚠</span>
            {serverError}
          </div>
        )}

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid || undefined}
              className="w-1/2"
            >
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="john.doe@gmail.com"
                autoComplete="email"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid || undefined}
              className="w-1/2"
            >
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
              type='password'
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid || undefined}
              className="w-1/2"
            >
              <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
              <Input
              type='password'
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="flex w-1/2 justify-center gap-2"
          disabled={form.formState.isSubmitting}
        >
          Signup
          {form.formState.isSubmitting && <LoaderIcon className="animate-spin" />}
        </Button>

        <p className="text-center text-sm">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}