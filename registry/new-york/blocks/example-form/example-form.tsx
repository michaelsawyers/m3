"use client";

import * as React from "react";
import {
  AkCard,
  AkCardTitle,
  AkCardHeader,
  AkCardDescription,
  AkCardContent,
  AkCardFooter,
} from "@/registry/unity/ui/ak-card";
import { AkTextInput } from "@/registry/unity/ui/ak-text-input";
import { Label } from "@/registry/new-york/ui/label";
import { AkButton } from "@/registry/unity/ui/ak-button";
import { AkTextarea } from "@/registry/unity/ui/ak-textarea";
import { z } from "zod";

const exampleFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export function ExampleForm() {
  const [pending, setPending] = React.useState(false);
  const [state, setState] = React.useState({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    success: false,
    errors: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPending(true);

      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      const result = exampleFormSchema.safeParse(data);

      if (!result.success) {
        setState({
          ...state,
          errors: Object.fromEntries(
            Object.entries(result.error.flatten().fieldErrors).map(
              ([key, value]) => [key, value?.[0] ?? ""]
            )
          ) as Record<keyof typeof state.errors, string>,
        });
        setPending(false);
        return;
      }

      setPending(false);
    },
    [state]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <AkCard>
        <AkCardHeader>
          <AkCardTitle>How can we help?</AkCardTitle>
          <AkCardDescription>
            Need help with your project? We&apos;re here to assist you.
          </AkCardDescription>
        </AkCardHeader>
        <AkCardContent className="flex flex-col gap-6">
          <div
            className="group/field grid gap-2"
            data-invalid={!!state.errors?.name}
          >
            <Label
              htmlFor="name"
              className="group-data-[invalid=true]/field:text-destructive"
            >
              Name <span aria-hidden="true">*</span>
            </Label>
            <AkTextInput
              id="name"
              name="name"
              placeholder="Lee Robinson"
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.name}
              aria-errormessage="error-name"
              defaultValue={state.defaultValues.name}
            />
            {state.errors?.name && (
              <p id="error-name" className="text-destructive text-sm">
                {state.errors.name}
              </p>
            )}
          </div>
          <div
            className="group/field grid gap-2"
            data-invalid={!!state.errors?.email}
          >
            <Label
              htmlFor="email"
              className="group-data-[invalid=true]/field:text-destructive"
            >
              Email <span aria-hidden="true">*</span>
            </Label>
            <AkTextInput
              id="email"
              name="email"
              placeholder="leerob@acme.com"
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.email}
              aria-errormessage="error-email"
              defaultValue={state.defaultValues.email}
            />
            {state.errors?.email && (
              <p id="error-email" className="text-destructive text-sm">
                {state.errors.email}
              </p>
            )}
          </div>
          <div
            className="group/field grid gap-2"
            data-invalid={!!state.errors?.message}
          >
            <Label
              htmlFor="message"
              className="group-data-[invalid=true]/field:text-destructive"
            >
              Message <span aria-hidden="true">*</span>
            </Label>
            <AkTextarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.message}
              aria-errormessage="error-message"
              defaultValue={state.defaultValues.message}
            />
            {state.errors?.message && (
              <p id="error-message" className="text-destructive text-sm">
                {state.errors.message}
              </p>
            )}
          </div>
        </AkCardContent>
        <AkCardFooter>
          <AkButton type="submit" size="sm" disabled={pending}>
            {pending ? "Sending..." : "Send Message"}
          </AkButton>
        </AkCardFooter>
      </AkCard>
    </form>
  );
}
