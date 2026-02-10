"use client"

import { useState } from "react"
import { Check, ChevronRight, ChevronLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const themes = [
  { value: "culte", label: "Lieux de culte", icon: "🕌" },
  { value: "education", label: "Éducation", icon: "📚" },
  { value: "carres", label: "Carrés confessionnels", icon: "🌿" },
  { value: "jeunesse", label: "Jeunesse", icon: "🤝" },
  { value: "islamophobie", label: "Lutte contre l'islamophobie", icon: "🛡️" },
  { value: "commerce", label: "Commerce local", icon: "🏪" },
]

const quartiers = [
  "Mosson",
  "Paillade",
  "Centre",
  "Port Marianne",
  "Aiguelongue",
  "Les Cévennes",
  "Hôpitaux-Facultés",
  "Antigone",
  "Figuerolles",
  "Croix d'Argent",
]

const steps = [
  { label: "Thématique", short: "Thème" },
  { label: "Description", short: "Détail" },
  { label: "Localisation", short: "Lieu" },
  { label: "Validation", short: "Envoi" },
]

export function ProposalForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    theme: "",
    title: "",
    description: "",
    quartier: "",
    email: "",
    anonymous: true,
  })

  function next() {
    if (step < 3) setStep(step + 1)
  }
  function prev() {
    if (step > 0) setStep(step - 1)
  }

  function canNext() {
    if (step === 0) return form.theme !== ""
    if (step === 1) return form.title.trim() !== "" && form.description.trim() !== ""
    if (step === 2) return form.quartier !== ""
    return true
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="deposer" className="bg-secondary px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Merci pour votre contribution !</h2>
          <p className="mt-2 text-muted-foreground">
            Votre proposition a bien été enregistrée et sera visible dans le flux communautaire.
          </p>
          <Button
            className="mt-6"
            onClick={() => {
              setSubmitted(false)
              setStep(0)
              setForm({
                theme: "",
                title: "",
                description: "",
                quartier: "",
                email: "",
                anonymous: true,
              })
            }}
          >
            Soumettre une autre idée
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section id="deposer" className="bg-secondary px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Déposer une proposition
          </h2>
          <p className="mt-2 text-muted-foreground">
            Partagez votre idée en quelques étapes simples.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      i < step
                        ? "bg-primary text-primary-foreground"
                        : i === step
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-border text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className="mt-1.5 text-xs font-medium text-muted-foreground hidden sm:block">
                    {s.label}
                  </span>
                  <span className="mt-1.5 text-xs font-medium text-muted-foreground sm:hidden">
                    {s.short}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 rounded ${
                      i < step ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          {/* Step 0 - Theme */}
          {step === 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-card-foreground">
                Choisissez une thématique
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {themes.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setForm({ ...form, theme: t.value })}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-colors ${
                      form.theme === t.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <span className="text-sm font-medium text-card-foreground">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 - Title & Description */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-semibold text-card-foreground">
                Décrivez votre proposition
              </h3>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Titre de la proposition</Label>
                <Input
                  id="title"
                  placeholder="Ex: Création d'un espace culturel..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  rows={5}
                  placeholder="Expliquez votre idée en détail : contexte, objectifs, bénéfices attendus..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 2 - Location */}
          {step === 2 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-card-foreground">
                Quartier concerné
              </h3>
              <RadioGroup
                value={form.quartier}
                onValueChange={(v) => setForm({ ...form, quartier: v })}
                className="grid grid-cols-2 gap-3"
              >
                {quartiers.map((q) => (
                  <Label
                    key={q}
                    htmlFor={`q-${q}`}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-colors ${
                      form.quartier === q
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <RadioGroupItem value={q} id={`q-${q}`} />
                    <span className="text-sm font-medium text-card-foreground">{q}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 3 - Validation */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-semibold text-card-foreground">Validation</h3>
              <div className="flex flex-col gap-3">
                <Label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="validation"
                    checked={form.anonymous}
                    onChange={() => setForm({ ...form, anonymous: true, email: "" })}
                    className="accent-[hsl(var(--primary))]"
                  />
                  <span className="text-sm text-card-foreground">Soumettre anonymement</span>
                </Label>
                <Label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="validation"
                    checked={!form.anonymous}
                    onChange={() => setForm({ ...form, anonymous: false })}
                    className="accent-[hsl(var(--primary))]"
                  />
                  <span className="text-sm text-card-foreground">Soumettre avec mon email</span>
                </Label>
              </div>
              {!form.anonymous && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              )}
              <div className="rounded-lg border border-border bg-secondary p-4">
                <h4 className="mb-2 text-sm font-semibold text-card-foreground">Récapitulatif</h4>
                <dl className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex gap-2">
                    <dt className="font-medium text-foreground">Thème :</dt>
                    <dd>{themes.find((t) => t.value === form.theme)?.label}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-foreground">Titre :</dt>
                    <dd>{form.title}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-foreground">Quartier :</dt>
                    <dd>{form.quartier}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={prev} disabled={step === 0} className="gap-1.5 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>
            {step < 3 ? (
              <Button onClick={next} disabled={!canNext()} className="gap-1.5">
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-1.5">
                <Send className="h-4 w-4" />
                Soumettre
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
