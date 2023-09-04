"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  //   console.log(providers);
  return (
    <section>
      {Object.values(providers).map(({ id, name }) => (
        <button
          key={id}
          onClick={() => signIn(id, { callbackUrl })}
        >{`Sign in with ${name}`}</button>
      ))}
    </section>
  );
}
