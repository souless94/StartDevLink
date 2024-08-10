'use client'
import { AppNavBar } from "./_components/AppNavBar";
import { HomePage } from "./_components/HomePage";
import * as Sentry from "@sentry/nextjs";

export default function Home() {

  return (
    <div>
      <AppNavBar />
      <HomePage />
      <button
          type="button"
          style={{
            padding: "12px",
            cursor: "pointer",
            backgroundColor: "#AD6CAA",
            borderRadius: "4px",
            border: "none",
            color: "white",
            fontSize: "14px",
            margin: "18px",
          }}
          onClick={async () => {
            await Sentry.startSpan({
              name: 'Example Frontend Span',
              op: 'test'
            }, async () => {
              const res = await fetch("/api/sentry-example-api");
              if (!res.ok) {
                throw new Error("Sentry Example Frontend Error");
              }
            });
          }}
        >
          Throw error!
        </button>

        <p>
          Next, look for the error on the{" "}
          <a href="https://souless.sentry.io/issues/?project=4507751964344320">Issues Page</a>.
        </p>
        <p style={{ marginTop: "24px" }}>
          For more information, see{" "}
          <a href="https://docs.sentry.io/platforms/javascript/guides/nextjs/">
            https://docs.sentry.io/platforms/javascript/guides/nextjs/
          </a>
        </p>
    </div>
  );
}
