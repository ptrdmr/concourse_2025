"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { contactFaqCategories } from "@/lib/contact-faq-data"

function FaqAccordion({ categoryId }: { categoryId: string }) {
  const category = contactFaqCategories.find((c) => c.id === categoryId)
  if (!category) return null

  return (
    <Accordion type="single" collapsible className="w-full">
      {category.items.map((item, index) => (
        <AccordionItem value={`${categoryId}-${index}`} key={`${categoryId}-${index}`}>
          <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <div className="space-y-3 text-sm leading-relaxed md:text-base">
              {item.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {item.listItems?.length ? (
                <div>
                  {item.listTitle ? <p className="mb-2 font-medium text-foreground">{item.listTitle}</p> : null}
                  <ul className="list-disc space-y-1 pl-5">
                    {item.listItems.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function ContactFaqSection() {
  const defaultTab = contactFaqCategories[0]?.id ?? "general"

  return (
    <section className="rounded-lg bg-muted p-6 md:p-8" aria-labelledby="contact-faq-heading">
      <h2 id="contact-faq-heading" className="mb-2 text-center text-2xl font-bold md:text-3xl">
        Frequently Asked Questions
      </h2>
      <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
        Browse by topic. Details match our walk-in, party, and bar information—expand any question to read more.
      </p>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList
          className="mb-6 grid h-auto w-full grid-cols-2 gap-1 rounded-lg bg-background/60 p-1 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
          aria-label="FAQ categories"
        >
          {contactFaqCategories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="min-h-[2.75rem] whitespace-normal px-2 py-2 text-center text-xs leading-tight data-[state=active]:shadow-sm sm:text-sm"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {contactFaqCategories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="mt-0 rounded-md border bg-background/40 p-4 shadow-sm md:p-6">
            <p className="mb-4 text-sm text-muted-foreground md:text-base">{cat.description}</p>
            <FaqAccordion categoryId={cat.id} />
          </TabsContent>
        ))}
      </Tabs>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Policies and hours can change. For the latest wording, see the official{" "}
        <a
          href="https://www.concoursebowling.com/walkfaqs"
          className="font-medium text-primary underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          walk-in
        </a>
        ,{" "}
        <a
          href="https://www.concoursebowling.com/resfaqs"
          className="font-medium text-primary underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          reservation
        </a>
        , and{" "}
        <a
          href="https://www.concoursebowling.com/bar-faq"
          className="font-medium text-primary underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          bar FAQ
        </a>{" "}
        pages.
      </p>
    </section>
  )
}
