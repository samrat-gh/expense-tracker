import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <SignIn
        routing="path"
        path="/sign-in"
        appearance={{
          elements: {
            logo: "hidden",
            footer: "hidden",
            cardFooter: "hidden",
          },
        }}
      />
    </div>
  );
}
