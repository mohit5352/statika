#!/usr/bin/env python3
"""Replace GE/GS 2021 & 2026 explanations with fuller, source-grounded model answers."""

from __future__ import annotations

import json
from pathlib import Path

from answers_long_2021_2026 import ESSAYS_2021, ESSAYS_2026, PARAS_2021, PARAS_2026, GS_2021, GS_2026

ROOT = Path(__file__).resolve().parents[1]
E_PATH = ROOT / "src/data/gen_papers_explanations.json"
SHORT = json.loads(Path("/tmp/iss_papers_fix/short_answers.json").read_text())


def main() -> None:
    ex = json.loads(E_PATH.read_text())

    # GE 2021
    ge = ex["general_english"]
    ge["essay"]["2021"] = dict(ESSAYS_2021)
    ge["precis"]["2021"] = {"6": SHORT["precis_2021"]}
    ge["paragraph"]["2021"] = dict(PARAS_2021)
    ge["word_usage"]["2021"] = dict(SHORT["words_2021"])
    ge["grammar_idiom"]["2021"] = dict(SHORT["idioms_2021"])
    ge["grammar_correct"]["2021"] = dict(SHORT["corr_2021"])

    # GE 2026
    ge["essay"]["2026"] = dict(ESSAYS_2026)
    ge["precis"]["2026"] = {"6": SHORT["precis_2026"]}
    ge["paragraph"]["2026"] = dict(PARAS_2026)
    ge["word_usage"]["2026"] = dict(SHORT["words_2026"])
    ge["grammar_idiom"]["2026"] = dict(SHORT["idioms_2026"])
    ge["grammar_correct"]["2026"] = dict(SHORT["corr_2026"])

    # GS
    for year, block in (("2021", GS_2021), ("2026", GS_2026)):
        for sec, mapping in block.items():
            ex["general_studies"][sec][year] = dict(mapping)

    E_PATH.write_text(json.dumps(ex, indent=2, ensure_ascii=False) + "\n")

    # Stats
    for y in ("2021", "2026"):
        essays = [len(v) for v in ex["general_english"]["essay"][y].values()]
        gs_lens = []
        for sec in ("history_culture", "geography_env", "economy_social", "polity_ir"):
            gs_lens.extend(len(v) for v in ex["general_studies"][sec][y].values())
        print(
            f"{y}: essay avg={sum(essays)//len(essays)} "
            f"min={min(essays)} GS avg={sum(gs_lens)//len(gs_lens)} "
            f"precis={len(ex['general_english']['precis'][y]['6'])}"
        )


if __name__ == "__main__":
    main()
