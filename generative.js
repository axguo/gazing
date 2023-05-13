
/// generative grammar
// rip too slow
function generatePhrase() {
    let rules = {
        "start": "what if $phrase [3] | $s4 | $s5",
        "phrase": "$s1 | $s2 | $s3 ",
        "s1": "$per-pro loved $poss-pro $adj $nn",
        "s2": "we met at the $adj-phrase $nn",
        "s3": "things were $adj-phrase",
        "s4": "a $adj question",
        "s5": "loving in $adv $vbg ways",
        "adj-phrase": "$adj | $adj-comp | the $adj-sup | $adv $adj",
        "adv": RiTa.randomWord({ pos: "rb" }),
        "vb": RiTa.randomWord({ pos: "vb" }),
        "vbg": RiTa.randomWord({ pos: "vbg" }),
        "vbn": RiTa.randomWord({ pos: "vbn" }),
        "vbz": RiTa.randomWord({ pos: "vbz" }),
        "nns": RiTa.randomWord({ pos: "nns" }),
        "nn": RiTa.randomWord({ pos: "nn" }),
        "adj": RiTa.randomWord({ pos: "jj" }),
        "adj-comp": RiTa.randomWord({ pos: "jjr" }),
        "adj-sup": RiTa.randomWord({ pos: "jjs" }),
        "prep": RiTa.randomWord({ pos: "in" }),
        "dt": RiTa.randomWord({ pos: "dt" }),
        "poss-pro": "my | your | our | their | his | her | its",
        "per-pro": "you | I | we",
        "det": "another | some | that | this | every | each"
    };

    let rg = RiTa.grammar(rules);
    let result = rg.expand();
    return result;
}


