#!/usr/bin/env python3
"""Replace GE/GS 2021 (was duplicate of 2022) and add GE/GS 2026 into gen_papers JSON."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Q_PATH = ROOT / "src/data/gen_papers_questions.json"
E_PATH = ROOT / "src/data/gen_papers_explanations.json"


def Q(paper, section, year, number, topic, text, marks):
    return {
        "paper": paper,
        "section": section,
        "year": year,
        "number": number,
        "topic": topic,
        "context": None,
        "text": text,
        "table": None,
        "options": [],
        "marks": marks,
        "instructions": None,
    }


PRECIS_2021 = """Let us begin with the question: what is science? Karl Popper, an influential twentieth-century philosopher of science, thought that the fundamental feature of a scientific theory is that it should be falsifiable. To call a theory falsifiable is not to say that it is false. Rather, it means that the theory makes some definite predictions that are capable of being tested against experience. If these predictions turn out to be wrong, then the theory has been falsified, or disproved. So a falsifiable theory is one that we might discover to be false — it is not compatible with every possible course of experience. Popper thought that some supposedly scientific theories did not satisfy this condition and thus did not deserve to be called science at all; rather they were merely pseudo-science.

Freud's psychoanalytic theory was one of Popper's favourite examples of pseudo-science. According to Popper, Freud's theory could be reconciled with any empirical findings whatsoever. Whatever a patient's behaviour, Freudians could find an explanation of it in terms of their theory — they would never admit that their theory was wrong. Popper illustrated his point with the following example. Imagine a man who pushes a child into a river with the intention of murdering him, and another man who sacrifices his life in order to save the child. Freudians can explain both men's behaviour with equal ease: the first was repressed, and the second had achieved sublimation. Popper argued that through the use of such concepts as repression, sublimation, and unconscious desires, Freud's theory could be rendered compatible with any clinical data whatever; it was thus unfalsifiable.

The same was true of Marx's theory of history, Popper maintained. Marx claimed that in industrialized societies around the world, capitalism would give way to socialism and ultimately to communism. But when this didn't happen, instead of admitting that Marx's theory was wrong, Marxists would invent an ad hoc explanation for why what happened was actually perfectly consistent with their theory. For example, they might say that the inevitable progress to communism had been temporarily slowed by the rise of the welfare state, which 'softened' the proletariat and weakened their revolutionary zeal. In this sort of way, Marx's theory could be made compatible with any possible course of events, just like Freud's. Therefore, neither theory qualifies as genuinely scientific, according to Popper's criterion.

Popper contrasted Freud's and Marx's theories with Einstein's theory of gravitation, also known as general relativity. Unlike Freud's and Marx's theories, Einstein's theory made a very definite prediction: that light rays from distant stars would be deflected by the gravitational field of the sun. Normally this effect would be impossible to observe — except during a solar eclipse. In 1919, the English astrophysicist Sir Arthur Eddington organized two expeditions to observe the solar eclipse of that year, one to Brazil and one to the island of Principe off the Atlantic coast of Africa, with the aim of testing Einstein's prediction. The expeditions found that starlight was indeed deflected by the sun, by almost exactly the amount Einstein had predicted. Popper was very impressed by this. Einstein's theory had made a definite, precise prediction, which was confirmed by observations. Had it turned out that starlight was not deflected by the sun, this would have showed that Einstein was wrong. So Einstein's theory satisfies the criterion of falsifiability.

Popper's attempt to demarcate science from pseudo-science is intuitively quite plausible. There is certainly something fishy about a theory that can be made to fit any empirical data whatsoever. But some philosophers regard Popper's criterion as overly simplistic. Popper criticized Freudians and Marxists for explaining away any data that appeared to conflict with their theories, rather than accepting that the theories had been refuted. This certainly looks like a suspicious procedure. However, there is some evidence that this very procedure is routinely used by 'respectable' scientists — whom Popper would not want to accuse of engaging in pseudo-science — and has led to important scientific discoveries.

(659 words)"""

PRECIS_2026 = """The total record of human evolution suggests that from his beginnings, man has sought to free himself from the restrictions and limitations of his habitat. This is the mainspring of cultural evolution, most of which has occurred during less than one percent of human history. However, it must be borne in mind that although people may welcome technological innovations that provide them with increasing mastery over their habitat, they tend to resist the necessary accompanying changes in their organization of social relations. It is in the social sphere that people tend to exhibit their greatest conservatism, and this is one of the reasons that cultural evolution seems to have been a slow process.

There are three other sources of cultural evolution, in addition to technological innovations: contact between groups and the resulting dissemination of information and techniques, population growth, and political innovations (especially the development of centralized states). None of these is distinctive; all of them tend to occur simultaneously. This is especially true of the relationship between population growth and political development. However, population size and political development are themselves dependent on other factors, such as the level of technological development and habitational considerations.

Every major technological advance in the course of cultural evolution—cultivation by means of a digging stick or hoe, plowing, terracing, large-scale centralized irrigation, domestication of large herds of animals, machines driven by steam or electricity—was discovered independently in a few places, but spread from its center of development to neighboring groups. This spread of technology continued until it was halted by a natural barrier—an ocean, mountains, a desert or a habitat in which the new system of production was useless. Simple examples are the barriers presented by an arctic region to the spread of cultivation techniques or by a hinterland to the spread of an ocean-fishing technology.

Anthropologists generally refer to the spread of cultural elements from one group to another as 'diffusion' and 'borrowing'. These terms are used not only to refer to the spread of material elements of culture but also to the spread of all other aspects of culture. Perhaps 80 percent or more of the elements in any culture may have been borrowed from others. Thus human groups add to their stores of knowledge and productive techniques not only by themselves but, more importantly, by contact with other groups.

The borrowing and transmission of cultural elements between groups is an integral feature of culture. All groups (with the possible exception of the Eskimo and the Australian aborigines) have been in contact with other groups throughout their histories. Sometimes groups were in direct contact even though they were separated by thousands of miles and all travel was by foot or by canoe (a fact that is often forgotten by people who have become accustomed to travel by car, train, or airplane). In premodern times, such contact was always personal; individuals from different groups introduced each other to new ways. In modern times, diffusion often is impersonal—by radio, television, films, books, and newspapers—and these media have accelerated the rate at which culture diffuses. Contact between groups is not always so peaceful as these examples suggest; often, an entire way of life is changed as a result of conquest by an alien and stronger society.

Largely because of the inevitability of diffusion and borrowing, most societies in a common geographical area are at approximately the same level of cultural development. This is not always the case, however, as the contiguity of cultivators and herders or the Kung Bushmen and their cultivator neighbors attests. Sometimes neighboring groups display different levels of adaptation because their respective habitats will not accommodate each other's technology; this often appears to be the case with neighboring herders and cultivators. In other instances, traditionalism or animosity between neighboring groups can raise barriers to diffusion and borrowing. Important cultural differences between neighboring groups at the same level of adaptation may result from their different historical backgrounds.

Cultural borrowing does not occur at random or fortuitously. The adoption of a new technology, ceremonial pattern or religion, legal system or mode of etiquette reflects a decision (usually implicit rather than explicit) that people cannot treat lightly or allow to happen without direction. Chaos would result if every new technique, idea, or custom was adopted by a group every time someone learned about it or independently discovered it. Order, regularity, and stability are the hallmarks of social life, and they must govern the introduction and adoption of new cultural elements. Hence, cultural evolution requires decision-making and decision-implementing within the group, viewed as a unit of adaptation.

(769 words)"""


def essay(topic: str, body: str) -> str:
    return f"<h3><b>UPSC ISS General English — Model Essay</b></h3><br><p><b>Topic:</b> {topic}</p><br>{body}"


def para(topic: str, body: str) -> str:
    return f"<p><b>{topic}</b></p><br>{body}"


def precis_ans(text: str) -> str:
    return (
        "<h3><b>Model Précis</b></h3><br>"
        f"<p>{text}</p><br>"
        "<p><i>Approach: Retain the author's argument structure; cut examples to essentials; "
        "keep roughly one-third of the original length; do not add a title.</i></p>"
    )


def word_ans(word: str, meaning: str, sentence: str) -> str:
    return f"<b>{word}</b> — {meaning}<br>Example: {sentence}"


def idiom_ans(idiom: str, meaning: str, sentence: str) -> str:
    return f"<b>{idiom}</b> — {meaning}<br>Example: {sentence}"


def corr(corrected: str, error: str) -> str:
    return f"Corrected: {corrected}<br>Error: {error}"


def gs(body: str) -> str:
    return body


# ── GE 2021 questions ─────────────────────────────────────────────────────────

GE_2021_ESSAYS = [
    "Water security for a sustainable future.",
    "Compensating women for household work.",
    "Economic growth in the post-pandemic world.",
    "Prospects of digital revolution.",
    "Cultural pluralism in the Indian context.",
]
GE_2021_PARAS = [
    "Appearances can be deceptive.",
    "I have miles to go before I sleep.",
    "Health is wealth.",
    "Politics is the art of the possible.",
    "If winter is here, can spring be far behind?",
]
GE_2021_WORDS = ["austere", "loathsome", "predicament", "supercilious", "precarious"]
GE_2021_IDIOMS = [
    "burning question",
    "at loggerheads",
    "to laugh in one's sleeve",
    "left in the lurch",
    "see off",
]
GE_2021_CORR = [
    "He has promised to lend us some money, isn't it?",
    "According to me, we should spend more money on education.",
    "She returned back after sometime.",
    "Most shopkeepers in the mall deal with jewellery and fashion items.",
    "The teacher asked the new student what was his name.",
    "Neither the convict nor his lawyer were present.",
    "We need to buy more stationery for our office.",
    "If it will rain, I'll come and meet you in the car.",
    "Time and tide waits for none.",
    "I doubt that he will be able to accomplish the task in time.",
]

# ── GE 2026 ───────────────────────────────────────────────────────────────────

GE_2026_ESSAYS = [
    "The need for rethinking primary education in India",
    "Social media has trained the lens on all democratic institutions",
    "Sport reflects the economy it emerges from",
    "The crumbling geopolitical order and the challenges for India",
    "Economic inequality is circumscribed by social inequality",
]
GE_2026_PARAS = [
    "When everyone thinks alike, no one thinks much.",
    "Stigma is a greater barrier than impairment.",
    "Talent is universal, opportunity is not.",
    "The road to hell is paved with good intentions.",
    "Believe you can, and you are halfway there.",
]
GE_2026_WORDS = ["Intrinsic", "Unilateral", "Economize", "Conundrum", "Hanker"]
GE_2026_IDIOMS = [
    "on a shoestring",
    "bite the bullet",
    "cook the books",
    "barking up the wrong tree",
    "under the weather",
]
GE_2026_CORR = [
    "They must be talking about it for ages.",
    "She said, How can you do this?",
    "Sun is the source of life on our planet.",
    "An extremely tall man came around the corner.",
    "It is a walled garden, consisted of a stone arch and two sections for vegetables.",
    "According to psychology, shop lifting is a compulsory behavioural trait.",
    "They insisted that he consulted a psychiatrist.",
    "I can remember it as if it was yesterday.",
    "We wanted to discuss about the arrangements for the wedding.",
    "It is not long enough, isn't it?",
]

GS_2021 = {
    "history_culture": [
        "Describe the economic conditions of Later Vedic Period. How was it different from Rig Vedic life?",
        "Discuss the similarities and differences between the basic tenets of Buddhism and Jainism.",
        "Trace the evolution of Temple architecture in South India.",
        "How did the Bhakti Movement contribute to the growth of regional languages?",
        "Highlight the role of Peoples' movement towards the integration of Princely States into the Indian Union.",
    ],
    "geography_env": [
        '"Climate change is likely to adversely affect certain countries dependent on agriculture." Examine this statement citing relevant examples.',
        "Many countries prefer coal rather than solar or wind energy as a source of fuel. Why?",
        '"Air pollution and water shortages are among the problems faced by urban centres across the globe." Examine this statement.',
        "What factors influence the location of industries in India today?",
        '"Degradation of forest resources and wildlife is a fallout of agriculture and urbanization." Assess this statement giving examples from India.',
    ],
    "economy_social": [
        "Critically examine Indian Agriculture Acts of 2020.",
        '"Privatization of Public Sector Banks is fraught with huge risk." Elucidate.',
        "Do you believe that Aatmanirbhar Bharat Abhiyaan, 2020 will be able to combat the COVID-19 crisis of the Indian economy? Justify your answer.",
        "Analyse the recommendations of the Narasimham Committee Report I and II in controlling Non-Performing Assets (NPAs) of the banking sector in India.",
        "Discuss the roles and responsibilities of the Anganwadi workers and helpers under Integrated Child Development Services Scheme (ICDS).",
    ],
    "polity_ir": [
        '"The Indian Constitution is a living document." Discuss.',
        "Critically examine the financial emergency powers of the President and their effects.",
        '"The Rajya Sabha has certain special powers vis-a-vis the Lok Sabha that adds to its prestige." Comment.',
        "Compare the writ jurisdictions of the Supreme Court and the High Court.",
        "\"The Indian Government's response to the COVID-19 pandemic has shifted the federal balance in its favour.\" Illustrate with suitable examples.",
    ],
}

GS_2026 = {
    "history_culture": [
        "Compare the Mauryan Municipal Administration with today's Municipality.",
        "Discuss the influence of Indian politics and culture on South East Asia during the ancient period.",
        "Discuss critically the character and the achievements of Shivaji with special reference to his constructive statesmanship and Nation-building activities.",
        "Analyze the destruction of Indian cotton industry under the British Rule and its impacts.",
        "Explain the contribution of National Freedom Movement to the Women's Liberation movements in the 20th century.",
    ],
    "geography_env": [
        "The development of satellite towns is an essential feature in de-congesting the capital cities. Discuss with reference to the National Capital Region of Delhi, providing suitable examples.",
        "Retreating glaciers have impacts well beyond the local landscape. Comment.",
        "The Alps, Andes and Himalayas were formed from similar tectonic movements. Explain the orogenic process and the key differences among the mountain chains.",
        "What do you understand by the term 'cultural landscape'? What are the key aspects of cultural landscape?",
        "The SDGs are urgent calls to action. Explain SDG 1, 5 and 11 in terms of building inclusive and sustainable cities.",
    ],
    "economy_social": [
        "India's infrastructure strategy over recent years reflects a decisive shift towards scale, integration and quality. Do you agree with this statement? Discuss.",
        "In what ways can India design an Artificial Intelligence (AI) strategy that aligns with its own economic realities rather than replicating unsustainable models from advanced economies?",
        "Give a brief outline of India's Panchamrit Strategy.",
        "Reflect on the committed efforts and initiatives made by the Government of India to transform India into a desirable tourist destination.",
        "In what ways Pradhan Mantri Janjatiya Vikas Mission (PMJVM) strengthens environmental sustainability while facilitating livelihood and entrepreneurial opportunities for tribal population in India?",
    ],
    "polity_ir": [
        "The Preamble of the Constitution of India is not just the declaration of its ideals, but it represents the foundational philosophy of the Republic. Examine the statement.",
        "The efficacy of the Parliament is enriched not only through the access disadvantaged and marginal groups have to the Parliament, but is accomplished by their presence within specific parties to represent social interests and advocate policies on their behalf. Discuss.",
        "After more than thirty years of the 73rd and 74th Constitutional Amendment Acts 1992, the focus of the states is more on 74th Constitutional Amendment as compared to the 73rd Amendment. Comment.",
        "To ensure propriety of finances/expenditure, it is essential that the office of Comptroller and Auditor General of India is further strengthened. Discuss.",
        "In a bid to favour the Indian economy, what strategies were adopted by the Government of India to navigate through the US tariff regime?",
    ],
}

GS_TOPICS = {
    "history_culture": "Q1: Indian History and Culture",
    "geography_env": "Q2: Geography, Environment and Science",
    "economy_social": "Q3: Economy and Social Development",
    "polity_ir": "Q4: Polity, Governance and International Relations",
}


# Import answer bodies from companion module generated in same run
from update_ge_gs_answers import (  # type: ignore
    ESSAY_ANS,
    PARA_ANS,
    PRECIS_MODEL,
    WORD_ANS,
    IDIOM_ANS,
    CORR_ANS,
    GS_ANS,
)


def build_ge_questions(year: int, essays, paras, words, idioms, corrs, precis_text):
    out = []
    for i, t in enumerate(essays, 1):
        out.append(Q("general_english", "essay", year, i, "Essay Writing", t, 30))
    out.append(Q("general_english", "precis", year, 6, "Précis Writing", precis_text, 30))
    for i, t in enumerate(paras, 7):
        out.append(Q("general_english", "paragraph", year, i, "Paragraph Writing", t, 10))
    for i, t in enumerate(words, 12):
        out.append(Q("general_english", "word_usage", year, i, "Word Usage", t, 2))
    for i, t in enumerate(idioms, 17):
        out.append(Q("general_english", "grammar_idiom", year, i, "Idioms & Phrasal Verbs", t, 2))
    for i, t in enumerate(corrs, 22):
        out.append(Q("general_english", "grammar_correct", year, i, "Sentence Correction", t, 1))
    return out


def build_gs_questions(year: int, blocks: dict):
    out = []
    n = 1
    for sec in ("history_culture", "geography_env", "economy_social", "polity_ir"):
        for text in blocks[sec]:
            out.append(Q("general_studies", sec, year, n, GS_TOPICS[sec], text, 5))
            n += 1
    return out


def ensure_year_map(explanations, paper, section, year: str):
    explanations.setdefault(paper, {}).setdefault(section, {})[year] = {}
    return explanations[paper][section][year]


def fill_ge_explanations(explanations, year: str, key: str):
    bucket = ensure_year_map(explanations, "general_english", "essay", year)
    for i, (topic, body) in enumerate(ESSAY_ANS[key], 1):
        bucket[str(i)] = essay(topic, body)
    ensure_year_map(explanations, "general_english", "precis", year)["6"] = precis_ans(PRECIS_MODEL[key])
    bucket = ensure_year_map(explanations, "general_english", "paragraph", year)
    for i, (topic, body) in enumerate(PARA_ANS[key], 7):
        bucket[str(i)] = para(topic, body)
    bucket = ensure_year_map(explanations, "general_english", "word_usage", year)
    for i, triple in enumerate(WORD_ANS[key], 12):
        bucket[str(i)] = word_ans(*triple)
    bucket = ensure_year_map(explanations, "general_english", "grammar_idiom", year)
    for i, triple in enumerate(IDIOM_ANS[key], 17):
        bucket[str(i)] = idiom_ans(*triple)
    bucket = ensure_year_map(explanations, "general_english", "grammar_correct", year)
    for i, pair in enumerate(CORR_ANS[key], 22):
        bucket[str(i)] = corr(*pair)


def fill_gs_explanations(explanations, year: str, key: str):
    n = 1
    for sec in ("history_culture", "geography_env", "economy_social", "polity_ir"):
        bucket = ensure_year_map(explanations, "general_studies", sec, year)
        for body in GS_ANS[key][sec]:
            bucket[str(n)] = gs(body)
            n += 1


def main():
    questions = json.loads(Q_PATH.read_text())
    explanations = json.loads(E_PATH.read_text())

    before_2022_ge = [q["text"] for q in questions if q["year"] == 2022 and q["paper"] == "general_english" and q["section"] == "essay"]

    questions = [
        q
        for q in questions
        if not (q["year"] == 2021 and q["paper"] in ("general_english", "general_studies"))
    ]

    # drop old 2021 explanation years
    for paper in ("general_english", "general_studies"):
        for sec, years in list(explanations.get(paper, {}).items()):
            years.pop("2021", None)

    new_qs = []
    new_qs += build_ge_questions(2021, GE_2021_ESSAYS, GE_2021_PARAS, GE_2021_WORDS, GE_2021_IDIOMS, GE_2021_CORR, PRECIS_2021)
    new_qs += build_gs_questions(2021, GS_2021)
    new_qs += build_ge_questions(2026, GE_2026_ESSAYS, GE_2026_PARAS, GE_2026_WORDS, GE_2026_IDIOMS, GE_2026_CORR, PRECIS_2026)
    new_qs += build_gs_questions(2026, GS_2026)
    questions.extend(new_qs)

    fill_ge_explanations(explanations, "2021", "y2021")
    fill_gs_explanations(explanations, "2021", "y2021")
    fill_ge_explanations(explanations, "2026", "y2026")
    fill_gs_explanations(explanations, "2026", "y2026")

    Q_PATH.write_text(json.dumps(questions, indent=2, ensure_ascii=False) + "\n")
    E_PATH.write_text(json.dumps(explanations, indent=2, ensure_ascii=False) + "\n")

    from collections import Counter

    c = Counter((q["paper"], q["year"]) for q in questions if q["paper"] in ("general_english", "general_studies"))
    print("Counts:")
    for k in sorted(c):
        print(f"  {k[0]} {k[1]}: {c[k]}")

    ge21 = [q["text"] for q in questions if q["year"] == 2021 and q["paper"] == "general_english" and q["section"] == "essay"]
    ge22 = [q["text"] for q in questions if q["year"] == 2022 and q["paper"] == "general_english" and q["section"] == "essay"]
    print("2021 essays:", ge21)
    print("2022 essays unchanged:", ge22 == before_2022_ge, ge22)
    print("2021 != 2022:", ge21 != ge22)
    print("Total questions:", len(questions))


if __name__ == "__main__":
    main()
