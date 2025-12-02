import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h1>
          <p className="mb-8">
            Desculpe, a página que você está procurando não existe.
          </p>
          <Button asChild className="not-prose mt-6">
            <Link href="/">Voltar para Home</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
