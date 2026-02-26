/**
 * Node modules
 */
import { supabase } from "@/lib/supabase/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useHead } from "@unhead/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

/**
 * Components
 */

import Logo from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

/**
 * Icons
 */
import { LoaderIcon } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email("Email non valida").min(1, "Email è obbligatoria"),
  password: z
    .string()
    .min(1, "Password è obbligatoria")
    .min(8, "La password deve essere lunga almeno 8 caratteri"),
});

export const Route = createFileRoute("/_public/login")({
  validateSearch: (search): { redirect?: string } => ({
    redirect: (search.redirect as string) ?? undefined,
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || "/app/today" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
 useHead({
    title: "Login",
  });

  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setServerError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setServerError(
        error.message === "Invalid login credentials"
          ? "Email o password non corretti."
          : "Si è verificato un errore. Riprova.",
      );
      return;
    }

    navigate({ to: redirect ?? "/app/today" });
  };

  return (
    <div className="flex w-full justify-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        aria-label="Login to your account"
        className="flex w-[min(95vw,30em)] flex-col items-center gap-6 rounded-md border border-border p-6"
        style={{
          background:
            "linear-gradient(hsl(var(--background)), hsl(var(--background)) 60%, hsl(var(--primary) / 0.25))",
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                type="password"
                placeholder="••••••••"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="flex w-1/2 justify-center gap-2"
          disabled={form.formState.isSubmitting}
        >
          Login
          {form.formState.isSubmitting && <LoaderIcon className="animate-spin" />}
        </Button>

        <p className="text-center text-sm">
          Don't have an account yet?
          <Link to="/register" className="ml-1 text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
