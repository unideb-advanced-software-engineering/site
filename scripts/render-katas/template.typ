#set page(
  paper: "a4",
  margin: (x: 15mm, y: 14mm),
)

#set text(lang: "hu", font: "Noto Sans", size: 11.5pt, fill: rgb("#1f2a1c"))
#set par(justify: false, leading: 0.8em)
#set heading(numbering: none)

#let ink = rgb("#1f2a1c")
#let accent = rgb("#1b5946")
#let accent-soft = rgb("#ccdbd5")
#let rule = rgb("#bdc4bb")
#let text-soft = rgb("#4f5c4d")

#let bullet-list(items) = [
  #for item in items [
    #set text(size: 10.8pt, fill: ink)
    #text(fill: accent, weight: "bold")[•]
    #h(5pt)
    #item
    #v(6pt)
  ]
]

#let section(title, items) = {
  if items != () {
    [
      #text(weight: "bold", size: 11pt, fill: accent)[#title]
      #line(length: 100%, stroke: (paint: accent-soft, thickness: 0.8pt))
      #v(5pt)
      #bullet-list(items)
    ]
  }
}

#let optional-section(title, items) = {
  if items != none {
    [
      #text(weight: "bold", size: 11pt, fill: accent)[#title]
      #line(length: 100%, stroke: (paint: accent-soft, thickness: 0.8pt))
      #v(5pt)
      #bullet-list(items)
    ]
  }
}

#let katas = (
{{KATAS}})

#for kata in katas [
  #if kata.id != 1 [#pagebreak(weak: true)]
  #text(size: 22pt, weight: "bold", fill: ink)[#kata.title]
  #line(length: 100%, stroke: (paint: accent-soft, thickness: 1pt))
  #v(9pt)
  #text(size: 11.2pt, fill: text-soft)[#kata.description]
  #v(10pt)
  #section([Felhasználók], kata.users)
  #v(10pt)
  #section([Követelmények], kata.requirements)
  #v(10pt)
  #section([Kiegészítő kontextus], kata.additional_context)
]
